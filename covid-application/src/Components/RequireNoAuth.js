import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireNoAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    const loggedInUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('userStatus');

    return (
        loggedInUser==null
        ?<Outlet/>
        : <Navigate to="/profile" state={{from: location}} replace/>
    );
}

export default RequireNoAuth;