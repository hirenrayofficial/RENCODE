import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { useDraw } from "../../context/DrawerContext";
import SignDraw from "./SignDraw";

export default function Layout() {
  const {opendraws} = useDraw()
  return (
    <div>
       <Toaster position='top-center' richColors/>
      <header>
        <Header/>
      </header>
      <main>
        {opendraws? <SignDraw/>: ""}
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
