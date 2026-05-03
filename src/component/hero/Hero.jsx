import React, { useEffect, useRef, useState } from "react";
import "./style/hero.scss";
import HoverAnimation from "./HoverAnimation";
import HeroMain from "./HeroMain";
import BlogList from "./BlogList";
import FeaturePost from "./FeaturePost";
import Emailsupport from "./EmaiSupport";
import { BlogListdata } from "../data/blogdata";
import axios from "axios";
import { getBlog } from "../api/ApiProvider";
export default function Hero() {
  const hasRun = useRef(false);

  const [dataa, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchData = async () => {
      try {
        const result = await getBlog();

        if (!result) {
          console.error("Server error: No data received");
          setLoading(true);
          return;
        }
        if (result.blogs[0]) {
          setLoading(false);
        } else {
          setLoading(true);
        }

        setData(result.blogs);
      } catch (err) {
        console.error("Fetch failed", err);
        setLoading(true);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="hero-container">
      <HeroMain />
      <BlogList blogList={dataa} loading={loading} />
      {/* <HoverAnimation blogList={dataa[0]} />
      <FeaturePost blogList={dataa[0]} /> */}
      <Emailsupport />
    </div>
  );
}
