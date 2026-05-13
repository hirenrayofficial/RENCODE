import React, { useState } from "react";
import "./style/login.scss";
import { loginApi } from "../../component/api/ApiProvider";
import { toast } from "sonner";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handelSubmit = async () => {
    setIsLoggedIn(false); // Disable the button immediately to prevent multiple clicks
    // 1. Basic validation
    if (!email || !pass) {
      return toast.error("Please fill in all fields");
    }

    toast.promise(loginApi(email, pass), {
      loading: "Fetch Your Login Details..",
      success: (data) => {
        "Login Success";
        setIsLoggedIn(true);
        if (data.status === 200 && data.data.token) {
          const userData = {
            id: data.data.id,
            name: data.data.name,
            role: data.data.role,
          };

          localStorage.setItem("edit-u-nm", JSON.stringify(userData));

          // SECURE PRACTICE: Set token in a way that doesn't leak in the URL
          // If you must use localStorage:
          localStorage.setItem("auth-token", data.data.token);

          return window.location.replace(
            `/editor?token=${data.data.token}&id=${data.data.id}`,
          );
        }
        if (data.status === 401) {
          return toast.error("Invalid email or password");
        }

        return;
      },
      error: (err) => {
        setIsLoggedIn(true); // Re-enable button so they can try again
        console.error("Connection error:", err);
        return `Failed to Login. Please check your connection.`;
      },
    });
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
            <button
              onClick={(e) => handelSubmit()}
              disabled={!isLoggedIn} // Button is disabled if NOT logged in
              style={{
                opacity: isLoggedIn ? 1 : 0.5,
                cursor: isLoggedIn ? "pointer" : "not-allowed",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
