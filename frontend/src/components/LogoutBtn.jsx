import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LogoutBtn({ label }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <button onClick={logoutHandler} className="logout_btn">
      {label}
    </button>
  );
}

export default LogoutBtn;
