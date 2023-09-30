import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const validateRouteExists =  (path) => {
    const routes = ["/", "/signin", "/profile/:id",
        "/register"];
    return routes.includes(path);
};
const PrivateRoute = ({ redirectTo,children }) => {
    const navigate = useNavigate();
    const userId = Cookies.get('userID');

    const isAuthenticated = () => {
        return userId !== undefined && userId !== null && userId !== "0";
    };

    useEffect(() => {
        const routeExists = validateRouteExists(redirectTo);
        if(routeExists) {
            if (redirectTo !== "/register" && !isAuthenticated()) {
                navigate("/signin", {replace: true});
            } else if ((redirectTo === "/register" || redirectTo === "/signin") && isAuthenticated()) {
                navigate("/", {replace: true});
            }
        }else {
            if(isAuthenticated()){
                navigate("/", {replace: true});
            }else {
                navigate("/signin", {replace: true});
            }
        }

    }, [navigate,redirectTo]);

    return <>{children}</>;
};

export default PrivateRoute;
