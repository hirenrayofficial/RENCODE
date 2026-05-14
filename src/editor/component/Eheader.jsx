import React, { useState } from "react";
import "./style/header.scss";
import { logOut } from "./api/apiEditor";
import { LogOutIcon, Settings } from "lucide-react";
import { toast } from "sonner";
import { CgProfile } from "react-icons/cg";

export default function Eheader() {
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    toast("Can you logout Click", {
      action: {
        label: "Ok",
        onClick: () => {
          handelLogout();
        },
      },
      cancel: {
        label: "cancel",
      },
    });
  };
  const menuOpen = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handelLogout = async () => {
    const res = await logOut();
    toast.success("logout success");
    if (res) {
      return window.location.replace("/");
    } else {
      return window.location.replace("/");
    }
  };
  const lsdtails = JSON.parse(localStorage.getItem("edit-u-nm"));
  return (
    <div className="header-containera">
      <div className="absulute-bg"></div>
      <div className="header-content">
        <div className="left">
          <div className="brand">
            <h4>EditorDashboard</h4>
          </div>
        </div>
        <div className="center">Welcome'Back {lsdtails?.name}</div>
        <div className="right" onClick={(e) => menuOpen()}>
          <div className="avtar-menu">
            <span>{(lsdtails?.name).slice(0, 1)}</span>
          </div>
          <span style={{ color: "black" }}>{lsdtails?.name}</span>
        </div>
        {open && (
          <>
            <div className="open-cont">
              <div className="log-menu" onClick={handelOpen}>
                <LogOutIcon size={12} />
              </div>
              <div className="log-menua" onClick={handelOpen}>
                <CgProfile size={16} />
              </div>
              <div className="log-menua" onClick={handelOpen}>
                <Settings size={16} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
