import React from "react";
import BlogCard from "./BlogCard";

export default function BlogList({blogList,loading}) {

  return (
    <div>
      <BlogCard blogList={blogList} loading={loading} />
    </div>
  );
}
