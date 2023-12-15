import React, {  useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg'
import {
    NavLink,
    useNavigate,
    Link,
    useLocation,
    useParams
} from 'react-router-dom'
import { ReactComponent as D1 } from '../../assets/dashboardimg/d1.svg'
import { ReactComponent as D2 } from '../../assets/dashboardimg/d2.svg'
import { ReactComponent as D3 } from '../../assets/dashboardimg/d3.svg'
import { ReactComponent as D4 } from '../../assets/dashboardimg/d4.svg'
import { ReactComponent as SearchIcon } from '../../assets/dashboardimg/search.svg'
import greenbox from '../../assets/dashboardimg/greenrect.png'
import userIcon from '../../assets/dashboardimg/usericon.png'
import logoutIcon from '../../assets/dashboardimg/logout.png'
import AmericanIcon from '../../assets/dashboardimg/american.png'
import GermanyIcon from '../../assets/dashboardimg/germany.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    home,
    settings,
    subscriptionplan,
    thoughts,
    signin,
    editprofile
} from '../../config/routingConsts'
import { logout } from '../../Redux/Actions/AuthActions'
// import i18n from '../../Local/i18n'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import GlobalSearch from '../../components/GlobalSearch/GlobalSearch'
import AutoSuggestedTextBox from '../../components/AutoSuggestedTextBox/AutoSuggestedTextBox'
import request from '../../util/request'
import DropDownSearch from '../../components/GlobalSearch/DropDownSearch'
import { useForm } from 'react-hook-form'
import dummyUserImage from '../../assets/images/dummyUserImage.png'

const Header = () => {
    const first = useRef(null)
    // const thoughtId = useParams()
    // console.log("ID",thoughtId);
    const { auth } = useSelector((state) => state.Auth)
    const { user } = useSelector((state) => state.Auth)
    const { state } = useLocation()
    const statescome = [
        'Change Password',
        'Edit Profile',
        'Privacy Policy',
        'Terms and Conditions'
    ]

    const navigate = useNavigate()
    const { reset } = useForm()
    const [getUsername, setUsername] = useState(null)
    const [getLastName, setLastName] = useState(null)
    const [shortName, setShortName] = useState('')
    const [PImage, setPImage] = useState('')

    const [languageChange, setLanguageChange] = useState(
        localStorage.getItem('language') || 'en'
    )
    useEffect(() => {
        setUsername(user?.firstName)
        setLastName(user?.lastName)
        setPImage(user?.profileImage ? user?.profileImage : dummyUserImage)
        setShortName(
            (
                user?.firstName.slice(0, 1) + user?.lastName.slice(0, 1)
            ).toUpperCase()
        )
    }, [user?.profileImage, user?.firstName, user?.lastName, user?.userName])

    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logout())
        navigate(home)
    }
    const [closee, setClosee] = useState(false)
    const handleClosee = () => {
        navigate(editprofile, { state: 'Edit Profile' })
        setClosee(!closee)
        first.current.click()
    }

    const [wholeSearch, setWholeSearch] = useState('')
    const [globalSearchData, setGlobalSearchData] = useState([])
    const inputref = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    
    let timmer
    const handleSearchBar = (e) => {
        console.log(timmer,"timmer")
        if (timmer) {
            clearTimeout(timmer)
        }
        timmer=setTimeout(() => {
            setWholeSearch(e.target.value)
        }, 300);
    }

    useEffect(() => {
        if (wholeSearch) {
            setIsLoading(true)
            request(
                'POST',
                `/dashboard/search-list`,
                { text: wholeSearch },
                {},
                true
            ).then((res) => {
                setGlobalSearchData(res?.data?.data)
                // setResponseStore(res?.data?.data)
                setIsLoading(false)
            })
            // .catch ((error) => {
            //     setBlankGlobalData(error.meta.message)
            //     console.log("setBlankGlobalData",error.meta.message)
            // })
        }
    }, [wholeSearch])

  

    const handleClick = (result) => {
        const id = result._id
        const model = result.model
        const text = result.text

        request(
            'POST',
            '/dashboard/search',
            { search: id, model: model },
            {},
            true
        )
            .then((res) => {
                const thoughtId = res?.data?.data?.thoughtId
                // inputref.current.value = text
                inputref.current.value = ''
                switch (model) {
                    case 'action': {
                        return navigate(`${thoughts}/${thoughtId}`, {
                            state: 'ActionItemsTab'
                        })
                    }
                    case 'fact': {
                        return navigate(`${thoughts}/${thoughtId}`, {
                            state: 'Facts'
                        })
                    }
                    case 'journal': {
                        return navigate(`${thoughts}/${thoughtId}`, {
                            state: 'Journal'
                        })
                    }

                    case 'question': {
                        return navigate(`${thoughts}/${thoughtId}`, {
                            state: 'QuestionAnswerTab'
                        })
                    }

                    case 'thought': {
                        return navigate(`${thoughts}/${thoughtId}`, {
                            state: 'VisualizationTab'
                        })
                    }
                }
            })
            .catch((e) => console.log(e, 'error'))

        setGlobalSearchData([])

        setWholeSearch('')
    }

    return (
        <>
            <div className="header-area">
                <Navbar expand="lg">
                    <div className="container">
                        <div className="headermain-box">
                            <div className="dash-logo">
                                <Link to={home} state="Dashboard">
                                    <LogoImg />
                                </Link>
                            </div>
                            <Navbar.Toggle
                                aria-controls="basic-navbar-nav"
                                ref={first}
                            />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto header-menu header-mobile d-none">
                                    <ul className="sidebar-menu">
                                        <li>
                                            <Nav.Link
                                                as={NavLink}
                                                to={home}
                                                state="Dashboard"
                                                end
                                                onClick={() =>
                                                    first.current.click()
                                                }
                                            >
                                                <span>
                                                    <D1 />
                                                </span>
                                                Dashboard
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link
                                                as={NavLink}
                                                to={thoughts}
                                                state="Thoughts"
                                                onClick={() =>
                                                    first.current.click()
                                                }
                                                end
                                            >
                                                <span>
                                                    <D2 />
                                                </span>
                                                Challenges
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link
                                                as={NavLink}
                                                to={subscriptionplan}
                                                state="Subscription Plan"
                                                onClick={() =>
                                                    first.current.click()
                                                }
                                                end
                                            >
                                                <span>
                                                    <D3 />
                                                </span>
                                                Subscription Plan
                                            </Nav.Link>
                                        </li>
                                        <li>
                                            <Nav.Link
                                                as={NavLink}
                                                to={settings}
                                                state="Settings"
                                                onClick={() =>
                                                    first.current.click()
                                                }
                                                end
                                            >
                                                <span>
                                                    <D4 />
                                                </span>
                                                Settings
                                            </Nav.Link>
                                        </li>
                                    </ul>
                                </Nav>
                                <div className="page-title">
                                    <h2>
                                        {statescome.includes(state)
                                            ? 'My Account'
                                            : [
                                                  'ActionItemsTab',
                                                  'Facts',
                                                  'Journal',
                                                  'QuestionAnswerTab',
                                                  'VisualizationTab'
                                              ].includes(state)
                                            ? 'Challenges'
                                            : state ?? 'Dashboard'}
                                    </h2>
                                </div>
                                <Nav className="ms-auto">
                                    <div className="lang-account-box">
                                        <div className=" search-box p-0">
                                            <Form.Group
                                                className="formbox"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Control
                                                    ref={inputref}
                                                    type="search"
                                                    placeholder="Search"
                                                    className="icontrol"
                                                    // name="wholeSearch"
                                                    // value={wholeSearch}
                                                    onChange={handleSearchBar}
                                                />
                                                <div className="search-icon">
                                                    <SearchIcon />
                                                </div>
                                                {/* <DropDownSearch results = {globalSearchData} /> */}
                                                {!isLoading &&
                                                    !!wholeSearch && (
                                                        <>
                                                            {globalSearchData?.length >
                                                                0 && (
                                                                <div className="dropdown-panel">
                                                                    {globalSearchData.map(
                                                                        (
                                                                            result
                                                                        ) => (
                                                                            <div className="items">
                                                                                <p
                                                                                    key={
                                                                                        result._id
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleClick(
                                                                                            result
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        result.text
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}

                                                            {globalSearchData.length ===
                                                                0 &&
                                                                !!wholeSearch &&
                                                                'No data found'}
                                                        </>
                                                    )}
                                            </Form.Group>

                                            {/* <AutoSuggestedTextBox /> */}
                                        </div>
                                        {/* <GlobalSearch /> */}
                                        {/* onClick={onClickGetDataSearch} */}
                                        {/* <Dropdown
                                            align="end"
                                            onSelect={(e, eventKey) => {
                                                i18n.changeLanguage(e)
                                                localStorage.setItem(
                                                    'language',
                                                    e
                                                )
                                                setLanguageChange(e)
                                            }}
                                        >
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                            >
                                                <div className="toggle-image">
                                                    <img
                                                        src={
                                                            languageChange ===
                                                            'en'
                                                                ? AmericanIcon
                                                                : GermanyIcon
                                                        }
                                                        alt=""
                                                        className="img-fluid"
                                                    />
                                                    {languageChange === 'en'
                                                        ? 'English'
                                                        : 'German'}
                                                </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="en">
                                                    <div className="toggle-image">
                                                        <img
                                                            src={AmericanIcon}
                                                            alt=""
                                                            className="img-fluid"
                                                        />
                                                        English
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="de">
                                                    <div className="toggle-image">
                                                        <img
                                                            src={GermanyIcon}
                                                            alt=""
                                                            className="img-fluid"
                                                        />
                                                        German
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                        <Dropdown align="end">
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                            >
                                                <div className="toggle-image">
                                                    <div className="user-avtar">
                                                        <div className="green-square">
                                                            {/* <img
                                                                src={greenbox}
                                                                alt=""
                                                                className="img-fluid"
                                                            /> */}
                                                            <div className="user-letter">
                                                                <img
                                                                    src={PImage}
                                                                    alt=""
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="user-name">
                                                            {getUsername}
                                                            <span style={{marginLeft:"5px"}}>{getLastName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="myprofile">
                                                <Dropdown.Item
                                                    onClick={handleClosee}
                                                >
                                                    <div className="toggle-image">
                                                        <span>
                                                            <img
                                                                src={userIcon}
                                                                alt=""
                                                            />
                                                        </span>
                                                        My Account
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={Logout}>
                                                    <div className="toggle-image">
                                                        <span>
                                                            <img
                                                                src={logoutIcon}
                                                                alt=""
                                                            />
                                                        </span>
                                                        Log out
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </div>
                </Navbar>
            </div>
        </>
    )
}

export default Header

// import React, { Suspense, useEffect, useRef, useState } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
// import Dropdown from 'react-bootstrap/Dropdown'
// import { ReactComponent as LogoImg } from '../../assets/images/logo.svg'
// import { NavLink, useNavigate, Link, useLocation, useParams } from 'react-router-dom'
// import { ReactComponent as D1 } from '../../assets/dashboardimg/d1.svg'
// import { ReactComponent as D2 } from '../../assets/dashboardimg/d2.svg'
// import { ReactComponent as D3 } from '../../assets/dashboardimg/d3.svg'
// import { ReactComponent as D4 } from '../../assets/dashboardimg/d4.svg'
// import { ReactComponent as SearchIcon } from '../../assets/dashboardimg/search.svg'
// import greenbox from '../../assets/dashboardimg/greenrect.png'
// import userIcon from '../../assets/dashboardimg/usericon.png'
// import logoutIcon from '../../assets/dashboardimg/logout.png'
// import AmericanIcon from '../../assets/dashboardimg/american.png'
// import GermanyIcon from '../../assets/dashboardimg/germany.png'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     home,
//     settings,
//     subscriptionplan,
//     thoughts,
//     signin,
//     editprofile
// } from '../../config/routingConsts'
// import { logout } from '../../Redux/Actions/AuthActions'
// import i18n from '../../Local/i18n'
// import { Form,Tab,Tabs } from 'react-bootstrap'
// import axios from 'axios'
// import GlobalSearch from '../../components/GlobalSearch/GlobalSearch'
// import AutoSuggestedTextBox from '../../components/AutoSuggestedTextBox/AutoSuggestedTextBox'
// import request from '../../util/request'
// import DropDownSearch from '../../components/GlobalSearch/DropDownSearch'
// import ActionItem from '../../pages/Createthought/Inner/components/ActionItem'
// import Facts from '../../pages/Createthought/Inner/components/Facts/Facts'
// import Journal from '../../pages/Createthought/Inner/components/Journal'

// const Header = ({results}) => {
//     const first = useRef(null)
//     const { auth } = useSelector((state) => state.Auth)
//     const { user } = useSelector((state) => state.Auth)
//     const { state } = useLocation()
//     const statescome = [
//         'Change Password',
//         'Edit Profile',
//         'Privacy Policy',
//         'Terms and Conditions'
//     ]

//     const navigate = useNavigate()

//     const [getUsername, setUsername] = useState(null)
//     const [getLastName, setLastName] = useState(null)
//     const [shortName, setShortName] = useState('')
//     const [languageChange, setLanguageChange] = useState(
//         localStorage.getItem('language') || 'en'
//     )
//     useEffect(() => {
//         setUsername(user?.firstName)
//         setLastName(user?.lastName)
//         setShortName(
//             (
//                 user?.firstName.slice(0, 1) + user?.lastName.slice(0, 1)
//             ).toUpperCase()
//         )
//     }, [user?.firstName, user?.lastName, user?.userName])

//     const dispatch = useDispatch()

//     const Logout = () => {
//         dispatch(logout())
//         navigate(home)
//     }
//     const [closee, setClosee] = useState(false)
//     const handleClosee = () => {
//         navigate(editprofile, { state: 'Edit Profile' })
//         setClosee(!closee)
//         first.current.click()
//     }

//     const [wholeSearch, setWholeSearch] = useState('')
//     const [listModalData,setListMoadlData] = useState('')
//     const [responseStore,setResponseStore] = useState('')
//     const [globalSearchData,setGlobalSearchData] = useState([])
//     const inputRef = useRef(null)
//     useEffect (()=> {
//         if(!!!wholeSearch){
//             setGlobalSearchData([])
//         }
//     },[wholeSearch])

//     const handleSearchBar = (e) => {
//         setWholeSearch(e.target.value)
//     }

//     useEffect (()=>{
//         if(wholeSearch){
//             request("POST",`/dashboard/search-list`,{text : wholeSearch},{},true)

//             .then ((res)=> {
//                 setGlobalSearchData(res?.data?.data)
//                 // setResponseStore(res?.data?.data)
//             })
//         }
//     },[wholeSearch])

//      const handleClick = (result) => {

//         const id = result._id
//         const model = result.model
//         const text = result.text
//         request(
//                   'POST',
//                   '/dashboard/search',
//                   {search: id , model : model},
//                   {},
//                   true
//               )
//                   .then((res) =>
//                   {
//                       const thoughtId = res?.data?.data?.thoughtId
//                       switch (model) {
//                         case 'action':
//                           {
//                             return navigate(`${thoughts}/${thoughtId}`,{state : "ActionItemsTab"})
//                           }
//                         case 'facts':
//                             {
//                                 return navigate(`${thoughts}/${thoughtId}`,{state:"Facts"})
//                             }

//                         case 'journal':
//                             {
//                                 return navigate(`${thoughts}/${thoughtId}`,{state:"Journal"})
//                             }

//                         case 'question':
//                             {
//                                 return navigate(`${thoughts}/${thoughtId}`,{state:"QuestionAnswerTab"})
//                             }

//                         case 'thought':
//                             {
//                                 return navigate(`${thoughts}/${thoughtId}`,{state:'VisualizationTab'})
//                             }
//                       }
//                     }
//                     )
//                     .catch((e) => console.log(e,"error"))
//                     setWholeSearch(text)
//                     setGlobalSearchData([])
//       }

//     return (
//         <>
//             <div className="header-area">
//                 <Navbar expand="lg">
//                     <div className="container">
//                         <div className="headermain-box">
//                             <div className="dash-logo">
//                                 <Link to={home}>
//                                     <LogoImg />
//                                 </Link>
//                             </div>
//                             <Navbar.Toggle
//                                 aria-controls="basic-navbar-nav"
//                                 ref={first}
//                             />
//                             <Navbar.Collapse id="basic-navbar-nav">
//                                 <Nav className="me-auto header-menu header-mobile d-none">
//                                     <ul className="sidebar-menu">
//                                         <li>
//                                             <Nav.Link
//                                                 as={NavLink}
//                                                 to={home}
//                                                 state="Dashboard"
//                                                 end
//                                                 onClick={() =>
//                                                     first.current.click()
//                                                 }
//                                             >
//                                                 <span>
//                                                     <D1 />
//                                                 </span>
//                                                 Dashboard
//                                             </Nav.Link>
//                                         </li>
//                                         <li>
//                                             <Nav.Link
//                                                 as={NavLink}
//                                                 to={thoughts}
//                                                 state="Thoughts"
//                                                 onClick={() =>
//                                                     first.current.click()
//                                                 }
//                                                 end
//                                             >
//                                                 <span>
//                                                     <D2 />
//                                                 </span>
//                                                 Challenges
//                                             </Nav.Link>
//                                         </li>
//                                         <li>
//                                             <Nav.Link
//                                                 as={NavLink}
//                                                 to={subscriptionplan}
//                                                 state="Subscription Plan"
//                                                 onClick={() =>
//                                                     first.current.click()
//                                                 }
//                                                 end
//                                             >
//                                                 <span>
//                                                     <D3 />
//                                                 </span>
//                                                 Subscription Plan
//                                             </Nav.Link>
//                                         </li>
//                                         <li>
//                                             <Nav.Link
//                                                 as={NavLink}
//                                                 to={settings}
//                                                 state="Settings"
//                                                 onClick={() =>
//                                                     first.current.click()
//                                                 }
//                                                 end
//                                             >
//                                                 <span>
//                                                     <D4 />
//                                                 </span>
//                                                 Settings
//                                             </Nav.Link>
//                                         </li>
//                                     </ul>
//                                 </Nav>
//                                 <div className="page-title">
//                                     <h2>
//
//                                         {statescome.includes(state)
//                                             ? 'My Account'
//                                             : state ?? 'Dashboard'}
//                                     </h2>
//                                 </div>
//                                 <Nav className="ms-auto">
//                                     <div className="lang-account-box">
//                                         <div className=" search-box p-0">
//                                             <Form.Group
//                                                 className="formbox"
//                                                 controlId="formBasicEmail"
//                                             >
//                                                 <Form.Control
//                                                     type="search"
//                                                     placeholder="Search"
//                                                     className="icontrol"
//                                                     // value={wholeSearch}
//                                                     onChange={(e) =>
//                                                         handleSearchBar(e)
//                                                     }
//                                                     autoComplete="off"
//                                                 />
//                                                 <div className="search-icon">
//                                                     <SearchIcon />
//                                                 </div>
//                                             {wholeSearch &&
//                                                 <div className="dropdown-panel">
//                                                     {globalSearchData.map((result) => (
//                                                         <div> <p key={result._id} onClick = {()=> handleClick(result)}> {result.text}</p>  </div>
//                                                     ))}
//                                                 </div>
//                                             }
//                                             </Form.Group>

//                                             {/* <AutoSuggestedTextBox /> */}
//                                         </div>
//                                         {/* <GlobalSearch /> */}
//                                         {/* onClick={onClickGetDataSearch} */}
//                                         <Dropdown
//                                             align="end"
//                                             onSelect={(e, eventKey) => {
//                                                 i18n.changeLanguage(e)
//                                                 localStorage.setItem(
//                                                     'language',
//                                                     e
//                                                 )
//                                                 setLanguageChange(e)
//                                             }}
//                                         >
//                                             <Dropdown.Toggle
//                                                 variant="success"
//                                                 id="dropdown-basic"
//                                             >
//                                                 <div className="toggle-image">
//                                                     <img
//                                                         src={
//                                                             languageChange ===
//                                                             'en'
//                                                                 ? AmericanIcon
//                                                                 : GermanyIcon
//                                                         }
//                                                         alt=""
//                                                         className="img-fluid"
//                                                     />
//                                                     {languageChange === 'en'
//                                                         ? 'English'
//                                                         : 'German'}
//                                                 </div>
//                                             </Dropdown.Toggle>

//                                             <Dropdown.Menu>
//                                                 <Dropdown.Item eventKey="en">
//                                                     <div className="toggle-image">
//                                                         <img
//                                                             src={AmericanIcon}
//                                                             alt=""
//                                                             className="img-fluid"
//                                                         />
//                                                         English
//                                                     </div>
//                                                 </Dropdown.Item>
//                                                 <Dropdown.Item eventKey="de">
//                                                     <div className="toggle-image">
//                                                         <img
//                                                             src={GermanyIcon}
//                                                             alt=""
//                                                             className="img-fluid"
//                                                         />
//                                                         German
//                                                     </div>
//                                                 </Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>
//                                         <Dropdown align="end">
//                                             <Dropdown.Toggle
//                                                 variant="success"
//                                                 id="dropdown-basic"
//                                             >
//                                                 <div className="toggle-image">
//                                                     <div className="user-avtar">
//                                                         <div className="green-square">
//                                                             <img
//                                                                 src={greenbox}
//                                                                 alt=""
//                                                                 className="img-fluid"
//                                                             />
//                                                             <div className="user-letter">
//                                                                 {shortName}
//                                                             </div>
//                                                         </div>

//                                                         <div className="user-name">
//
//                                                             {getUsername}
//                                                             {getLastName}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </Dropdown.Toggle>
//                                             <Dropdown.Menu className="myprofile">
//                                                 <Dropdown.Item
//                                                     onClick={handleClosee}
//                                                 >
//                                                     <div className="toggle-image">
//                                                         <span>
//                                                             <img
//                                                                 src={userIcon}
//                                                                 alt=""
//                                                             />
//                                                         </span>
//                                                         My Account
//                                                     </div>
//                                                 </Dropdown.Item>
//                                                 <Dropdown.Item onClick={Logout}>
//                                                     <div className="toggle-image">
//                                                         <span>
//                                                             <img
//                                                                 src={logoutIcon}
//                                                                 alt=""
//                                                             />
//                                                         </span>
//                                                         Log out
//                                                     </div>
//                                                 </Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>
//                                     </div>
//                                 </Nav>
//                             </Navbar.Collapse>
//                         </div>
//                     </div>
//                 </Navbar>
//             </div>
//         </>
//     )
// }

// export default Header
