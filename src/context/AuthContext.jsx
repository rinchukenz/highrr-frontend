import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null);

  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    adminId: null,
    role: null,
    token: null,
    name: null,
    organizationId: null,
    organizationName: null,
  });

  const [studentAuth, setStudentAuth] = useState({
    token: null,
    email: null,
    name: null,
    refreshToken: null,
  });

  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshToken");

    setAuth({
      isLoggedIn: false,
      user: null,
      adminId: null,
      role: null,
      token: null,
      name: null,
      organizationId: null,
      organizationName: null,
    });

    setStudentAuth({
      token: null,
      email: null,
      name: null,
      refreshToken: null,
    });

    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    //navigate("/");
  };

  const scheduleLogout = (exp, isStudent = false) => {
    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    const now = Date.now();
    const expiryTime = exp * 1000;
    let timeoutDuration;

    if (isStudent) {
      // Refresh 1 minute before expiry
      timeoutDuration = expiryTime - now - 60 * 1000;
      if (timeoutDuration < 0) timeoutDuration = 0; // refresh immediately if already close
      logoutTimeoutRef.current = setTimeout(() => {
        refreshStudentToken();
      }, timeoutDuration);
    } else {
      // Admin or other role → logout at expiry
      timeoutDuration = expiryTime - now;
      if (timeoutDuration < 0) timeoutDuration = 0;
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
      }, timeoutDuration);
    }
  };

  const refreshStudentToken = async () => {
    console.log("Refreshing student token...");
    const email = localStorage.getItem("email");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!email || !refreshToken) {
      logout();
      return;
    }

    try {
      const token = (
        await axios.post("http://localhost:8080/api/users/refresh-token", {
          email,
          refreshToken,
        })
      ).data; // backend returns only the token string

      if (!token || typeof token !== "string") {
        console.error("Invalid token received");
        logout();
        return;
      }

      const decoded = jwtDecode(token);
      console.log("Decoded new token:", decoded);

      localStorage.setItem("token", token);

      setStudentAuth({
        token,
        email,
        name: localStorage.getItem("name") || null,
        refreshToken, // keep old refresh token
      });

      scheduleLogout(decoded.exp, true); // refresh before expiry
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        const {
          exp,
          sub: user,
          id: adminId,
          role,
          name,
          organizationId,
          organizationName,
        } = decoded;

        const isExpired = Date.now() >= exp * 1000;

        if (!isExpired) {
          if (role === "USER") {
            setStudentAuth({
              token,
              email: user,
              name: localStorage.getItem("name") || null,
              refreshToken: localStorage.getItem("refreshToken") || null,
            });
            scheduleLogout(exp, true); // student → refresh before expiry
          } else {
            setAuth({
              isLoggedIn: true,
              user,
              adminId,
              role,
              token,
              name,
              organizationId,
              organizationName,
            });
            scheduleLogout(exp, false); // admin → logout at expiry
          }
        } else if (role === "USER") {
          refreshStudentToken(); // student token expired → try refresh
        } else {
          logout(); // admin token expired → logout
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    } else {
      logout();
    }

    setLoading(false);

    return () => {
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        studentAuth,
        setStudentAuth,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
