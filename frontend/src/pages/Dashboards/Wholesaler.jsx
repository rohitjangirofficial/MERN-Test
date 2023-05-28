import React from "react";
import LogoutBtn from "../../components/LogoutBtn";

function Wholesaler({ user }) {
  return (
    <div className="container">
      <h2>User Type - {user?.userType}</h2>
      <h2>
        User Name - {user?.firstName} {user?.lastName}
      </h2>
      <h2>User Email - {user?.email}</h2>
      <LogoutBtn label="Logout" />
    </div>
  );
}

export default Wholesaler;
