import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    const loggedInUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('userStatus');
    return (
        loggedInUser?
        <Outlet/>
        :<Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;