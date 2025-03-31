import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserGraduate, FaHandshake, FaUserFriends, FaAward, FaComments, 
         FaStar, FaBook, FaCalendarAlt, FaExchangeAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Simplified animated gradient background with warmer tones
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute -inset-[100px] opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 1
          }}
        />
      </div>
    </div>
  );
};

// Simplified feature card with controlled animations
const FeatureCard = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.6,
        delay: index * 0.1,
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      y: -10
    },
    visible: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        delay: index * 0.1 + 0.2
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="relative bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center h-full"
      whileHover={{
        y: -5,
        boxShadow: "0 15px 30px -10px rgba(234, 88, 12, 0.2)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
    >
      {/* Simple border with warm tone */}
      <div className="absolute inset-0 border-2 border-amber-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon with simpler animation */}
      <div className="mb-6">
        <motion.div 
          className="text-4xl text-amber-600 p-3 bg-amber-50 rounded-full"
          variants={iconVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Text content */}
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const featuresRef = useRef(null);
  const [mainRef, mainInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [featuresTitleRef, featuresTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuresData = [
    {
      icon: <FaUserGraduate />,
      title: "Personalized Learning Pathways",
      description: "Tailored suggestions for skill development based on user profiles, previous exchanges, and trending skills within the community."
    },
    {
      icon: <FaHandshake />,
      title: "Smart Skill Matchmaking",
      description: "An intelligent algorithm that matches users based on complementary skills, preferences, and availability, ensuring optimal learning partnerships."
    },
    {
      icon: <FaUserFriends />,
      title: "Unified Learning & Teaching Profiles",
      description: "Flexible profiles where users can list skills they offer to teach and those they wish to learn, promoting dual roles as both teacher and learner."
    },
    {
      icon: <FaAward />,
      title: "Gamified Learning Experience",
      description: "Users earn badges, points, and achievements for completing exchanges and participating in community events, enhancing engagement and motivation."
    },
    {
      icon: <FaComments />,
      title: "Real-Time Collaboration Tools",
      description: "Integrated in-app messaging and file-sharing to enable smooth communication and real-time learning sessions."
    },
    {
      icon: <FaStar />,
      title: "Trust through Reviews & Ratings",
      description: "A transparent review and rating system to help users build credibility and trust within the platform, encouraging quality interactions."
    },
    {
      icon: <FaBook />,
      title: "Curated Learning Resources & Blog",
      description: "Access an ever-growing library of articles, tutorials, and blogs contributed by the community, with insights from experts in various fields."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Skill Sharing Events & Workshops",
      description: "Host and join virtual or in-person workshops, webinars, and events that bring the community together to share knowledge in an interactive environment."
    },
    {
      icon: <FaExchangeAlt />,
      title: "Peer-to-Peer Learning",
      description: "Direct exchange of knowledge and skills between individuals without formal educators or institutions."
    },
    {
      icon: <FaUsers />,
      title: "Community-Driven Platform",
      description: "A platform where learning is decentralized and powered by the users themselves."
    }
  ];

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.3,
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px -5px rgba(234, 88, 12, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const scrollDownVariants = {
    hidden: { 
      opacity: 0, 
    },
    visible: {
      opacity: [0.4, 1, 0.4],
      y: [0, 8, 0],
      transition: {
        duration: 2,
        delay: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  const featuresTitleVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const underlineVariants = {
    hidden: { 
      width: "0%"
    },
    visible: {
      width: "120px",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      }
    }
  };

  const ctaButtonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#fff",
      color: "#F97316",
      boxShadow: "0 15px 25px -5px rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section id='features' className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Warm-toned animated background */}
      <AnimatedGradient />
      
      {/* Hero Section with Simplified Animation */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={mainInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-amber-700 mb-6 relative"
          >
            Unlock Your Potential with{" "}
            <span className="relative inline-block">
              <span className="text-orange-500">SkillLink</span>
              <motion.span 
                className="absolute -bottom-2 left-0 h-3 bg-amber-200 w-full -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-10"
          >
            A peer-to-peer platform revolutionizing how communities share knowledge and skills
          </motion.p>
          
          <motion.button 
            onClick={scrollToFeatures}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg"
          >
            Explore Features
          </motion.button>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scrollDownVariants}
          className="absolute bottom-10 cursor-pointer"
          onClick={scrollToFeatures}
        >
          <div className="text-orange-500 text-4xl">
            ↓
          </div>
        </motion.div>
      </section>

      {/* Features Grid with Simplified Animation */}
      <section ref={featuresRef} className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={featuresTitleRef}
            initial="hidden"
            animate={featuresTitleInView ? "visible" : "hidden"}
            variants={featuresTitleVariants}
            className="text-center mb-16 relative"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
            >
              Powerful Features
            </motion.h2>
            
            <motion.div 
              variants={underlineVariants}
              className="h-1.5 bg-orange-400 mx-auto mb-6"
            />
            
            <motion.p 
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              SkillLink offers a comprehensive suite of tools designed to make skill sharing and learning a seamless, engaging experience.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Simplified Call to Action with Warm Colors */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={ctaVariants}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-center relative overflow-hidden"
      >
        {/* Simplified background elements */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full opacity-20 -z-10"
          animate={{ 
            x: [30, 0, 30],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: 'mirror'
          }}
          style={{ filter: 'blur(80px)' }}
        />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Join the SkillLink Community?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 opacity-90"
          >
            Connect with like-minded individuals, share your expertise, and learn new skills today.
          </motion.p>
          
          <Link to="/register" ><motion.button 
            variants={ctaButtonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-10 py-4 bg-white text-orange-500 font-bold rounded-full shadow-lg text-lg"
          >
            Get Started
          </motion.button></Link>
        </div>
      </motion.section>
    </section>
  );
};

export default Features;