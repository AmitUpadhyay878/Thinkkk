import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { editprofile, home, myaccount, setting, signin, thoughtmanagement, transactionmanagement, usermanagement } from "../../config/routingConsts";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/AuthActions";
import greenbox from '../../assets/images/greenrect.png'
import user from '../../assets/images/user.png'
import { ReactComponent as UserManagement } from "../../assets/images/Sidebar/UserManagement.svg";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as D1 } from '../../assets/images/DashboardImg/d1.svg'
import { ReactComponent as D2 } from '../../assets/images/DashboardImg/d2.svg'
import { ReactComponent as D3 } from '../../assets/images/Sidebar/TransactionManagement.svg'
import { ReactComponent as D4 } from '../../assets/images/DashboardImg/d4.svg'
const Header = () => {
  const { auth, admin } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const first = useRef(null)

  const [email, setEmail] = useState("");
  const [PImage, setPImage] = useState("");
  const [sname, setSname] = useState("")
  const [closee, setClosee] = useState(false)

  const shortName = async () => {
    const sn = await setSname(admin.firstName.slice(0, 1) + admin.lastName.slice(0, 1))
  }

  useEffect(() => {
    if (admin) {
      setEmail(admin?.email);
      setPImage(admin?.profileImage)
      shortName()
    } else {
      navigate(signin);
    }
  }, [admin]);

  const handleClose = () => {
    setClosee(!closee)
    navigate(editprofile)
    first.current.click()
  }

  const Logout = () => {
    dispatch(logout());
    navigate(signin)
  };

  return (
    <>
      <Navbar className="topbar-header" expand="lg">
      <div className="think-logo topbar-desktop">
          <Logo />
       </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  ref={first} />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="top-bar">
           
            <ul className="sidebar mobile">
              <li>
                <NavLink to={home} end onClick={() => first.current.click()}> <span>
                  <D1 />
                </span>Dashboard</NavLink>
              </li>
              <li>
                <NavLink end to={usermanagement} onClick={() => first.current.click()}>
                  <span>
                    <UserManagement />
                  </span> User Management</NavLink>
              </li>
              <li>
                <NavLink end to={thoughtmanagement} onClick={() => first.current.click()}> 
                  <span>
                    <D2 />
                  </span> Thought Management</NavLink>
              </li>
              {/* <li>
                <NavLink end to={transactionmanagement}>
                  <span>
                    <D3 />
                  </span> Transaction Management</NavLink>
              </li> */}
              <li>
                <NavLink end to={setting} onClick={() => first.current.click()}>
                  <span>
                    <D4 />
                  </span>Settings</NavLink>
              </li>
            </ul>
            <div className="user">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <div className="avtar">
                    <img src={PImage } />
                  </div>
                  <div className="email">{email}</div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item onClick={handleClose}>
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item onClick={Logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
