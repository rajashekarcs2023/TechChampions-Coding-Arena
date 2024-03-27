import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [tokenExpiration, setTokenExpiration] = useState(
    sessionStorage.getItem("tokenExpiration")
  );
  const [token, setToken] = useState(sessionStorage.getItem("jwtToken"));
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const login = (authToken, userId) => {
    try {
      const decoded = jwtDecode(authToken);
      const expirationTimestamp = decoded.exp;
      const expirationDate = new Date(expirationTimestamp * 1000);

      sessionStorage.setItem("jwtToken", authToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("tokenExpiration", expirationDate.toString());

      setToken(authToken);
      setUserId(userId);
      setTokenExpiration(expirationDate.toString());
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("tokenExpiration");
    sessionStorage.removeItem("userId");

    setToken("");
    setTokenExpiration("");
    setUserId("");

    navigate("/user/signIn");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = sessionStorage.getItem("jwtToken");
      const storedUserId = sessionStorage.getItem("userId");
      setToken(storedToken);
      setUserId(storedUserId);
      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(tokenExpiration).getTime();

        if (currentTime >= expirationTime) {
          console.log("From auth context: token expired");
          logout();
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 10000);
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiration]);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
