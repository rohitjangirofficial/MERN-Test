import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiUrl } from "../helpers/ApiUrl";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userType, setUserType] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const resp = await axios.post(`${ApiUrl}/register`, {
        firstName,
        lastName,
        email,
        mobileNumber,
        userType,
      });
      setLoading(false);
      if (resp.data.success) {
        toast.success(resp.data.message);
        navigate("/login");
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
      <form onSubmit={signupHandler}>
        <h3 className="form_heading">Sign Up</h3>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          required
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          required
          type="text"
          placeholder="Last Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          type="tel"
          pattern="[1-9]{1}[0-9]{9}"
          placeholder="Mobile Number (10 Digits)"
        />
        <select required onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select User Type</option>
          <option value="retailer">Retailer</option>
          <option value="wholesaler">Wholesaler</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit">{loading ? "Loading..." : "Sign Up"}</button>
        <hr />
        <span>
          Already Have An Account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
