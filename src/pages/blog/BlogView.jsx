import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getBlog } from "../../component/api/ApiProvider";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import AuthorComponent from "./components/Author";
import TableOfContents from "./components/TableOfContents";
import ShareButtons from "./components/ShareButtons";
import RelatedPosts from "./components/RelatedPosts";
import CodeBlock from "./components/CodeBlock";
import "./blogview.scss";
import BlogSkeleton from "./BlogSkeleton";

export default function BlogView() {
  const { slug } = useParams();
  const location = useLocation();
  const [blogData, setBlogData] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const hasRun = useRef(false);

  // Estimate reading time based on word count
  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    let wordCount = 0;

    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (item.ops) {
          item.ops.forEach((op) => {
            if (typeof op.insert === "string") {
              wordCount += op.insert.split(/\s+/).length;
            }
          });
        }
      });
    }

    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 1 ? readTime : 1;
  };

  // Utility to escape HTML
  const escapeHtml = (text) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  // Render blog content with CodeBlock components for code
  const renderBlogContent = (content) => {
    if (!Array.isArray(content)) return null;

    return content.map((item, index) => {
      try {
        const elements = [];
        let currentLines = []; // Holds objects representing each line

        // --- STEP 1: Split ops into logical lines ---
        let tempLineOps = [];
        item.ops.forEach((op) => {
          tempLineOps.push(op);
          // If this op contains a newline, it's the end of a line
          if (typeof op.insert === "string" && op.insert.includes("\n")) {
            const isCode = !!op.attributes?.["code-block"];
            currentLines.push({ ops: tempLineOps, isCode });
            tempLineOps = [];
          }
        });
        // Catch any remaining ops that didn't end in a newline
        if (tempLineOps.length > 0) {
          currentLines.push({ ops: tempLineOps, isCode: false });
        }

        // --- STEP 2: Group consecutive lines of the same type ---
        let i = 0;
        while (i < currentLines.length) {
          let groupIsCode = currentLines[i].isCode;
          let groupOps = [...currentLines[i].ops];
          let j = i + 1;

          // Keep adding lines to this group if they are the same type (Code vs Text)
          while (
            j < currentLines.length &&
            currentLines[j].isCode === groupIsCode
          ) {
            groupOps = [...groupOps, ...currentLines[j].ops];
            j++;
          }

          // --- STEP 3: Render the group ---
          if (groupIsCode) {
            // Extract plain text from all ops in this code group
            const fullCode = groupOps
              .map((op) => (typeof op.insert === "string" ? op.insert : ""))
              .join("");

            elements.push(
              <CodeBlock
                key={`code-group-${index}-${i}`}
                code={fullCode.trim()} // trim removes extra leading/trailing newlines
                language="javascript"
              />,
            );
          } else {
            // Render as normal HTML text
            const converter = new QuillDeltaToHtmlConverter(groupOps, {});
            elements.push(
              <div
                key={`text-group-${index}-${i}`}
                dangerouslySetInnerHTML={{ __html: converter.convert() }}
              />,
            );
          }

          i = j; // Move to the next group
        }

        return (
          <div key={index} className="blog-content-row">
            {elements}
          </div>
        );
      } catch (error) {
        console.error("Error rendering content:", error);
        return null;
      }
    });
  };

  // Set page meta tags for SEO
  const setPageMeta = (blogInfo) => {
    document.title = `${blogInfo?.blog_name} | Blog`;

    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta(
      "description",
      blogInfo?.blog_description?.substring(0, 160) || "Read this article",
    );
    updateMeta("keywords", blogInfo?.category || "blog post");

    // Open Graph tags
    const updateOgMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateOgMeta("og:title", blogInfo?.blog_name || "Blog Article");
    updateOgMeta(
      "og:description",
      blogInfo?.blog_description?.substring(0, 160) || "Read this article",
    );
    updateOgMeta("og:image", blogInfo?.featured_image || "");
    updateOgMeta("og:url", window.location.href);
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleGet = async () => {
      try {
        setError(null);
        const res = await getBlog(slug);
        console.log("Blog API Response:", res); // Debug log
        if (res && res.getSlug) {
          console.log("Blog Data:", res.getSlug); // Debug log
          setBlogData(res.getSlug);
          setPageMeta(res.getSlug);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Error loading blog post. Please try again later.");
      }
    };

    handleGet();

    // Scroll progress handler
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [slug]);

  if (error) {
    return (
      <div className="blog-view-wrapper">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <a href="/blog" className="back-link">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return <BlogSkeleton />;
  }

  const content = blogData?.blog_content || [];
  const readTime = estimateReadTime(content);

  // Demo author data for testing
  const demoAuthor = {
    name: "Hiren Ray",
    avatar: "https://avatars.githubusercontent.com/u/166147435?v=4",
    bio: "Full-stack developer and tech writer. Passionate about building amazing web experiences.",
    email: "contact@hirenray.rest",
    website: "https://iam.hirenray.rest",
    github: "https://github.com/hirenrayofficial",
  };

  const author = blogData?.blog_author || demoAuthor;

  return (
    <div className="blog-view-wrapper">
      {/* Top Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <article className="blog-container">
        {/* Blog Header */}
        <header className="blog-header">
          <div className="blog-meta">
            <span className="category">{blogData?.category || "Article"}</span>
            <span className="dot">•</span>
            <span className="read-time">{readTime} min read</span>
            <span className="dot">•</span>
            <span className="publish-date">
              {new Date(blogData?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="blog-title">{blogData?.blog_name}</h1>

          {blogData?.featured_image && (
            <img
              src={blogData.featured_image}
              alt={blogData.blog_name}
              className="featured-image"
              loading="lazy"
            />
          )}
        </header>

        <div className="blog-layout">
          {/* Table of Contents - Sidebar */}
          <aside className="blog-sidebar">
            <TableOfContents contentRef={contentRef} />
          </aside>

          {/* Main Content */}
          <main className="blog-main">
            {/* Blog Content */}
            <section ref={contentRef} className="blog-content-body">
              {renderBlogContent(content)}
            </section>

            {/* Author Component */}
            {author && <AuthorComponent author={author} />}

            {/* Share Buttons */}
            <ShareButtons
              title={blogData?.blog_name}
              url={window.location.href}
            />

            {/* Blog Footer */}
            <footer className="blog-footer">
              <hr />
              <p>
                Thanks for reading! Feel free to share this article with others.
              </p>
            </footer>
          </main>
        </div>

        {/* Related Posts */}
        {/* <RelatedPosts
          category={blogData?.category}
          currentBlogId={blogData?._id}
          limit={3}
        /> */}
      </article>
    </div>
  );
}
