import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Rocket from '../../assets/rocket.png'; // Assuming you have this asset
import { FaLightbulb, FaHandsHelping, FaBook, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";
import AboutUsImage from '../../assets/aboutus.jpeg'

function AboutUs() {
  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  // Refs for detecting when elements are in view
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const section1InView = useInView(section1Ref, { once: false, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: false, amount: 0.3 });
  const section3InView = useInView(section3Ref, { once: false, amount: 0.3 });

  // Parallax effect for background
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="w-full overflow-hidden" id="about">
      {/* Floating particles background (Removed for clarity, you can add it back if needed) */}

      {/* About Us Section */}
      <motion.div
        ref={section1Ref}
        className="w-full flex min-h-screen justify-around items-center px-4 md:px-20 py-20 md:py-40 relative"
        style={{ opacity: 1 }}
        initial="hidden"
        animate={section1InView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          // Changed background: Subtle cool gradient (Teal to Cyan)
          className="absolute inset-0 z-0 bg-gradient-to-b from-teal-50 to-cyan-100 opacity-70"
          style={{ y: parallaxY1 }}
        />

        <motion.div
          className="flex flex-col justify-around items-start w-full md:w-1/2 z-10"
          variants={fadeInUp}
        >
          <motion.h2
            // Changed heading gradient: Cooler tones (Teal to Blue)
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
          >
            About Us
          </motion.h2>

          <motion.div
            className="text-lg md:text-xl ml-0 md:ml-2 mt-7 mr-0 md:mr-10 text-gray-700" // Adjusted text color for readability
            variants={fadeInUp}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              SkillLink is a peer-to-peer skill-sharing platform designed to
              help individuals Showcase, Learn, and Grow. We believe that
              knowledge is most impactful when shared, and traditional learning
              methods often limit access to real-world skills.
            </motion.p>
            <motion.p
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Unlike rigid educational systems, SkillLink promotes flexible,
              hands-on learning, allowing users to gain expertise directly from
              skilled individuals. Whether you're an expert looking to share
              your knowledge, a learner eager to develop new skills, or a
              creator showcasing your talents, SkillLink provides the perfect
              environment to connect, upskill, and grow together.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden md:block w-2/5 z-10"
          variants={fadeInUp}
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            className="rounded-2xl shadow-2xl"
            src={AboutUsImage}
            alt="Collaborative learning"
            animate={{
              boxShadow: ["0px 0px 0px rgba(0,0,0,0.2)", "0px 10px 30px rgba(0,0,0,0.3)", "0px 0px 0px rgba(0,0,0,0.2)"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        ref={section2Ref}
        className="w-full flex flex-col-reverse md:flex-row min-h-screen justify-around items-center px-4 md:px-20 py-20 md:py-40 relative overflow-hidden"
        initial="hidden"
        animate={section2InView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          // Changed background: Contrasting cool gradient (Sky to Indigo)
          className="absolute inset-0 z-0 bg-gradient-to-r from-sky-100 to-indigo-100"
          style={{ y: parallaxY2 }}
        />

        <motion.div
          className="hidden md:block w-2/5 z-10 mt-10 md:mt-0"
          variants={fadeInUp}
        >
          <motion.img
            className="rounded-2xl shadow-2xl"
            src="https://img.freepik.com/premium-vector/creative-team-concept-illustration_86047-282.jpg?ga=GA1.1.1425286223.1739288370&semt=ais_hybrid"
            alt="Creative team concept"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-around items-start w-full md:w-1/2 z-10"
          variants={fadeInUp}
        >
          <motion.h2
            // Changed heading gradient: Deep cool tones (Blue to Indigo)
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
          >
            Our Story
          </motion.h2>

          <motion.div
            className="text-lg md:text-xl ml-0 md:ml-2 mt-7 mr-0 md:mr-10 text-gray-800" // Adjusted text color for readability
          >
            <motion.p
              variants={fadeInUp}
            >
              The inspiration behind SkillLink came from a simple yet powerful
              realization: knowledge is most impactful when shared. We observed
              how traditional learning methods often limit individuals—relying
              solely on institutions, expensive courses, or outdated
              curriculums.
            </motion.p>
            <motion.p
              className="mt-4"
              variants={fadeInUp}
            >
              With this in mind, SkillLink was created as a platform that
              empowers individuals—regardless of their background—to teach,
              learn, and grow together. We believe in breaking down barriers to
              education, making learning accessible, practical, and engaging.
              Our journey started with a vision to democratize skill
              development, and today, we are building a thriving community where
              anyone can contribute, collaborate, and thrive.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Our Mission Section */}
      <motion.div
        ref={section3Ref}
        className="w-full flex flex-col md:flex-row min-h-screen justify-around items-center px-4 md:px-20 py-20 md:py-40 relative"
        initial="hidden"
        animate={section3InView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          // Changed background: Soft purple/indigo gradient
          className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-50 to-purple-100"
          style={{ y: parallaxY1 }}
        />

        <motion.div
          className="flex flex-col justify-around items-start w-full md:w-1/2 z-10"
          variants={fadeInUp}
        >
          <motion.h2
            // Changed heading gradient: Indigo/Purple tones
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
          >
            Our Mission
          </motion.h2>

          <motion.div
            className="text-lg md:text-xl ml-0 md:ml-2 mt-7 mr-0 md:mr-10 text-gray-700" // Adjusted text color
          >
            <motion.p variants={fadeInUp}>
              At SkillLink, our mission is to redefine the way people learn and
              share knowledge. We are committed to:
            </motion.p>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {[
                // Adjusted Icon Colors for consistency and contrast
                { icon: <FaLightbulb className="text-yellow-500 text-2xl" />, text: "Empowering individuals by providing them with a space to showcase their skills, gain recognition, and connect with like-minded learners." },
                { icon: <FaBook className="text-sky-600 text-2xl" />, text: "Facilitating lifelong learning through a peer-to-peer knowledge exchange, making education more dynamic, flexible, and accessible." }, // Was blue-500
                { icon: <FaHandsHelping className="text-emerald-600 text-2xl" />, text: "Creating a collaborative ecosystem where professionals, students, and enthusiasts can engage in interactive skill-building, moving beyond passive learning to hands-on experience." }, // Was green-500
                { icon: <FaRocket className="text-violet-600 text-2xl" />, text: "Promoting a growth mindset by encouraging individuals to step out of their comfort zones, explore new disciplines, and continuously evolve in their personal and professional journeys." } // Was purple-500
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 mt-4"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                >
                  {/* Ensure Icon color is applied correctly */}
                  <span className="flex-shrink-0 w-6 h-6">{item.icon}</span>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              // Kept Indigo for emphasis, fits the theme
              className="mt-6 font-medium text-indigo-700"
              variants={fadeInUp}
            >
              SkillLink is more than just a platform—it's a movement toward a
              future where learning is limitless, knowledge is freely shared,
              and everyone has the opportunity to grow.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 flex justify-center items-center z-10 mt-10 md:mt-0"
          variants={fadeInUp}
        >
          <motion.img
            className="w-3/4 md:w-full"
            src={Rocket}
            alt="Rocket illustration"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        // Changed CTA background: Deep contrasting cool gradient (Teal to Indigo)
        className="w-full flex flex-col items-center justify-center py-20 bg-gradient-to-r from-teal-700 to-indigo-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {/* Animated background elements */}
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white opacity-10" // Kept white particles, good contrast
            style={{
              width: Math.random() * 80 + 40, // Adjusted size range slightly
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.4, 1], // Adjusted scale animation
              opacity: [0.05, 0.2, 0.05], // Adjusted opacity animation
            }}
            transition={{
              duration: Math.random() * 6 + 6, // Adjusted duration range
              repeat: Infinity,
            }}
          />
        ))}

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-6 text-center px-4 z-10" // Kept white text
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Start Your Learning Journey?
        </motion.h2>

        <motion.p
          className="text-xl text-white opacity-90 max-w-2xl text-center mb-10 px-4 z-10" // Kept white text
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of learners and experts on SkillLink and transform the way you acquire and share knowledge.
        </motion.p>

        <Link to="/register"><motion.button
          // Changed button text color to match the CTA gradient theme
          className="bg-white text-indigo-700 font-bold py-4 px-8 rounded-full text-xl shadow-lg z-10" // Was text-purple-600
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(255,255,255,0.2)" }} // Adjusted hover shadow for light button on dark bg
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join SkillLink Today
        </motion.button></Link>
      </motion.div>
    </section>
  );
}

export default AboutUs;