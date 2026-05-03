import React from "react";
import BlogCard from "./BlogCard";
import "./style/feature.scss";

export default function FeaturePost({ blogList }) {
  return (
    <div className="feature-main">
      <div className="feature-content">
        <h1>Feature Post</h1>
        <div className="cards">
          <BlogCard blogList={blogList} />
        </div>
      </div>
    </div>
  );
}
