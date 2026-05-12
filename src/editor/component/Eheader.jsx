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
  const lsdtails = JSON.parse(localStorage.getItem("edit-u-nm"))
  return (
    <div className="header-container">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="left">
          <div className="brand">
            <h4>EditorDashboard</h4>
          </div>
        </div>
        <div className="center">
          Welcome'Back {lsdtails?.name}
        </div>
        <div className="right">
          <div className="avtar-menu" >
            <span>{(lsdtails?.name).slice(0,1)}</span>
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
