import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import "../style/codeblock.scss";

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        {/* macOS Traffic Light Buttons */}
        <div className="traffic-lights">
          <div className="light close-btn"></div>
          <div className="light minimize-btn"></div>
          <div className="light maximize-btn"></div>
        </div>

        <span className="language">{language}</span>

        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          title="Copy code"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <FiCheck size={18} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={18} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
}
