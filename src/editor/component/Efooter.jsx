import React from "react";
import "./style/footer.scss";
import { GalleryHorizontal, HomeIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Efooter() {
  const [searchPrams] = useSearchParams();
  const token = searchPrams.get("token");
  const id = searchPrams.get("id");

  // alert(isAdmin)

  return (
    <div className="fheader-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="links">
          <div className="link-a">
            <a href={`/editor?token=${token}&id=${id}`}>
              <HomeIcon />
            </a>
          </div>
          <div className="link-a">
            <a href={`/editor/post?token=${token}&id=${id}`}>
              <GalleryHorizontal />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
