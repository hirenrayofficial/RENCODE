import React, { useEffect, useState, useRef } from "react";
import "./style/postview.scss";
import { deleteBlog, getBlog } from "../api/adminApi";
import { BiEdit } from "react-icons/bi";
// import { FaDeleteLeft } from "react-icons/fa6";
import {  DeleteIcon } from "lucide-react";
import { DateTime } from "luxon";

export default function PostView() {
  const hasRun = useRef(false);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchData = async () => {
      try {
        const result = await getBlog();
        if (result) setBlogData(result.blogs);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchData();
  }, []);
  const handelDelete = async(id)=>{
    const res = deleteBlog(id)
    if(!res){
      alert("delete unsuccesfull")
    }
    alert("delete succesfull")
  }

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">
            {" "}
            Ren<span>Code</span>{" "}
          </span>
        </div>
      </nav>

      <main className="post-list-container">
        {blogData?.map((item, index) => (
          <div className="blog-card" key={index}>
            <div className="card-image">
              <img src={item.featured_image} alt={item.blog_name} />
            </div>

            <div className="card-details">
              <div className="text-content">
                {/* The title attribute shows the full text on hover */}
                <h3 title={item.blog_name}>{item.blog_name}</h3>
                <p>{DateTime.fromISO(item.publish_date).toFormat("dd LLL yyyy")}</p>
              </div>

              <div className="actions">
                <a
                  href={`/admin/post/edit/${item?.blog_slug}`}
                  className="edit-button"
                >
                  <BiEdit size={18} />
                </a>
                <a
                  href={`/admin/post/edit/${item?.blog_slug}`}
                  className="edit-button"
                  onClick={(e)=>handelDelete(item?._id)}
                >
                  <DeleteIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
