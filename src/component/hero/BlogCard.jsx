import React from "react";
import "./style/list-card.scss";
import { ArrowUpWideNarrowIcon, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";


export default function BlogCard({ blogList, loading }) {
  const redirect = useNavigate();
  const skeleton = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  const imageHandelLink = () => {
    alert("hii");
    // redirect('/login')
  };
  return (
    <div className="list-main">
      <div className="list-content">
        {loading
          ? skeleton.map((item, index) => (
              <div key={item.id} className="s-card-content">
                Skeletong
              </div>
            ))
          : blogList?.map((item, index) => {
              const date = DateTime.fromISO(item?.createdAt);

              return (
                <div className="main-card-content" key={item?._id || index}>
                  <div className="card-img">
                    <img src={item?.featured_image} alt={item?.blog_name} />
                  </div>
                  <div className="card-bg-blur">
                    <div className="main-blurbg"></div>
                    {/* <div className="main-blurbg-a"></div> */}
                    <a
                      href={`/blog/${item?.blog_slug}`}
                      className="card-details"
                    >
                      <div className="left">
                        <h3>{(item?.blog_name).slice(0, 36)}</h3>
                        <span>{item?.blog_desciption}</span>
                      </div>
                      <div className="right">
                        <span>{date.toFormat("dd LLL yyyy")}</span> <li><span>{item?.blog_aurthor || "Hiren"}</span></li>
                        
                      </div>
                    </a>
                    <hr />
                    <div className="card-feature">
                      <div className="impretion">
                        <ArrowUpWideNarrowIcon size={18}/>
                        <span>{item.imprestion}</span>
                      </div>
                      <div className="like">
                        <Heart size={18} />
                        <span>{item.like}</span>
                      </div>
                      <div className="comment">
                        <MessageCircle size={18} />
                        <span>{item.comment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
