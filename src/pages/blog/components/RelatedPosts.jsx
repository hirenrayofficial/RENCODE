import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlog } from "../../../component/api/ApiProvider";
import "../style/relatedposts.scss";

export default function RelatedPosts({ category, currentBlogId, limit = 3 }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const res = await getBlog();
        if (res && res.getallblog) {
          // Filter blogs by category and exclude current blog
          const filtered = res.getallblog
            .filter(
              (blog) =>
                blog.category === category && blog._id !== currentBlogId
            )
            .slice(0, limit);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [category, currentBlogId, limit]);

  if (loading) {
    return (
      <div className="related-posts">
        <div className="skeleton-loader">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts">
      <h2>Related Articles</h2>
      <div className="posts-grid">
        {relatedPosts.map((post) => (
          <article key={post._id} className="related-post-card">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.blog_name}
                className="post-image"
              />
            )}
            <div className="post-content">
              <span className="post-category">{post.category}</span>
              <h3 className="post-title">{post.blog_name}</h3>
              <p className="post-excerpt">
                {post.blog_description?.substring(0, 100)}...
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="read-more"
                aria-label={`Read article: ${post.blog_name}`}
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
