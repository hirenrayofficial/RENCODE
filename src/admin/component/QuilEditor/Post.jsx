import React, { useRef, useState } from "react";
import Editor from "./Editor";
import Quill from "quill";
import "./style/post.css";

// import MobileTogel from "../Mobile/MobileTogel";
import { getBlog, saveBlog } from "../../api/adminApi";

const Delta = Quill.import("delta");

const Post = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [cetagorey, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  // const [slug, setSlug] = useState("");
  const quillRef = useRef();

  const slugify = (title) => {
    return title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -
  };

  const handlePublish = async () => {
    const content = quillRef.current?.getContents();

    const storedata = {
      blog_name: title,
      blog_slug: slugify(title),
      blog_content: content,
      blog_type: cetagorey,
      blog_author: author,
      publish_date: new Date().toISOString(),
    };
    const savedApi = await saveBlog(storedata);
    if (savedApi) {
      alert("Done");
    } else {
      console.log("connection error");
    }
  };
  const getTemp = async () => {
    const call = await getBlog();
    alert(call);
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">
            Ren<span>Code</span>
          </span>
          <div className="nav-actions">
            {/* <label className="toggle-read">
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
              />
              <span>Read Only</span>
            </label> */}
            <button className="btn-primary" onClick={handlePublish}>
              Publish
            </button>
            <button className="btn-primary" onClick={getTemp}>
              get
            </button>
          </div>
        </div>
      </nav>

      <main className="editor-card">
        <input
          type="text"
          className="title-input"
          placeholder="New Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          // defaultValue={new Delta().insert("Start writing your story...\n")}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </main>
    </div>
  );
};

export default Post;
