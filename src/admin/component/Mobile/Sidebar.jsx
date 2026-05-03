import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  ChevronUp,
  ShieldCheck,
  Eye,
  Check,
  Moon,
  Sun,
  Globe,
  IdCard,
} from "lucide-react";
import "./side.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
//   const {isAdmin, toggleRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
//   const { isDark, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile sidebar toggle

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);
  const menuItems = [
    { name: "Dashboard", slug: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "post",
      slug: "/admin/post",
      icon: <ArrowLeftRight size={20} />,
    },
    // { name: "Insights", slug: "/admin/post/edit/:slug", icon: <BarChart3 size={20} /> },
  ];

  return (
    <>
      {/* MOBILE TOP BAR (Only visible on small screens) */}

      {/* MOBILE BOTTOM NAV (Optional: Quick access bar) */}
      <div className="mobile-bottom-nav">
        {menuItems.map((item) => (
          <button
            key={item.slug}
            className={`nav-item ${location.pathname === item.slug ? "active" : ""}`}
            onClick={() => navigate(item.slug)}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </>
  );
}
