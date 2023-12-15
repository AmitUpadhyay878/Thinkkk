import React, { useState } from 'react'
import { Form, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import d1 from "../../assets/images/dashboard.png";
import menu from "../../assets/images/menu.png";

import { changepassword, editprofile } from "../../config/routingConsts";

const MyAccount = ({ children }) => {
  const [flag, setflag] = useState(false);
  return (
    <>
      <div className="myaccount-page">
        <div className="row">
          <div className="col-lg-3 col-md-auto col-12">
            <div className={`myaccount-sidebar ${flag ? "active" : ""}`}>
            
              <ul className="sidebar">
                <li>
                  <Nav.Link as={NavLink} to={editprofile} end> <span>

                  </span>Edit Profile</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={NavLink} end to={changepassword}>
                    <span>

                    </span>Change Password</Nav.Link>
                </li>
              </ul>
              {/* toggle */}
              <div className="toggle">
                <img
                  src={menu}
                  alt=""
                  onClick={() => setflag(!flag)}
                  className="img-fluid"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
              {/*  */}
            </div>
          </div>
          <div className="col-lg-9 col-md-auto col-12">
            <div className="content-page myaccount-content" style={{ padding: "20px" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount