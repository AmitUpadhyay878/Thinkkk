import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { ReactComponent as UserManagement } from "../../assets/images/Sidebar/UserManagement.svg";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as D1 } from '../../assets/images/DashboardImg/d1.svg'
import { ReactComponent as D2 } from '../../assets/images/DashboardImg/d2.svg'
import { ReactComponent as D3 } from '../../assets/images/Sidebar/TransactionManagement.svg'
import { ReactComponent as D4 } from '../../assets/images/DashboardImg/d4.svg'
import menu from "../../assets/images/menu.png";
import { home, setting, thoughtmanagement, transactionmanagement, usermanagement } from "../../config/routingConsts";
const SideBar = () => {
  const navigate= useNavigate()
  const [flag, setflag] = useState(false);
 
    function gotohome(){
      navigate(home)
  }

  return (
    <>
      <div className={`navigation desktop ${flag ? "active" : ""}`}>
      <div className="think-logo sidebar text-center">
            <Logo onClick={gotohome} style={{cursor:"pointer"}} />
          </div>
        <ul className="sidebar">
          <li>
            <NavLink to={home}  onClick={()=>setflag(false)} end> <span>
              <D1 />
            </span>Dashboard</NavLink>
          </li>
          <li>
            <NavLink  to={usermanagement} onClick={()=>setflag(false)} end>
              <span>
                <UserManagement />
              </span> User Management</NavLink>
          </li>
          <li>
            <NavLink  to={thoughtmanagement} onClick={()=>setflag(false)} end>
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
            <NavLink  to={setting} onClick={()=>setflag(false)} end>
              <span>
                <D4 />
              </span>Settings</NavLink>
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
      </div>
    </>

  )
}

export default SideBar