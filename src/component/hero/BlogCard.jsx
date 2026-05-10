import React, { useEffect, useState, useRef } from "react";
import "./style/list-card.scss";
import { Heart, MessageCircle, SignalHigh } from "lucide-react";
import { DateTime } from "luxon";
import { FiShare2 } from "react-icons/fi";
import ShareMenu from "./ShareMenu";

export default function BlogCard({ blogList, loading }) {
  const skeleton = Array(6).fill(0); // Simpler way to create an array for mapping

  const [activeShareId, setActiveShareId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveShareId(null);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const toggleShare = (id) => {
    setActiveShareId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="list-main">
      <div className="list-content">
        {loading
          ? skeleton.map((_, index) => (
              <div key={index} className="main-card-content skeleton-card">
                <div className="card-img skeleton-img"></div>
                <div className="card-bg-blur">
                  <div className="skeleton-details">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line subtitle"></div>
                    <div className="skeleton-footer">
                      <div className="skeleton-pill"></div>
                      <div className="skeleton-pill"></div>
                    </div>
                  </div>
                  <hr />
                  <div className="card-feature">
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-icon"></div>
                  </div>
                </div>
              </div>
            ))
          : blogList?.map((item, index) => {
              const date = DateTime.fromISO(item?.createdAt);

              return (
                <div className="blog-card" key={item?._id || index}>
                  {/* Entire top section is clickable */}
                  <a
                    href={`/blog/${item?.blog_slug}`}
                    className="card-link-wrapper"
                  >
                    <div className="card-image-container">
                      <img
                        src={item?.featured_image}
                        alt={item?.blog_name}
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <span className="category-badge">{item?.blog_type} Article</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="meta-top">
                        <span className="date">
                          {date.toFormat("dd LLL yyyy")}
                        </span>
                        <span className="author">
                          by {item?.blog_author || "Hiren"}
                        </span>
                      </div>

                      <h3 className="title">{item?.blog_name}</h3>
                      <p className="description">
                        {item?.blog_desciption?.slice(0, 85) || "No description available"}...
                      </p>
                    </div>
                  </a>

                  <div className="card-footer">
                    <div className="stats-group">
                      <button className="stat-item like" aria-label="Like">
                        <Heart size={18} />
                        <span>{item.like || 0}</span>
                      </button>
                      <button
                        className="stat-item comment"
                        aria-label="Comment"
                      >
                        <MessageCircle size={18} />
                        <span>{item.comment || 0}</span>
                      </button>
                      <div className="stat-item views">
                        <SignalHigh size={18} />
                        <span>{item.imprestion || 200}</span>
                      </div>
                    </div>

                    <div
                      className="share-menu-wrapper"
                      ref={activeShareId === item._id ? menuRef : null}
                    >
                      <button
                        className={`share-btn ${activeShareId === item._id ? "active" : ""}`}
                        onClick={() => toggleShare(item._id)}
                      >
                        <FiShare2 size={18} />
                      </button>

                      {activeShareId === item._id && (
                        <ShareMenu
                          url={item.blog_slug}
                          title={item.blog_name}
                          onClose={() => setActiveShareId(null)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
