import React from "react";
import "./style/footer.scss";

export default function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-content">
        <div className="content">
          <div className="left">
            <div className="brand">
              <h2>Rencodes</h2>
            </div>
            <div className="details">
              I create free learning resource for student,
              developer,programer,engenier acces esayliy to read anything and
              learn somthing new knowledge
            </div>
          </div>
          <div className="center-quick-links">
            <div className="links-a">
              <a href="/">Top</a>
            </div>
            <div className="links-a">
              <a href="/">Web Dev</a>
            </div>
            <div className="links-a">
              <a href="/">AI Ml</a>
            </div>
            <div className="links-a">
              <a href="/">App Dev</a>
            </div>
            <div className="links-a">
              <a href="/">Startup</a>
            </div>
          </div>
          <div className="right-quick-links">
            <div className="links-a">
              <a href="/">Top</a>
            </div>
            <div className="links-a">
              <a href="/">Contact me</a>
            </div>
            <div className="links-a">
              <a href="/">About me</a>
            </div>
            <div className="links-a">
              <a href="/">Privecy policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyri">
        <span>Made by Hiren Ray Copyright All right Reserve 2026</span>
      </div>
    </div>
  );
}
