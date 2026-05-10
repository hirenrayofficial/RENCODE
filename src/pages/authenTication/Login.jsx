import React, { useState } from "react";
import "./style/login.scss";
import { loginApi } from "../../component/api/ApiProvider";
import { toast } from "sonner";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handelSubmit = async () => {
    // 1. Basic validation
    if (!email || !pass) {
      return toast.error("Please fill in all fields");
    }

    try {
      const res = await loginApi(email, pass);

      // 2. Handle Success
      if (res.status === 200 && res.data.token) {
        toast.success("Login Successful");

        // Store user info (Avoid storing sensitive tokens in localStorage if possible)
        const userData = {
          name: res.data.name,
          role: res.data.role || "admin",
        };
        localStorage.setItem("edit-u-nm", JSON.stringify(userData));

        // SECURE PRACTICE: Set token in a way that doesn't leak in the URL
        // If you must use localStorage:
        localStorage.setItem("auth-token", res.data.token);

        return window.location.replace("/editor");
      }

      // 3. Handle specific known errors (401 Unauthorized, etc.)
      if (res.status === 401) {
        return toast.error("Invalid email or password");
      }

      // 4. Fallback for other status codes
      throw new Error("Unexpected response status");
    } catch (error) {
      // 5. Generic error handling for the user
      console.error("Login attempt failed"); // Log a generic message, not the full error

      if (error.response) {
        // The server responded with a status code outside the 2xx range
        toast.error("Authentication failed. Please try again.");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-main">
        <div className="input-section">
          <div className="input-a">
            <label htmlFor="">Enter Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="input-a">
            <label htmlFor="">Enter Password</label>
            <input onChange={(e) => setPass(e.target.value)} type="password" />
          </div>

          <div className="submit-b">
            <button onClick={(e) => handelSubmit()}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
