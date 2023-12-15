import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useraddedit } from "../../config/routingConsts";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Form, Spinner } from "react-bootstrap";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ReactComponent as EditLogo } from "../../assets/images/ButtonLogos/EditButton.svg";
import { ReactComponent as DeleteLogo } from "../../assets/images/ButtonLogos/DeleteButton.svg";
import userDummyImg from '../../assets/images/userDummyImg.png'
import TableListing from "../../Components/TableListing";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import AmitPagination from "../../Components/AmitPagination";
import AmitImagePreview from '../../Components/AmitImagePreview'
import { formatDateToMonthShortwithFormate } from "../../util/common";
import { userListingAction } from "../../Redux/Actions/UserActions";

const UserManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentpage") || 1);
  const [DataLimit, setDataLimit] = useState(localStorage.getItem("pageLimit") || 5);
  const [TotalPagies, setTotalPagies] = useState(1);

  const [userFilterText, setuserFilterText] = useState("");

  const [show, setShow] = useState(false);
  const [sorting, setSorting] =useState([])

  const { users,error,loading } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  let totalUsers = users?.meta?.totalCount;

  const [currentId, setCurrentId] = useState("");

  const navigate = useNavigate();

  const handleChange2 = (e) => {
    const getData = setTimeout(() => {
      setuserFilterText(e.target.value);
    }, 1000);
    clearInterval();
  };

  useEffect(() => {
    setTotalPagies(Math.ceil(totalUsers / DataLimit));
  }, [totalUsers, DataLimit]);

  useEffect(() => {
    // setCurrentPage(currentPage > TotalPagies ? TotalPagies : currentPage);
    setCurrentPage(1);
  }, [TotalPagies]);

  const handleChangePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
      localStorage.setItem("currentpage",JSON.stringify(currentPage))
    },
    [currentPage]
  );

  const handleChange = (eventkey) => {
    setDataLimit(eventkey);
   localStorage.setItem("pageLimit" ,(eventkey))
  };

  async function fetchUser(){
   if(!show){
    let abc = await dispatch(
      userListingAction({
        limit: DataLimit,
        page: currentPage,
        search: userFilterText,
        sortKey: "",
        sortBy: -1,
      })) 
    }
  }
  useEffect(() => {
      fetchUser()
  }, [ DataLimit, currentPage,show,userFilterText,location.state
      //SortKey
     ]);

     const [showPreview, setShowPreview] = useState(false);
     const [imagePrev, setImagePrev] = useState("");
     const handlePreviewShow = (imagepath) => {
       setImagePrev(imagepath ? imagepath : userDummyImg );
       setShowPreview(true);
     };

  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data, "data");
  };

  const columnHelper = createColumnHelper();
  const columns = [
    // columnHelper.display({
    //   id: "select",
    //   header: <input type="checkbox" name="select" />,
    //   cell: (row) => {

    //     const handleEditClick = () => {
    //       console.log("hello Edit")
    //     }
    //     return (
    //       <>
    //         <input type="checkbox" name="select" />
    //       </>
    //     )
    //   }
    // }),
    columnHelper.accessor((row) => row.profileImage, {
      id: "profileImage",
      header: "Avtar",
      cell: (row) => {
        return (
          <>
           <div className="thought-image">
              {row.row.original.profileImage ? (
                <img
                  data-src={row.row.original.profileImage}
                  class="lazyload"
                  height="70px"
                  width="70px"
                  onClick={() => {
                    handlePreviewShow(row.row.original.profileImage);
                  }}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              ) : (
                <img
                  data-src={userDummyImg}
                  class="lazyload"
                  height="70px"
                  width="70px"
                  onClick={() => {
                    handlePreviewShow(userDummyImg);
                  }}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              )}
            </div>

          </>
        );
      },
    }),
    // columnHelper.accessor((row)=>row.userId,{
    //   id:"userId",
    //   header:"user ID"
    // }),
    columnHelper.accessor((row) => row.firstName, {
      id: "firstName",
      header: "First Name",
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      header: "Last Name",
    }),
    columnHelper.accessor((row) => row.userName, {
      id: "userName",
      header: "User Name",
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      header: "Email",
    }),
        columnHelper.accessor((row) => row.createdAt, {
          id :"createThoughtDate",
          header:"Created At",
          cell: (row) => {
        return <p className="des">{formatDateToMonthShortwithFormate(row.row.original.createdAt)}</p>
      }
          }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      header: "Status",
      cell: (row) => {
        if (row.row.original.status == 1) {
          return <Badge bg="success">Active</Badge>;
        } else {
          return <Badge bg="danger">InActive</Badge>;
        }
      },
    }),
      
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: (row) => {
        const handleEditClick = (id) => {
          navigate(useraddedit, { state: id });
        };
        const handleDeleteClick = (id) => {
          console.log(id,"user managment delete id :");
          setShow(true);
          setCurrentId(id);
        };
        return (
          <>
            <button
              className="action-btn"
              onClick={() => handleEditClick(row.row.original.userId)}
            >
              <span>
                <EditLogo />
              </span>
            </button>
            <button
              className="action-btn"
              onClick={() => handleDeleteClick(row.row.original.userId)}
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
    data: users.data ?? defaultData,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="card scrollbar mb-3">
        <div class="header-box">
          <div class="title-text">
        <h2>User Management</h2>
          </div>
          {
            !loading &&(
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
                  name="userSearch"
                  style={{
                    minWidth: "400px",
                    height: "40px",
                    borderRadius: "30px",
                    padding: "0px 24px",
                    fontSize: "16px",
                  }}
                  {...register("userSearch", {
                    onChange: (e) => {
                      handleChange2(e);
                    },
                  })}
                />
              </Form.Group>
            </Form>
          </div>
            )
          }
        </div>

        {users && users?.data?.length > 0 ? (
          loading ? <span style={{marginLeft:"600px",marginTop:"50px",marginBottom:"50px"}}>
            <Spinner animation="border" color="#198754" />
          </span> 
          :
          <TableListing table={table} />
        ) : (
          <div className="no-user">
            <p>No User Available</p>
          </div>
        )}

        {/* If User/s Available then and then Pagination Section Show */}
        {loading || users?.meta?.totalCount >= 1 && (
          <>
            <div className="card thought-pagination">
              <div className="card-body">
                <div className="showing-pages">
                  <p className="m-0">

                  Showing {(currentPage - 1) * DataLimit + 1} to{" "}
                      {Math.min(currentPage * DataLimit, totalUsers)} of{" "}
                      {totalUsers} Users
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
        <DeleteModal show={show} setShow={setShow} currentId={currentId} title="deleteuser" />
        <AmitImagePreview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        imagePrev={imagePrev}
        setImagePrev={setImagePrev}
      />
    </>
  );
};

export default UserManagement;
