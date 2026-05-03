import React from "react";
import { FiShare2, FiFacebook, FiTwitter, FiLinkedin, FiLink2 } from "react-icons/fi";
import "../style/sharebtn.scss";

export default function ShareButtons({ title, url }) {
  const [showAlert, setShowAlert] = React.useState(false);

  if (!title) return null; // Don't render if title is missing

  const shareUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title || "Check this out");
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link. Please try again.");
    }
  };

  const openShareWindow = (link) => {
    window.open(
      link,
      "share",
      "width=600,height=400,left=200,top=200"
    );
  };

  return (
    <div className="share-buttons">
      <p className="share-label">
        <FiShare2 size={16} /> Share this article
      </p>
      <div className="share-container">
        <button
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="share-btn twitter"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <FiTwitter size={18} />
        </button>
        <button
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="share-btn facebook"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <FiFacebook size={18} />
        </button>
        <button
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="share-btn linkedin"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <FiLinkedin size={18} />
        </button>
        <button
          onClick={handleCopyLink}
          className={`share-btn copy-link ${showAlert ? "copied" : ""}`}
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          <FiLink2 size={18} />
          {showAlert && <span className="copy-alert">Copied!</span>}
        </button>
      </div>
    </div>
  );
}
