import React  from "react";
import "./style/header.scss";
import { logOut } from "./api/apiEditor";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

export default function Eheader() {
  // const [open, setOpen] = useState(false);
  const handelOpen = () => {
    toast("Can you logout Click",{
      action:{
        label: "Ok",
        onClick: ()=> {
          handelLogout()
        }
      }
    })
  };
  const handelLogout = async () => {
    const res = await logOut();
    toast.success("logout success")
    if (res) {
      
      return window.location.replace("/");
    } else {
      return window.location.replace("/");
    }
  };
  return (
    <div className="header-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="left">
          <div className="brand">
            <h4>EditorDashboard</h4>
          </div>
        </div>
        {/* <div className="center">
          <div className="link-a">
            <a href="/">Protfollio</a>
          </div>
          <div className="link-a">
            <a href="/">About Me</a>
          </div>
        </div> */}
        <div className="right">
          <div className="avtar-menu" onClick={handelOpen}>
            <span>R</span>
          </div>
          <div className="log-menu" onClick={handelOpen}>
            <LogOutIcon size={10}/>
          </div>
        </div>
        {/* {open && (
          <>
            <div className="open-cont">
              <div className="bottom">
                <div className="links">
                  <a href="/">Feedback</a>
                </div>
                <div className="links">
                  <a href="/">Contact Us</a>
                </div>
                <div>
                  <button onClick={(e) => handelLogout()} className="bt">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}
