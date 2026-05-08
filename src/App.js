import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout/Layout";
import "@fontsource/audiowide";
import "@fontsource-variable/comfortaa";
import "@fontsource/bangers";
import "@fontsource-variable/orbitron";
// import { AnimatePresence } from "framer-motion";
// import PageTransition from "./component/animation/Transation";
// import Preload from "./component/animation/Preload";
import Hero from "./component/hero/Hero";
import BlogView from "./pages/blog/BlogView";
import Adminlayout from "./admin/component/layout/Adminlayout";
import Published from "./admin/pages/Published";
import ProtectedAdmin from "./protectedRoute/ProtectedAdmin";
import PostView from "./admin/pages/PostView";
import Editblog from "./admin/pages/Editblog";

const HomeLayout = () => <Layout />;
const AdminLay = () => <Adminlayout />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "blog/:slug", element: <BlogView /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminLay />
      </ProtectedAdmin>
    ),
    children: [
      { index: true, element: <Published /> },
      { path: "post", element: <PostView /> },
      {path: "post/edit/:slug", element: <Editblog />},
    ],
  },
]);

export default function App() {
  // const [loading, setLoading] = useState(true);
  // const hasRun = useRef(false); // Track execution

  // useEffect(() => {
  //   // If it has already run, do nothing
  //   if (hasRun.current) return;

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     hasRun.current = true; // Mark as done
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [hasRun]);
  return (
    // <AnimatePresence mode="wait">
    //   {loading ? (
    //     <Preload />
    //   ) : (
    //     <PageTransition>
    //       <RouterProvider router={router} />
    //     </PageTransition>
    //   )}
    // </AnimatePresence>
    <RouterProvider router={router} />
  );
}
