import React from 'react';
import { FiCopy, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";

const ShareMenu = ({ url, title, onClose }) => {
  const shareUrl = `${window.location.origin}/blog/${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    // alert("Link copied to clipboard!");
    onClose();
  };

  const shareSocial = (platform) => {
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
    onClose();
  };

  return (
    <div className="share-dropdown">
      <button className="menu-item copy-btn" onClick={handleCopy}>
        <FiCopy /> Copy Link
      </button>
      <hr />
      <button className="menu-item" onClick={() => shareSocial('twitter')}>
        <FiTwitter color="#1DA1F2" /> Twitter
      </button>
      <button className="menu-item" onClick={() => shareSocial('facebook')}>
        <FiFacebook color="#1877F2" /> Facebook
      </button>
      <button className="menu-item" onClick={() => shareSocial('linkedin')}>
        <FiLinkedin color="#0A66C2" /> LinkedIn
      </button>
    </div>
  );
};

export default ShareMenu;