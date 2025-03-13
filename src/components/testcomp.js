import React, { useState } from "react";
import { motion } from "framer-motion";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Popup</button>

      {isVisible && (
        <motion.div
          initial={{ y: "10vh", opacity: 0 }}  // Start off-screen
          animate={{ y: 0, opacity: 1 }}        // Animate to visible
          exit={{ y: "100vh", opacity: 0 }}     // Exit downwards
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "cornflowerblue",
            color: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          Hello! I popped up! 🚀
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
