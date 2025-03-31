import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaHandsHelping, FaBook, FaRocket } from "react-icons/fa";

const MainLoader = ({ isLoading }) => {
  // Icons array matching your mission section
  const icons = [
    { Icon: FaLightbulb, color: "text-yellow-500", delay: 0 },
    { Icon: FaBook, color: "text-blue-500", delay: 0.2 },
    { Icon: FaHandsHelping, color: "text-green-500", delay: 0.4 },
    { Icon: FaRocket, color: "text-purple-500", delay: 0.6 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // If not loading, don't render anything
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Floating particles background (similar to AboutUs) */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main loader content */}
      <motion.div
        className="flex flex-col items-center justify-center z-10"
        variants={containerVariants}
      >
        {/* Logo animation */}
        <motion.div
          className="mb-8 relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-200 text-transparent bg-clip-text"
          >
            SkillLink
          </motion.h1>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Icons animation */}
        <motion.div 
          className="flex space-x-4 md:space-x-8"
          variants={containerVariants}
        >
          {icons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              className={`${color} text-3xl md:text-4xl`}
              variants={itemVariants}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                delay: delay,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Icon />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p 
          className="text-white text-lg md:text-xl mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Connecting talents...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default MainLoader;