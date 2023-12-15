// import React from 'react'

// const GlobalSearch = ({text="",onChange}) => {
//   return (
//     <div>
//         <input type="text" onChange={onChange} value={text} />
//     </div>
//   )
// }

// export default GlobalSearch

// import React, { useState, useEffect, useCallback } from 'react';
// import { Form } from 'react-bootstrap';
// import { ReactComponent as SearchIcon } from '../../assets/dashboardimg/search.svg'

// function GlobalSearch({text=""}) {
//   const [searchTerm, setSearchTerm] = useState(text ?text :"");
//   const [searchResults, setSearchResults] = useState([]);
//   const [cachedResults, setCachedResults] = useState([]);

//   useEffect(() => {
//     if (cachedResults.length > 0) {
//       setSearchResults(cachedResults);
//     }
//   }, [cachedResults]);

//   const handleSearch = () => {
//     const elements = document.querySelectorAll('h1, p, div');
//     const results = [];
//     const regex = new RegExp(searchTerm, 'gi');

//     elements.forEach((element) => {
//       if (regex.test(element.textContent)) {
//         results.push(element);
//       }
//     });

//     setSearchResults(results);
//     setCachedResults(results);
//   };

//   const debouncedSearch = useCallback(
//     debounce(handleSearch, 500),
//     [searchTerm]
//   );

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     debouncedSearch();
//   };

//   return (
//     <div>
//       {/* <input type="text" value={searchTerm} onChange={handleInputChange} /> */}

//       <div className=" search-box p-0">
//                                             <Form.Group
//                                                 className="formbox"
//                                                 controlId="formBasicEmail"
//                                             >
//                                                 <Form.Control
//                                                     type="search"
//                                                     placeholder="Search"
//                                                     className="icontrol"
//                                                     value={searchTerm}
//                                                     onChange={handleInputChange}
//                                                     // value={wholeSearch}
//                                                     // onChange={(e)=>handleSearchBar(e)}
//                                                 />
//                                                 <div className="search-icon">
//                                                     <SearchIcon />
//                                                 </div>
//                                             </Form.Group>
//                                         </div>

//       {searchResults.map((result, index) => (
//         <div key={index}>{result.textContent}</div>
//       ))}
//     </div>
//   );
// }

// function debounce(func, delay) {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(context, args);
//     }, delay);
//   };
// }

// export default GlobalSearch;





import React, { useState, useMemo } from 'react'
import { Form } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../assets/dashboardimg/search.svg'
import request from '../../util/request'

function GlobalSearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
        request(
            'POST',
            '/dashboard/search-list',
            {
                text: event.target.value,
                // model: 'thought'
            },
            {},
            true
        )
            .then((res) => {
                console.log(res)
            })
            .catch((e) => new Error(e))
    }

    useMemo(() => {
        const elements = document.querySelectorAll('body *')
        const results = []
        const regex = new RegExp(searchTerm, 'gi')

        elements.forEach((element) => {
            if (regex.test(element.textContent)) {
                results.push(element)
            }
        })

        setSearchResults(results)
    }, [searchTerm])
    

    return (
        <>
            {/* <input type="text" value={searchTerm} onChange={handleInputChange} /> */}

            <div className=" search-box p-0">
                <Form.Group className="formbox" controlId="formBasicEmail">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="icontrol"
                        value={searchTerm}
                        onChange={handleInputChange}
                        // value={wholeSearch}
                        // onChange={(e)=>handleSearchBar(e)}
                    />
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                </Form.Group>
            </div>

            {searchResults.map((result, index) => (
                <div
                    key={index}
                    style={{ backgroundColor: 'yellow', color: 'red' }}
                >
                    {result.textContent}
                </div>
            ))}
        </>
    )
}

export default GlobalSearch
