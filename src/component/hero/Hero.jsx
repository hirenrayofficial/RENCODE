import React, { useEffect, useRef, useState } from "react";
import "./style/hero.scss";

// Components
import HeroMain from "./HeroMain";
import BlogList from "./BlogList";
import Emailsupport from "./EmaiSupport";

// API
import { getBlog } from "../api/ApiProvider";

export default function Hero() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasrun = useRef(false);

  useEffect(() => {
    // If this is the second time Strict Mode is running this, STOP.
    if (hasrun.current) return;

    // Mark it as run immediately
    hasrun.current = true;

    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const result = await getBlog();
        if (result?.blogs) {
          setBlogs(result.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Critical: API Fetch Failed", err);
        setError("Failed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []); // Empty array ensures it only triggers on mount

  return (
    <div className="hero-container">
      <HeroMain />

      <BlogList blogList={blogs} loading={isLoading} error={error} />

      <Emailsupport />
    </div>
  );
}
