import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // or /signin based on your route
    } else {
      navigate("/dashboard");
    }
    setLoading(false); // stop loading once check is done
  }, [navigate]);

  if (loading) return null;

  return children;
};

export default AuthCheck;
