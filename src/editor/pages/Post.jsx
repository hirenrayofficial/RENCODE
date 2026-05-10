import React from "react";
import { useAuth } from "../../context/AuthContext";

// Mock data for demonstration
const MOCK_BLOGS = [
  {
    id: 1,
    title: "The Future of Swift",
    excerpt: "Exploring iOS 26 design patterns...",
    isAdminOnly: false,
  },
  {
    id: 2,
    title: "System Kernel Logs",
    excerpt: "Sensitive architectural data.",
    isAdminOnly: true,
  },
  {
    id: 3,
    title: "Neural Engine 5",
    excerpt: "How the new chips handle AI locally.",
    isAdminOnly: false,
  },
  {
    id: 4,
    title: "Admin: User Bans",
    excerpt: "Manage flagged accounts here.",
    isAdminOnly: true,
  },
];

export default function Post() {
  // In a real app, this would come from an Auth Context or API
  const { isAdmin } = useAuth();
  const editorBlog = MOCK_BLOGS;
  const adminBlog = ()=>{ return  MOCK_BLOGS.filter((blog) => !blog.isAdminOnly)}

  // Filter logic: If admin, show all. If not, filter out isAdminOnly posts.
  const displayedBlogs = isAdmin ? editorBlog : adminBlog;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Your Post</h1>
      </header>

      <div style={styles.grid}>
        {displayedBlogs.map((blog) => (
          <div key={blog.id} style={styles.card}>
            <span style={styles.category}>
              {blog.isAdminOnly ? "Internal" : "Public"}
            </span>
            <h2 style={styles.cardTitle}>{blog.title}</h2>
            <p style={styles.excerpt}>{blog.excerpt}</p>
            <div style={styles.blurButton}>Read More</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// iOS 26 Aesthetic Styles
const styles = {
  container: {
    padding: "40px 0px",
    // backgroundColor: '#F2F2F7', // Classic iOS Light Gray
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: "100%",
    maxWidth: "1300px",
    // display: "flex",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "#000",
  },
  toggleAdmin: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#E9E9EB",
    fontWeight: "600",
    cursor: "pointer",
  },
  toggleAdminActive: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#007AFF",
    color: "#FFF",
    fontWeight: "600",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
    border: "1px solid rgba(255,255,255,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  category: {
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#8E8E93",
    marginBottom: "8px",
    display: "block",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#1C1C1E",
  },
  excerpt: {
    fontSize: "15px",
    color: "#3A3A3C",
    lineHeight: "1.4",
    marginBottom: "20px",
  },
  blurButton: {
    backgroundColor: "#000",
    color: "#FFF",
    textAlign: "center",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "600",
    fontSize: "14px",
  },
};
