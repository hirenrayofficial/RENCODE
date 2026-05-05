import React from "react";
import "./style/footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="brand-section">
            <h2 className="logo">Rencodes<span>.</span></h2>
            <p className="description">
              Empowering students and developers with high-quality, 
              accessible learning resources. Read, code, and master 
              new technologies every day.
            </p>
          </div>

          {/* Links Sections */}
          <nav className="footer-nav">
            <div className="link-group">
              <h4>Categories</h4>
              <ul>
                <li><a href="/web-dev">Web Development</a></li>
                <li><a href="/ai-ml">AI & Machine Learning</a></li>
                <li><a href="/app-dev">App Development</a></li>
                <li><a href="/startup">Startups</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About Me</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Rencodes. Made with ❤️ by <span>Hiren Ray</span></p>
          <div className="social-placeholders">
            {/* You can add Social Icons here later */}
          </div>
        </div>
      </div>
    </footer>
  );
}