import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

export default function HoverAnimation({blogList}) {

  const [blogtype,setType] = useState([])


  const containerRef = useRef(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const isInview = useInView(containerRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // 1. Setup Motion Values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Add Spring physics (stiffness/damping) to make it "floaty"
  // stiffness: higher = faster snap, damping: higher = less bounce
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    // We set the raw coordinates, and useSpring handles the "smoothing"
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const coursesVariant = {
    // hidden: { opacity: 1, y: 40, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100
}

  const childVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95], // Custom cubic-bezier for a "premium" feel
      },
    },
  };





  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen  md:flex lg:flex flex-col items-center justify-center w-full overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
    >
      {/* 3. THE MOTION IMAGE CARD */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%", // Centered on cursor
          position: "fixed",
          pointerEvents: "none",
        }}
        animate={{
          scale: hoveredCourse ? 1 : 0,
          rotate: hoveredCourse ? 5 : 0, // Adds a cool rock-style tilt
          opacity: hoveredCourse ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`z-[999]  ${hoveredCourse ? "flex" : "hidden"}  w-80 h-[200px] overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-sm bg-black`}
      >
        {blogList.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredCourse === course.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full m"
          >
            <img
              src={course.blog_img}
              alt={course.blog_name}
              className="h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
            />
            {/* <div className="next-content relative w-full h-full p-6 flex flex-col justify-end ">
              <h3 className="text-orange-500 text-2xl font-bold  bottom-4 left-4">
                {course.blog_name}
              </h3>
              <div className="blog-desk">
                <span className="text-sm text-gray-300 font-medium  bottom-4 right-4">
                  {course.blog_desciption}
                </span>
              </div>
              <div className="guiter-features  text-sm text-gray-300 font-medium">
                {blogList.guiter_feature &&
                  blogList.guiter_feature.map((feature, index) => (
                    <p key={index} className="mb-1">
                      • {feature}
                    </p>
                  ))}
              </div>
            </div> */}
          </motion.div>
        ))}
      </motion.div>

      {/* 4. THE blogList LIST */}
      <div className="w-full  z-10 max-w-[1400px]">
        {/* Header Section */}
        {/* <div className="text-center mb-24">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-black mb-6 uppercase tracking-tighter italic"
          >
            Select Your <span className="text-orange-600">blogList</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-sm"
          >
            Level up your sound with pro coaching
          </motion.p>
        </div> */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-col border-b-1 border-gray-100"
        >
          {blogList.map((course) => (
            <motion.div
              key={course.id}
              variants={coursesVariant}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
              // Subtle slide-right effect on the row itself
              whileHover={{ x: 20 }}
              className="group relative flex items-center justify-between p-8 border-t-1 border-black hover:bg-orange-600 transition-colors duration-300 cursor-none"
            >
              <div className="flex items-center gap-8">
                <motion.span
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  className="text-md group-hover:scale-105 transition-transform duration-300 p-4 bg-black rounded-full text-white"
                >
                  <FiChevronRight style={{ rotate: "30deg" }} />
                </motion.span>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-black">
                  {course.blog_type}
                </h2>
              </div>
              <motion.div className="flex flex-col"
                initial= {{opacity:0}}
                animate={
                    {opacity:1}

                }
                transition={spring}
              >
                <p className="max-w-xs text-right font-bold text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {course.blog_type}
                </p>
                {/* <p className="max-w-xs text-right font-bold text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {course.blog_desciption}
                </p> */}
              </motion.div>
              <div className="flex">
                <p className="max-w-xs text-right font-bold text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {course.blog_author}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
