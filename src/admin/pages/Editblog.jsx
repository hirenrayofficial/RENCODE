import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../component/QuilEditor/Editor";
import Quill from "quill";
import "../component/QuilEditor/style/post.css";
import { getBlogBySlug, updateBlog } from "../api/adminApi";

const Delta = Quill.import("delta");

const Editblog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const quillRef = useRef();

  const slugify = (title) => {
    return title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogBySlug(slug);
        
        if (res?.data?.getSlug) {
          const blogData = res.data.getSlug;
          // Pre-fill form
          setTitle(blogData.blog_name || "");
          setCategory(blogData.category || "");
          setAuthor(blogData.blog_author || "");
          setDescription(blogData.blog_description || "");
          setBlogId(blogData._id);

          // Set editor content via ref (content passed via defaultValue prop)
          if (quillRef.current && blogData.blog_content) {
            quillRef.current.setContents(blogData.blog_content);
          }

          setError(null);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Error loading blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!blogId) {
      alert("Blog ID not found");
      return;
    }

    const content = quillRef.current?.getContents();

    const updateData = {
      blog_name: title,
      blog_slug: slugify(title),
      blog_content: content,
      category: category,
      blog_author: author,
      blog_description: description,
      publish_date: new Date().toISOString(),
    };

    try {
      const result = await updateBlog(blogId, updateData);
      if (result) {
        alert("Blog updated successfully!");
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Error updating blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Loading blog...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>{error}</h2>
          <button onClick={() => navigate("/admin")}>Back to Admin</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">
            Ren<span>Code</span>
          </span>
          <div className="nav-actions">
            <button className="btn-primary" onClick={handleUpdate}>
              Update Blog
            </button>
            <button className="btn-primary" onClick={() => navigate("/admin")}>
              Cancel
            </button>
          </div>
        </div>
      </nav>

      <main className="editor-card">
        <input
          type="text"
          className="title-input"
          placeholder="Blog Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="title-input"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          className="title-input"
          placeholder="Author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          className="title-input"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </main>
    </div>
  );
};

export default Editblog;
