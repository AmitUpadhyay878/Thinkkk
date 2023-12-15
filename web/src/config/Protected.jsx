import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signin } from "./routingConsts";
const Protected = ({ isLoggedIn, children }) => {

 if (!isLoggedIn) {
 return <Navigate to={signin} replace />;
 }
 return children;
};
export default Protected;