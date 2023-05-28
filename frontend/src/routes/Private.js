import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Retailer from "../pages/Dashboards/Retailer";
import Wholesaler from "../pages/Dashboards/Wholesaler";
import Vendor from "../pages/Dashboards/Vendor";

function Private() {
  const authState = useAuth();
  console.log(authState);

  const navigate = useNavigate();

  if (authState?.user?.userType === "retailer") {
    return <Retailer user={authState?.user} />;
  } else if (authState?.user?.userType === "wholesaler") {
    return <Wholesaler user={authState?.user} />;
  } else if (authState?.user?.userType === "vendor") {
    return <Vendor user={authState?.user} />;
  } else {
    navigate("/login");
  }
}

export default Private;
