import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import {
  home,
  signin,
  pageNotFound,
  usermanagement,
  thoughtmanagement,
  transactionmanagement,
  setting,
  useraddedit,
  forgotpassword,
  resetpassword,
  thoughtaddedit,
  myaccount,
  editprofile,
changepassword
} from "./routingConsts";
import NotFound from "../pages/NotFound";
import UserManagement from "../pages/UserManagement";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Singin";
import TransactionManagment from "../pages/TransactionManagement";
import ThoughtManagement from "../pages/ThoughtManagement";
import Settings from "../pages/Settings";
import UserAddEdit from "../pages/UserManagement/components/UserAddEdit";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ThoughtAddEdit from "../pages/ThoughtManagement/Components/ThoughtAddEdit";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import MyAccount from "../pages/MyAccount/MyAccount";
import EditProfile from "../pages/MyAccount/EditProfile/EditProfile";
import ChangePassword from "../pages/MyAccount/ChangePassword/ChangePassword";
const Routing = () => {

  return (
    <div>
      <Routes>
        <Route path={home} element={<Layout />}>
          <Route
            index
            element={<ProtectedRoute><Dashboard /></ProtectedRoute> }/>
          <Route
            path={usermanagement}
            element={<ProtectedRoute><UserManagement /></ProtectedRoute>}/>
          <Route
            path={thoughtmanagement}
            element={<ProtectedRoute><ThoughtManagement/></ProtectedRoute>}/>
          <Route
            path={useraddedit}
            element={<ProtectedRoute><UserAddEdit /></ProtectedRoute>}/>
          <Route
            path={thoughtaddedit}
            element={<ProtectedRoute><ThoughtAddEdit /></ProtectedRoute>}/>
          <Route
            path={transactionmanagement}
            element={<ProtectedRoute><TransactionManagment /></ProtectedRoute>}/>
          <Route
            path={setting}
            element={<ProtectedRoute><Settings /></ProtectedRoute>} />
           

          <Route
              path={editprofile} element={<MyAccount> <EditProfile /></MyAccount>}/>
              <Route path={changepassword} element={<MyAccount><ChangePassword /></MyAccount>} /> 
        </Route>
        <Route path={signin} element={<Signin />} />
        <Route path={forgotpassword} element={<ForgotPassword />} />
        <Route path={resetpassword} element={<ResetPassword />} />
        <Route path={pageNotFound} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routing;
