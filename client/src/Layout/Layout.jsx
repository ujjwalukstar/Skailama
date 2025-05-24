import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // checks the token is exist or not
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};
