import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {signin} from '../config/routingConsts'

const ProtectedRoute = ({ children }) => {

    const {isLoggedIn} = useSelector(state=>state.Auth)

    if (isLoggedIn === true) return (
      children
    );
    else if (isLoggedIn === false) return <Navigate to={signin} />;
    
    else return null;


}

export default ProtectedRoute