import React, { useEffect, useRef, useState } from "react";
import "./style/signdraw.scss";
import { useDraw } from "../../context/DrawerContext";
import { toast } from "sonner";
import { signApi } from "../api/ApiProvider";
import { useSearchParams } from "react-router-dom";
export default function SignDraw() {
  const { opendraws, setOpendraws } = useDraw();
  const menuRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [searchPrams] = useSearchParams();
  const type = searchPrams.get("type");

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpendraws(null);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [setOpendraws]);

  const handelSign = async () => {
    toast.promise(signApi(name, email, pass, type), {
      loading: "Sign in Progress",
      success: (data) => {
        localStorage.setItem(
          "t-usdtls",
          JSON.stringify(data.data.usdtls, { login: true }),
        );
        window.location.replace("/");
        return "Sign In Successfull";
      },
      error: (err) => {
        return "Sign in Field";
      },
    });
  };

  return (
    <div className="draw-s-main" ref={opendraws === true ? menuRef : null}>
      <div className="d-sign-container">
        <h1>{type === "login" ? "Login Now" : "Sign In Now"}</h1>
        <div className="s-d-input">
          {type === "signin" ? (
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" onClick={(e) => handelSign()}>
            Sign Now
          </button>
        </div>
      </div>
    </div>
  );
}
