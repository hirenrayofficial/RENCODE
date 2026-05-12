import React from "react";
import { FiMail, FiGlobe, FiGithub, FiTwitter } from "react-icons/fi";
import "../style/author.scss";

export default function AuthorComponent({ author }) {
  if (!author) return null;
  console.log(author);

  // Demo author data for testing
  const demoAuthor = {
    name: "Hiren Ray",
    avatar: "https://avatars.githubusercontent.com/u/166147435?v=4",
    bio: "Full-stack developer and tech writer. Passionate about building amazing web experiences.",
    email: "contact@hirenray.rest",
    website: "https://iam.hirenray.rest",
    github: "https://github.com/hirenrayofficial",
  };
  const tempAuthor = {
    name: author,
    avatar: "data:image/jpeg;base64,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",
    bio: "Hii Iam a tech writer. Passionate about Writing amazing web Article.",
    email: `contact@hirenray.rest/${author}`,
    website: "",
    github: "",
  };

  const checkAuthor = author === "Hiren Ray" ? demoAuthor : tempAuthor;

  return (
    <div className="author-component">
      <div className="author-container">
        <img
          src={checkAuthor.avatar}
          alt={checkAuthor.name}
          className="author-avatar"
        />
        <div className="author-content">
          <h3 className="author-name">{checkAuthor.name}</h3>
          <p className="author-bio">{checkAuthor.bio}</p>
          <div className="author-links">
            {checkAuthor.email && (
              <a
                href={`mailto:${checkAuthor.email}`}
                className="social-link"
                title="Email"
                aria-label={`Email ${checkAuthor.name}`}
              >
                <FiMail size={18} />
              </a>
            )}
            {checkAuthor.website && (
              <a
                href={checkAuthor.website}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                aria-label={`${checkAuthor.name}'s website`}
              >
                <FiGlobe size={18} />
              </a>
            )}
            {checkAuthor.github && (
              <a
                href={`https://github.com/${checkAuthor.github}`}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label={`${checkAuthor.name}'s GitHub`}
              >
                <FiGithub size={18} />
              </a>
            )}
            {checkAuthor.twitter && (
              <a
                href={`https://twitter.com/${checkAuthor.twitter}`}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                aria-label={`${checkAuthor.name}'s Twitter`}
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
