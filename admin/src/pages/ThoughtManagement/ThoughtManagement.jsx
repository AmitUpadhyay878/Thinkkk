import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnResizeMode,
  SortingState,
} from "@tanstack/react-table";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { thoughtaddedit } from "../../config/routingConsts";
import { ReactComponent as EditLogo } from "../../assets/images/ButtonLogos/EditButton.svg";
import { ReactComponent as DeleteLogo } from "../../assets/images/ButtonLogos/DeleteButton.svg";
import NoImage from '../../assets/images/noimage.png'
import TableListing from "../../Components/TableListing";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AmitPagination from "../../Components/AmitPagination";
import { thoughtListingAction } from "../../Redux/Actions/ThoughtAction";
import AmitImagePreview from '../../Components/AmitImagePreview'
import { formatDateToMonthShortwithFormate } from "../../util/common";

const ThoughtManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  const { thoughts, loading, error } = useSelector((state) => state.ThoughtRedu);
  const dispatch = useDispatch();
  const location = useLocation()
  let totalThoughts = thoughts?.meta?.totalCount;

  const [currentPage, setCurrentPage] = useState(localStorage.getItem("Thoughtcurrentpage") || 1);
  const [DataLimit, setDataLimit] = useState(localStorage.getItem("ThoughtpageLimit") || 5);
  const [TotalPagies, setTotalPagies] = useState(1);
  const [userFilterText, setuserFilterText] = useState("");
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [sorting, setSorting] = useState([])
  const [columnResizeMode, setColumnResizeMode] = useState('onChange')

  const handleChange2 = (e) => {
    const getData = setTimeout(() => {
      setuserFilterText(e.target.value)
    }, 1000)
    clearInterval()
  };

  useEffect(() => {
    setTotalPagies(Math.ceil(totalThoughts / DataLimit));
  }, [totalThoughts, DataLimit]);

  useEffect(() => {
    // setCurrentPage(currentPage > TotalPagies ? TotalPagies : currentPage);
    setCurrentPage(1);
  }, [TotalPagies]);

  const handleChangePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
     localStorage.setItem("Thoughtcurrentpage",JSON.stringify(currentPage))
    },
    [currentPage]
  );
  const handleChange = (eventkey) => {
    setDataLimit(eventkey);
    localStorage.setItem("ThoughtpageLimit" ,(eventkey))
  };

  async function fetchThoughts() {
    if(!show) {
    let abc = await dispatch(
      thoughtListingAction({
        limit: DataLimit,
        page: currentPage,
        search: userFilterText,
        sortKey: "",
        sortBy: -1,
      })
    )
    }
  }

  useEffect(() => {
    fetchThoughts()
  }, [DataLimit, currentPage, userFilterText,show,location.state]);

  const [showPreview, setShowPreview] = useState(false);
  const [imagePrev, setImagePrev] = useState("");
  const handlePreviewShow = (imagepath) => {
    setImagePrev(imagepath);
    setShowPreview(true);
  };

  const onSubmit = (e, data) => {
    e.preventDefault()
    console.log(data, "data");
  }

  const columnHelper = createColumnHelper();
  const columns = [
    // columnHelper.display({
    //   id: "select",
    //   header: <input type="checkbox" name="select" />,
    //   cell: (row) => {
    //     const handleEditClick = () => {
    //       console.log("hello Edit");
    //     };
    //     return (
    //       <>
    //         <input type="checkbox" name="select" />
    //       </>
    //     );
    //   },
    // }), 
    columnHelper.accessor((row) => row.thoughtImage, {
      id: "thoughtImage",
      header: "Image",
      cell: (row) => {
        return (
          <>
            <div className="thought-image">
              <img data-src={row.row.original.thoughtImage ?? NoImage} class="lazyload" 
                onClick={() => {
                  handlePreviewShow(row.row.original.thoughtImage);
                }}
                 style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </div>
          </>
        );
      },
    }),
    // columnHelper.accessor((row)=>row.thoughtId,{
    //   id:"thoughtId",
    //   header:"Thought ID"
    // }),
    // columnHelper.accessor((row)=>row.userId,{
    //   id:"userId",
    //   header:"User ID"
    // }),
    columnHelper.accessor((row) => row.thoughtName, {
      id: "thoughtName",
      header: "Thought Name",
      cell: (row) => {
        return <p className="des tname">{row.row.original.thoughtName}</p>
      }
    }),
    columnHelper.accessor((row) => row.thoughtDescription, {
      id: "thoughtDescription",
      header: "Thought Description",
      cell: (row) => {
        return <p className="des">{row.row.original.thoughtDescription}</p>
      }
    }),
    // columnHelper.accessor((row)=>row.workProgress,{
      //   id:"workProgress",
      //   header:"Work Progress"
      // }),

      columnHelper.accessor((row) => row.actionCount, {
        id: "actionCount",
        header: "Actions",
        cell: (row) => {
        return <p className="des">{row.row.original.actionCount}</p>
      }
      }),
      columnHelper.accessor((row) => row.questionAnswerCount, {
        id: "questionAnswerCount",
        header: "Que & Ans",
        cell : (row) =>{
          return <p className="des">{row.row.original.questionAnswerCount}</p>
        }
      }),
      
  
      // columnHelper.accessor((row) => row.status, {
      // id: "status",
      // header: "Status",
      // cell: (row) => {
        // if (row.row.original.status == 1) {
          // return <Badge bg="success">Active</Badge>;
        // } else {
          // return <Badge bg="danger">InActive</Badge>;
        // }
      // },
    // }),
  
    // columnHelper.accessor((row) => row.status, {
    //   id: "status",
    //   header: "Status",
    //   cell: (row) => {
    //     if (row.row.original.status == 1) {
    //       return <Badge bg="success">Active</Badge>;
    //     } else {
    //       return <Badge bg="danger">InActive</Badge>;
    //     }
    //   },
    // }),
    columnHelper.accessor((row) => row.userName, {
      id: "userName",
      header: "Create By",
      cell: (row) => {
        return <p className="des">{row.row.original.userName}</p>
      }
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id :"createThoughtDate",
      header:"Created At",
      cell: (row) => {
        return <p className="des">{formatDateToMonthShortwithFormate(row.row.original.createdAt)}</p>
      }
    }),
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: (row) => {
        const handleEditClick = (id) => {
          navigate(thoughtaddedit, { state: id });
        };
        const handleDeleteClick = (id) => {
          setShow(true);
          setCurrentId(id);
          // console.log('id',id);
        };
        console.log("loaction",location.state)
        return (
          <>
            <button
              className="action-btn"
              onClick={() => handleEditClick(row.row.original.thoughtId)}
            >
              <span>
                <EditLogo />
              </span>
            </button>
            <button
              className="action-btn"
              onClick={() => handleDeleteClick(row.row.original.thoughtId)}
            >
              <span>
                <DeleteLogo />
              </span>
            </button>
          </>
        );
      },
    }),
  ];

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: thoughts.data ?? defaultData,
    columns: columns,
    state: {
      sorting,
    },
    columnResizeMode: columnResizeMode,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="card scrollbar mb-3">
        <div class="header-box">
          <div class="title-text">
            <h2>Thought Management</h2>
          </div>
          { !loading && (
                      <div className="searchbar">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group
                          className="mb-0 "
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            className="icontrol"
                            type="text"
                            placeholder="search"
                            name="thoughtSearch"
                            style={{
                              minWidth: "400px",
                              height: "40px",
                              borderRadius: "30px",
                              padding: "0px 24px",
                              fontSize: "16px",
                            }}
                            {...register("thoughtSearch", {
                              onChange: (e) => {
                                handleChange2(e);
                              },
                            })}
                          />
                        </Form.Group>
                      </Form>
                    </div>
          ) }

        </div>
        {thoughts && thoughts?.data?.length > 0 ? (
          loading ?
            <span style={{ marginLeft: "600px", marginTop: "50px", marginBottom: "50px" }}>
              <Spinner animation="border" color="#198754" /></span> :
            <TableListing table={table} />
        ) : (
          <div className="no-user">
            <p>No Thoughts Available</p>
          </div>
        )}
        { loading || thoughts?.meta?.totalCount >= 1 && (
          <>
            <div className="card thought-pagination">
              <div className="card-body">
                <div className="showing-pages">
                  <p className="m-0">
                    Showing {(currentPage - 1) * DataLimit + 1} to{" "}
                    {Math.min(currentPage * DataLimit, totalThoughts)} of{" "}
                    {totalThoughts} Thoughts
                  </p>
                </div>
                <div className="itemperpage-box">
                  <Dropdown flip="no" onSelect={handleChange}>
                    <div className="item-text">Items per page:</div>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {DataLimit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="5">5</Dropdown.Item>
                      <Dropdown.Item eventKey="10">10</Dropdown.Item>
                      <Dropdown.Item eventKey="15">15</Dropdown.Item>
                      <Dropdown.Item eventKey="25">25</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <AmitPagination
                  total={TotalPagies}
                  current={currentPage}
                  onChangePage={handleChangePage}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <DeleteModal show={show} setShow={setShow} currentId={currentId} title="deletethought" />
      <AmitImagePreview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        imagePrev={imagePrev}
        setImagePrev={setImagePrev}
      />
    </>
  );
};

export default ThoughtManagement;
