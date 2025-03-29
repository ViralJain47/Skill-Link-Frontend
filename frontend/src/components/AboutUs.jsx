import React from "react";

function AboutUs() {
  return (
    <section className="w-full " id="about">
      <div className="w-full flex justify-between items-center px-10 py-5 bg-primary">
        <div className="flex flex-col justify-around items-start">
          <h2>About us</h2>
          <p>
            SkillLink is a peer-to-peer skill-sharing platform designed to help
            individuals Showcase, Learn, and Grow. Whether you're an expert
            looking to share knowledge, a learner eager to gain new skills, or a
            creator wanting to display your expertise, SkillLink provides the
            perfect space to connect, collaborate, and elevate your abilities.
          </p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-10 py-5 bg-fuchsia-300">
        <div className="flex flex-col justify-around items-start">
          <h2>Our Story</h2>
          <p>
            We believe that learning thrives in a collaborative environment.
            SkillLink was born from the idea that everyone has something
            valuable to teach and learn. Traditional education often falls short
            in providing real-world skills, and that's where we step in—creating
            a community-driven ecosystem where knowledge flows freely,
            unrestricted by formal institutions.
          </p>
        </div>
        <div>
          <img src="https://unsplash.com/photos/two-person-standing-on-gray-tile-paving-TamMbr4okv4" alt="" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-around items-start">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: Empower individuals to Showcase their
            talents, Learn from others, and Grow beyond limits. We aim to bridge
            the skill gap by making learning accessible, interactive, and
            engaging. With a focus on practical knowledge and real-world
            applications, SkillLink transforms education into a shared
            experience, not just a process.
          </p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
