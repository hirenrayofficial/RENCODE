import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";
import { redirect } from "react-router-dom";
import "./style/transation.scss";
import { useMemo } from "react";

export default function PageTransition({ children }) {
  const pathname = redirect();
  const pixel = 512;
  const duration = useMemo(() => {
    return Array.from({ length: pixel }, () =>
      (Math.random() * 2 + 0.5).toFixed(2),
    );
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        <motion.div
          className="fixed"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ y: 0 }}
          transition={{
            duration: 10,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* <motion.div
            style={{ width: "200px", background: "black" }}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            exit={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
          /> */}
          {duration.map((duration, index) => (
            <motion.div
              className="div"
              key={index}
              style={{ width: "50px", height: "50px", background: "black" }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: 1,
                y: "-1000px",
              }}
              exit={{ y: 0 }}
              transition={{
                duration: Number(duration),
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: "50%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            duration: 1.7,
            ease: "easeOut",
          }}
        >
          
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
