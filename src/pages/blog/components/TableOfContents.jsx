import React, { useEffect, useState } from "react";
import "../style/tableofcontents.scss";

export default function TableOfContents({ contentRef }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!contentRef?.current) return;

    // Extract headings from content
    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
    const headingArray = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName[1]),
      };
    });

    setHeadings(headingArray);

    // Setup intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [contentRef]);

  if (headings.length === 0) return null;

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="table-of-contents">
      <p className="toc-title">On this page</p>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item level-${heading.level}`}>
            <button
              onClick={() => handleClick(heading.id)}
              className={`toc-link ${activeId === heading.id ? "active" : ""}`}
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
