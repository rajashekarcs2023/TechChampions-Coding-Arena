import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DisableGoBackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isLoginPage = location.pathname === "/user/signIn";
        const token = sessionStorage.getItem("jwtToken");

        if (isLoginPage && token) {
            navigate("/problems/list");
        }
    }, [location.pathname, navigate]);

    return null;
};

export default DisableGoBackButton;
