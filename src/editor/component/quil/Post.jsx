import React, { useRef, useState } from "react";
import Editor from "./Editor";

import "./style/post.css";
import { saveBlog } from "../api/apiEditor";

const Post = () => {
  const [setRange] = useState();
  const [setLastChange] = useState();
  const [readOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [cetagorey, setCategory] = useState("");
  const getNmae = JSON.parse(localStorage.getItem("edit-u-nm"));

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
      blog_author: getNmae?.name,
      blog_name: title,
      blog_slug: slugify(title),
      blog_content: content,
      blog_type: cetagorey,
      id: getNmae?.id,
    };
    alert(JSON.stringify(storedata));
    const savedApi = await saveBlog(storedata);
    if (savedApi) {
      alert("Done");
    } else {
      console.log("connection error");
    }
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
        <button className="sv-bt" onClick={handlePublish}>
          Save Now
        </button>
      </main>
    </div>
  );
};

export default Post;
