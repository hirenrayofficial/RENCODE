import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div>
       <Toaster position='top-center' richColors/>
      <title>
        RayUi || Tamplete A
      </title>
      <header>
        <Header/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
