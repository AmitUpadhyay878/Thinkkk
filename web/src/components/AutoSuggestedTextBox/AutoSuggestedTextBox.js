// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import request from "../../util/request"
// import { useRef } from 'react'

// const AutoSuggestedTextBox = ({ error, setValue, register, value }) => {

//     const [input, setInput] = useState('')

//     const [suggestion, setSuggestions] = useState([])

//     const handleTextValue=(e)=>{
//         console.log(e.target.value);
//         setInput(e.target.value)
//     }

//     useEffect(()=>{
//         request("POST","/dashboard/search" ,{search:input,model:""},{},true).then((res)=>{
//             setSuggestions(res.data)

//             console.log(res.data)
//           })
//     },[])

//     const [select, setSelect] = useState('')
//     let timmer
//     const handleChange = (e) => {
//         let value = e.target.value
//         // setValue(value)
//         setValue({
//             search: value,
//             model: ''
//         })
//         if (timmer) {
//             clearTimeout(timmer)
//         }
//         timmer = setTimeout(() => {
//             setInput(value)
//         }, 400)

//         // if (value.length >= 1) {
//         //     const regex = new RegExp(`${value}`, 'gi')
//         //     matches = countries.filter((item) => regex.test(item.game))
//         // }
//         // setSuggestions(matches)
//         // setInput(value)
//     }
//     const inputref = useRef(null)
//     const selectValue = (item) => {
//         setSelect(item)
//         setSuggestions('')
//         // setInput(item.companyName)
//         inputref.current.value = item.companyName
//     }

//     const clearSearch = () => {
//         setInput('')
//         setSuggestions('')
//         setSelect('')
//     }

//     return (
//         <div>
//             <input
//                 ref={inputref}
//                 className="icontrol input-text form-control"
//                 type="text"
//                 value={value?.companyName}
//                 onFocus={() => setSelect('')}
//                 onChange={handleChange}
//             />
//             <div className="icon">
//                 {/* {companydetail?.data?.length > 0 ? (
//                     <div className="suggestion-wrapper">
//                         {companydetail?.data?.map((item) => {
//                             return (
//                                 <div
//                                     className="suggestions"
//                                     key={item.id}
//                                     onClick={() => {
//                                         setValue({
//                                             _id: item?._id,
//                                             companyName: item?.companyName
//                                         })
//                                         selectValue(item)
//                                         setInput('')
//                                     }}>
//                                     {item.companyName}
//                                 </div>
//                             )
//                         })} */}

// <div className="suggestion-wrapper">
//                      {suggestion}
//                      </div>
//                     </div>
//                 {/* ) : null} */}
//                 {/* {error && (
//                     <span className="error-message" style={{ color: 'red' }}>
//                         {error}
//                     </span>
//                 )} */}
//             {/* </div> */}
//         </div>
//     )
// }

// export default AutoSuggestedTextBox

import React, { useRef, useState } from 'react'
import request from '../../util/request'

const AutoSuggestedTextBox = () => {
    const [getText, setText] = useState('')
    const dynamicResult = useRef()

     const [GetData, setData] =useState()

    function handleChange(e) {


            setTimeout(()=>{
                request("POST","/dashboard/search",{search:getText,model:"thought"},{},true).then((res)=>setData(res.data))
            },2000)

        dynamicResult.current.style.display = 'block'
        dynamicResult.current.style.zIndex = '9999'
        setText(e.target.value)
    }

    return (
        <React.Fragment>
            <div className="searchbar-box">
                <input
                    type="text"
                    placeholder="search"
                    onChange={handleChange}
                />
                <div
                    className="search-panel"
                    ref={dynamicResult}
                    style={{
                        height: '200px',
                        width: '235px',
                        margin: '3px 0px 0px 0px',
                        backgroundColor: 'lightgreen',
                        display: 'none',
                        zIndex: 99999999
                    }}
                >
                    {GetData}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AutoSuggestedTextBox
