import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiUrl } from "../helpers/ApiUrl";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const resp = await axios.post(
        `${ApiUrl}/login`,
        {
          email,
          password,
          userType,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (resp.data.success) {
        navigate("/");
        toast.success(resp.data.message);
      }
    } catch (error) {
      error.response
        ? toast.error(error.response.data.message)
        : toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      <form onSubmit={loginHandler}>
        <h3 className="form_heading">Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
        />
        <select required onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select User Type</option>
          <option value="retailer">Retailer</option>
          <option value="wholesaler">Wholesaler</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
        <hr />
        <span>
          Don't Have An Account ? <Link to="/signup">Sign Up</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
