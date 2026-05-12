import React, { useRef, useState } from "react";
import Editor from "./Editor";

import "./style/post.css";
import { saveBlog } from "../api/apiEditor";
import { toast } from "sonner";

const Post = () => {
  const [setRange] = useState();
  const [setLastChange] = useState();
  const [readOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [cetagorey, setCategory] = useState("");
  const getNmae = JSON.parse(localStorage.getItem("edit-u-nm"));

  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    // 1. Validate data before starting (optional but recommended)
    if (!title || !cetagorey) {
      return toast.error("Please fill in all fields");
    }

    setIsLoggedIn(false); // Disable button
    const content = quillRef.current?.getContents();

    const storedata = {
      blog_author: getNmae?.name,
      blog_name: title,
      blog_slug: slugify(title),
      blog_content: content,
      blog_type: cetagorey,
      id: getNmae?.id,
    };

    // 2. Use toast.promise to handle the loading state automatically
    toast.promise(saveBlog(storedata), {
      loading: "Publishing your blog...",
      success: (data) => {
        setIsLoggedIn(true); // Re-enable button
        return "Blog published successfully!";
      },
      error: (err) => {
        setIsLoggedIn(true); // Re-enable button so they can try again
        console.error("Connection error:", err);
        return "Failed to publish. Please check your connection.";
      },
    });
  };

  return (
    <div className="page-wrapper">
      <main className="editor-card">
        <input
          type="text"
          className="title-input"
          placeholder="New Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name=""
          id=""
          className="cetagorey-input"
          value={cetagorey}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Cetagorey</option>
          <option value="tech">Tech</option>
          <option value="health">Health</option>
          <option value="poletic">Poletics</option>
          <option value="geo">Geography</option>
        </select>

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          // defaultValue={new Delta().insert("Start writing your story...\n")}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <button
          className="sv-bt"
          onClick={handlePublish}
          disabled={!isLoggedIn} // Button is disabled if NOT logged in
          style={{
            opacity: isLoggedIn ? 1 : 0.5,
            cursor: isLoggedIn ? "pointer" : "not-allowed",
          }}
        >
          Save Now
        </button>
      </main>
    </div>
  );
};

export default Post;
