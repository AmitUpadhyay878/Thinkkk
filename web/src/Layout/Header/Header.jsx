import React, { useState } from 'react'
//React BootStrap
import { NavItem } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from '../../components/Button'
//React-Router-Dom
import { Link, NavLink, useNavigate } from 'react-router-dom'
//Route Consts
import {
    aboutUs,
    contactus,
    home,
    price,
    signin,
    signup
} from '../../config/routingConsts'
//Images
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger-menu-icon.svg'
import { ReactComponent as Close } from '../../assets/images/close-icon.svg'
import AppearDiv from '../../components/Appeardiv/AppearDiv'
const Header = () => {
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate()

    const handleSignIn = () => {
        setToggle(false)
        navigate(signin)
    }

    const handleSignUp = () => {
        setToggle(false)
        navigate(signup)
    }
    return (
        <div className="header-area">
            <Navbar expand="lg" className="header-box">
                <div className="container">
                    <div className="logo-menuicon">
                            <div className="think-logo">
                                <Link to={home}>
                                    <Logo />
                                </Link>
                            </div>
                        <div className="toggle-wrap">
                            {toggle ? (
                                <div className="open-menu icon-size">
                                    <Close
                                        onClick={() => {
                                            setToggle(false)
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="open-menu icon-size">
                                    <Hamburger
                                        onClick={() => {
                                            setToggle(true)
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`header-whole-box ${toggle ? 'active' : ''}`}
                    >
                        <Nav as="ul" className="header-menu">
                            <NavItem as="li">
                                <Nav.Link
                                    as={NavLink}
                                    to={home}
                                    onClick={() => setToggle(false)}
                                    end
                                >
                                    Home
                                </Nav.Link>
                            </NavItem>
                            <NavItem as="li">
                                <Nav.Link
                                    as={NavLink}
                                    to={aboutUs}
                                    onClick={() => setToggle(false)}
                                    end
                                >
                                    About Us
                                </Nav.Link>
                            </NavItem>
                            <NavItem as="li">
                                <Nav.Link
                                    as={NavLink}
                                    to={price}
                                    onClick={() => setToggle(false)}
                                    end
                                >
                                    Pricing
                                </Nav.Link>
                            </NavItem>
                            <NavItem as="li">
                                <Nav.Link
                                    as={NavLink}
                                    to={contactus}
                                    onClick={() => setToggle(false)}
                                    end
                                >
                                    Contact Us
                                </Nav.Link>
                            </NavItem>
                        </Nav>
                        <div className="signupbtn-box">
                            <Button
                                text="Sign In"
                                addedClass="sign-in"
                                onClick={handleSignIn}
                            />
                            <Button
                                text="Sign Up"
                                addedClass="sign-up"
                                onClick={handleSignUp}
                            />
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Header
