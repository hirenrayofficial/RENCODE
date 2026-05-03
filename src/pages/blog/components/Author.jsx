import React from "react";
import { FiMail, FiGlobe, FiGithub, FiTwitter } from "react-icons/fi";
import "../style/author.scss";

export default function AuthorComponent({ author }) {
  if (!author) return null;

  const {
    name = "Anonymous Author",
    avatar = "https://via.placeholder.com/80",
    bio = "Writer and developer",
    email,
    website,
    github,
    twitter,
  } = author;

  return (
    <div className="author-component">
      <div className="author-container">
        <img src={avatar} alt={name} className="author-avatar" />
        <div className="author-content">
          <h3 className="author-name">{name}</h3>
          <p className="author-bio">{bio}</p>
          <div className="author-links">
            {email && (
              <a
                href={`mailto:${email}`}
                className="social-link"
                title="Email"
                aria-label={`Email ${name}`}
              >
                <FiMail size={18} />
              </a>
            )}
            {website && (
              <a
                href={website}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                aria-label={`${name}'s website`}
              >
                <FiGlobe size={18} />
              </a>
            )}
            {github && (
              <a
                href={`https://github.com/${github}`}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label={`${name}'s GitHub`}
              >
                <FiGithub size={18} />
              </a>
            )}
            {twitter && (
              <a
                href={`https://twitter.com/${twitter}`}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                aria-label={`${name}'s Twitter`}
              >
                <FiTwitter size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
