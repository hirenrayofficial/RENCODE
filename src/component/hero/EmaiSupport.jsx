import React from 'react'
import './style/emails.scss'

export default function EmailSupport() {
  return (
    <section className="email-newsletter">
      <div className="bg-gradient-blur" aria-hidden="true" />
      
      <div className="content-wrapper">
        <div className="text-section">
          <h3>Stay in the loop</h3>
          <p>Get the latest blog posts and industry insights delivered to your inbox.</p>
        </div>

        <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
            />
            <button type="submit" className="submit-btn">
              Subscribe
            </button>
          </div>
          <span className="privacy-note">We care about your data. No spam, ever.</span>
        </form>
      </div>
    </section>
  );
}
