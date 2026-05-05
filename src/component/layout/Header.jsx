import React, { useState } from "react";
import "./style/header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <div className="header-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="left">
          <div className="brand">
            <h4>Rencode</h4>
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
            <span>R</span>
          </div>
        </div>
        {open && (
          <>
            <div className="open-cont">
              <div className="top">
                <div className="bt-a">
                  <button>Sign In</button>
                </div>
                <div className="bt-b">
                  <button>LogIn</button>
                </div>
              </div>
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
