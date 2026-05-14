import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  aprovedBlog,
  deleteBlog,
  getuserByBlog,
} from "../component/api/apiEditor";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function Post() {
  const { isAdmin } = useAuth();
  const [blogdata, setBlogdata] = useState([]);
  const lsdetails = JSON.parse(localStorage.getItem("edit-u-nm"));
  const id = lsdetails.id;

  // 1. Memoize the fetch function to satisfy useEffect dependencies
  const fetchBlogs = useCallback(async () => {
    try {
      // Get ID inside the callback or from state to ensure it's fresh
      const lsdetails = JSON.parse(localStorage.getItem("edit-u-nm"));
      const id = lsdetails?.id;

      if (!id) return;

      // Both admin and editor logic likely need to await the API call
      const res = await getuserByBlog(id);

      if (res?.data?.blog) {
        setBlogdata(res.data.blog);

      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, []); // Add [isAdmin] here if the API logic changes based on role

  const hasrun = useRef(false);
  // 2. The useEffect now has a stable reference to fetchBlogs
  useEffect(() => {
    if (hasrun.current) return;
    hasrun.current = true;
    toast.promise(fetchBlogs(),{
      loading: "load content",
      success: (data)=>{
        return "load succes"
      },
      error: (err)=>{
        return "data not loading"
      }
    });
  }, [fetchBlogs]);

  const handelApproved = async ({ blogid, type }) => {
    toast.promise(aprovedBlog(id, blogid, type), {
      loading: "Under Proccess",
      success: (data) => {
        return "aproved Success";
      },
      error: (err) => {
        return "Unsucces to aproved";
      },
    });
  };
  const handelConfrom = (blogid) => {
    toast("Can you conform to delete blog", {
      action: {
        label: "Ok",
        onClick: () => {
          handelDelete(blogid);
        },
      },
      cancel: {
        label: "cancel",
        onClick: () => {
          return;
        },
      },
    });
  };
  const handelDelete = async (blogid) => {
    toast.promise(deleteBlog(id, blogid), {
      loading: "Under Proccess",
      success: (data) => {
        return "Delete Success";
      },
      error: (err) => {
        return "Unsucces to Delete";
      },
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Your Posts</h1>
      </header>

      <div style={styles.grid}>
        { blogdata?.map((blog, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)";
            }}
          >
            <span style={styles.category}>
              {blog.is_aproved ? "Public" : "Private"}
            </span>

            <h2 style={styles.cardTitle}>{blog.blog_name}</h2>
            <p style={styles.excerpt}>By {blog.blog_author}</p>

            <div style={styles.statusText}>
              <span style={styles.statusDot(blog.is_aproved)} />
              <span style={{ color: blog.is_aproved ? "#34C759" : "#FF3B30" }}>
                {blog.is_aproved ? "Approved" : "Pending Review"}
              </span>
            </div>

            {isAdmin ? (
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={
                    blog.is_aproved ? styles.blurButtonr : styles.bluraButton
                  }
                  onClick={(e) =>
                    handelApproved({
                      blogid: blog._id,
                      type: blog.is_aproved === true ? "public" : "unpublic",
                    })
                  }
                >
                  {blog.is_aproved === true ? "Unapproved" : "Approved"}
                </button>
                <div
                  style={styles.bluraButton}
                  onClick={(e) => handelConfrom(blog._id)}
                >
                  <Trash size={16} />
                </div>
              </div>
            ) : (
              <div style={styles.blurButton}>Read More</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// iOS 26 Aesthetic Styles
const styles = {
  container: {
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto ",
    marginTop: "80px",
    // backgroundColor: "#f9f9fb", // Subtle background to make cards pop
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    borderBottom: "1px solid #eee",
    paddingBottom: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    letterSpacing: "-1px",
    color: "#1d1d1f",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    border: "1px solid rgba(255,255,255,0.6)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  },
  category: {
    fontSize: "11px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#007AFF", // iOS Blue
    marginBottom: "12px",
    padding: "4px 10px",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: "8px",
    alignSelf: "flex-start",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#1c1c1e",
    lineHeight: "1.2",
  },
  excerpt: {
    fontSize: "15px",
    color: "#636366",
    lineHeight: "1.5",
    marginBottom: "16px",
    fontWeight: "500",
  },
  statusText: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusDot: (approved) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: approved ? "#34C759" : "#FF3B30",
    display: "inline-block",
  }),
  blurButton: {
    backgroundColor: "#1c1c1e",
    color: "#FFF",
    textAlign: "center",
    padding: "14px",
    borderRadius: "16px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "auto", // Pushes button to bottom
  },
  bluraButton: {
    backgroundColor: "#34C759", // Apple Green
    color: "#FFF",
    textAlign: "center",
    padding: "14px",
    borderRadius: "16px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "auto",
    border: "none",
  },
  blurButtonr: {
    backgroundColor: "#c73440", // Apple Green
    color: "#FFF",
    textAlign: "center",
    padding: "14px",
    borderRadius: "16px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "auto",
    border: "none",
  },
};
