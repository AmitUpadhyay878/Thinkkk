import React from 'react'
import { useLocation, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { Breadcrumb } from 'react-bootstrap'
import {
    changepassword,
    dashboard,
    editprofile,
    myaccount,
    privacipolici,
    termandcondi
} from '../../config/routingConsts'

const Myaccount = ({ children }) => {
    const { state } = useLocation()
    const navigate = useNavigate()
    return (
        <>
            <div className="myaccount-page">
                <div className="side-pagecontent recentthought-page">
                    <div className="recent-thoughtbox scrollbar">
                        <div className="card">
                            <div className="header-box">
                                <div className="title-text">
                                    <Breadcrumb
                                        className="myaccount-links"
                                        as="ul"
                                    >
                                        <Breadcrumb.Item
                                            as="li"
                                            disabled
                                            className="disable"
                                            onClick={() => {
                                                navigate('/')
                                            }}
                                        >
                                            Dashboard
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item
                                            as="li"
                                            disabled
                                            className="disable"
                                            onClick={()=>{navigate(editprofile , {state : "Edit Profile"})}}
                                        >
                                            My Account
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item as="li" active={true}>
                                            {state}
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </div>
                        </div>
                        <div className="myaccount-wholebox">
                            <div className="row">
                                <div className="col-lg-3 col-md-12 col-12">
                                    <div className="sidebar">
                                        <ul className="sidebar-menu">
                                            <li>
                                                <Nav.Link
                                                    as={NavLink}
                                                    to={editprofile}
                                                    state="Edit Profile"
                                                    end
                                                >
                                                    Edit Profile
                                                </Nav.Link>
                                            </li>
                                            <li>
                                                <Nav.Link
                                                    as={NavLink}
                                                    to={changepassword}
                                                    state="Change Password"
                                                    end
                                                >
                                                    Change Password
                                                </Nav.Link>
                                            </li>
                                            <li>
                                                <Nav.Link
                                                    as={NavLink}
                                                    to={privacipolici}
                                                    state="Privacy Policy"
                                                    end
                                                >
                                                    Privacy Policy
                                                </Nav.Link>
                                            </li>

                                            <li>
                                                <Nav.Link
                                                    as={NavLink}
                                                    to={termandcondi}
                                                    state="Terms and Conditions"
                                                    end
                                                >
                                                    Terms and Conditions
                                                </Nav.Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Outlet />
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Myaccount
