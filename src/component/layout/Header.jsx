import React, { useState } from "react";
import "./style/header.scss";
import { useDraw } from "../../context/DrawerContext";
import { useAuth } from "../../context/AuthContext";
import { logOut } from "../../editor/component/api/apiEditor";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { opensigndraw } = useDraw();
  const [searchprams, setSearchprams] = useSearchParams();
  const { login } = useAuth();

  const handelOpen = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  searchprams.get("type");

  const handelLogin = ({type}) => {
    // alert(type)
    if (type === "login") {
      setSearchprams({ type: `${type}` });
      opensigndraw();
    } else if (type === "signin") {
      setSearchprams({ type: `${type}` });
      opensigndraw();
    }
  };
  const handelLogout = async () => {
    const res = await logOut();
    toast.success("logout success");
    if (res) {
      return window.location.replace("/");
    } else {
      return window.location.replace("/");
    }
  };
  return (
    <div className="header-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="left">
          <div className="brand">
            {/* <h4>Rencode</h4> */}
            <img src="/logo.png" style={{ width: "120px" }} alt="" />
          </div>
        </div>
        {/* <div className="center">
          <div className="link-a">
            <a href="/">Protfollio</a>
          </div>
          <div className="link-a">
            <a href="/">About Me</a>
          </div>
        </div> */}
        <div className="right">
          <div className="avtar-menu" onClick={handelOpen}>
            <span>{login?.user_name?.slice(0, 1) || "R"}</span>
          </div>
        </div>
        {open && (
          <>
            <div className="open-cont">
              {login ? (
                <div className="bottom">
                  <div className="links">
                    <a href="/">Feedback</a>
                  </div>
                  <div className="links">
                    <a href="/">Contact Us</a>
                  </div>
                  <div className="links">
                    <a href="/">Share</a>
                  </div>
                  <div className="bt-a">
                    <button onClick={handelLogout}>Log out</button>
                  </div>
                </div>
              ) : (
                <div className="top">
                  <div className="bt-a">
                    <button onClick={(e) => handelLogin({ type: "signin" })}>
                      Sign In
                    </button>
                  </div>
                  <div className="bt-b">
                    <button onClick={(e) => handelLogin({ type: "login" })}>
                      LogIn
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
