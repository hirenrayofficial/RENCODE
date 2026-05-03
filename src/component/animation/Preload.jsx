import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style/preload.scss";

const words = ["Designed", "by", "Hiren"];

// Container variants to orchestrate children
const containerVariants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // Time between each word
      delayChildren: 0.7,
    },
  },
  // exit: {
  //   y: "",
  //   transition: { ease: "easeInOut", duration: 0.8 },
  // },
};

// Individual word variants
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

export default function Preload() {
  return (
    <AnimatePresence>
      <motion.div
        className="load-container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="load-content">
          {words.map((word, index) => (
            <div key={index} className="word-wrapper">
              <motion.h3 variants={childVariants}>{word}</motion.h3>
            </div>
          ))}
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
