import React  from "react";
import "./style/footer.scss";
import { GalleryHorizontal, HomeIcon } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Efooter() {
  const [searchPrams] = useSearchParams();
  const token = searchPrams.get("token");
  const id = searchPrams.get("id");
  const location = useLocation()


  return (
    <div className="fheader-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="links">
          <div className="link-a">
            <a
              className={`${location.pathname === "/editor" ? "active": "noactive"}`}
              href={`/editor?token=${token}&id=${id}`}
            >
              <HomeIcon />
              Home
            </a>
          </div>
          <div className="link-a">
            <a className={`${location.pathname === "/editor/post" ? "active": "noactive"}`} href={`/editor/post?token=${token}&id=${id}`}>
              <GalleryHorizontal />
              Post's
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
