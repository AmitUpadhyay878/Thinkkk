import React, { useEffect, useState, useMemo } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { Badge, Spinner } from 'react-bootstrap'
import { thoughtmanagement } from '../../../../config/routingConsts'
import { thoughtListingAction } from '../../../../Redux/Actions/ThoughtAction'
import { useDispatch, useSelector } from 'react-redux'
import { formatDateToMonthShortwithFormate } from '../../../../util/common'
const TableListing = React.lazy(()=>import('../../../../Components/TableListing'))
const DeleteModal = React.lazy(() => import('../../../../Components/DeleteModal/DeleteModal'))
const AmitImagePreview = React.lazy(()=>import('../../../../Components/AmitImagePreview'))
const RecentThoughts = () => {

  const dispatch = useDispatch()
  const { thoughts,loading,error } = useSelector((state) => state.ThoughtRedu);
  const [show, setShow] = useState(false);
  const [currentId , setCurrentId] = useState("");
  const [sorting, setSorting] =useState([])

  const navigate = useNavigate()

  const [ThoughtList, setThoughtList] = useState({})


  async function fetchThoughts(){
    let abc=   await dispatch(
         thoughtListingAction({
           limit: 5,
           page: 1,
           search: "",
           sortKey: "",
           sortBy: -1,
         })
       )
   }

  useEffect(() => {
      fetchThoughts()
  }, []);

  const [showPreview, setShowPreview] = useState(false);
  const [imagePrev, setImagePrev] = useState("");
  const handlePreviewShow = (imagepath) => {
    setImagePrev(imagepath);
    setShowPreview(true);
  };


  const columnHelper = createColumnHelper()
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
    columnHelper.accessor((row) => row.thoughtImage, {
      id: "thoughtImage",
      header: "Thought Image",
      cell: (row) => {
        return (
          <>
            <div className="thought-image">
              <img src={row.row.original.thoughtImage} alt="" height="70px" width="70px" 
               onClick={() => {
                handlePreviewShow(row.row.original.thoughtImage );
              }}
              style={{ cursor: "pointer" }}
              />
            </div>
          </>
        )
      }
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
       columnHelper.accessor((row) => row.userName, {
      id: "userName",
      header: "Create By",
      cell: (row) => {
        return <p className="des">{row.row.original.userName}</p>
      }
    }),
    // columnHelper.accessor((row)=>row.workProgress,{
    //   id:"workProgress",
    //   header:"Work Progress"
    // }),
    // columnHelper.accessor((row)=>row.actionCount,{
    //   id:"actionCount",
    //   header:"Actions"
    // }),
    // columnHelper.accessor((row)=>row.questionAnswerCount,{
    //   id:"questionAnswerCount",
    //   header:"Ques & Anss"
    // }),
        columnHelper.accessor((row) => row.createdAt, {
          id :"createThoughtDate",
          header:"Created At",
          cell: (row) => {
        return <p className="des">{formatDateToMonthShortwithFormate(row.row.original.createdAt)}</p>
      }}),
        
    // columnHelper.accessor((row) => row.status, {
    //   id: "status",
    //   header: "Status",
    //   cell: (row) => {
    //     if (row.row.original.status == 1) {
    //       return <Badge bg="success">Active</Badge>
    //     }
    //     else {
    //       return <Badge bg="danger">InActive</Badge>
    //     }
    //   }
    // })
    // ,
    // columnHelper.display({
    //   id: "actions",
    //   header: "Action",
    //   cell: (row) => {
    //     const handleEditClick = (id) => {
    //       navigate(thoughtaddedit, { state: id })
    //     }
    //     const handleDeleteClick = (id) => {
    //       setShow(true)
    //       setCurrentId(id)
    //     }
    //     return (
    //       <>
    //         <button className='action-btn' onClick={() => handleEditClick(row.row.original.thoughtId)}><span><EditLogo /></span></button>
    //         <button className='action-btn' onClick={() => handleDeleteClick(row.row.original.thoughtId)}><span><DeleteLogo /></span></button>
    //       </>
    //     )
    //   }
    // })
  ]



  const defaultData = useMemo(() => [], [])
  const table = useReactTable({
    data: thoughts.data ?? defaultData,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="card scrollbar mb-3" style={{height:"auto", maxHeight:"inherit"}}>
        <div class="header-box">
          <div class="title-text">
            <h2>Recent Thoughts</h2>
          </div>
          <div className="view-btn">
            <button className='common-btn' onClick={()=>navigate(thoughtmanagement)}>View all thoughts</button>
          </div>
        </div>
        <div className="recent-thoughts">
        {loading? 
              <span style={{marginLeft:"600px",marginTop:"80px",marginBottom:"80px"}}>
               <Spinner animation="border" color="#198754" /> </span> :
        <TableListing table={table} />
            }
        </div>
          {/* <ThoughtListing table={table}/> */}
        <DeleteModal show={show} setShow={setShow} currentId={currentId} />
        <AmitImagePreview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        imagePrev={imagePrev}
        setImagePrev={setImagePrev}
      />
      </div>
    </>
  )
}

export default React.memo(RecentThoughts)
