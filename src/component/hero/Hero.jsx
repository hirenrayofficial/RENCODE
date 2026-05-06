import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    let isMounted = true; // Prevents memory leaks

    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const result = await getBlog();

        if (isMounted) {
          // Check if result and result.blogs exist
          if (result?.blogs) {
            setBlogs(result.blogs);
          } else {
            setBlogs([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Critical: API Fetch Failed", err);
          setError("Failed to load content.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBlogData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return (
    <div className="hero-container">
      <HeroMain />
      

      <BlogList 
        blogList={blogs} 
        loading={isLoading} 
        error={error} 
      />

      <Emailsupport />
    </div>
  );
}