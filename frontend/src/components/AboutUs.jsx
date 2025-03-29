import React from "react";
import Rocket from '../assets/rocket.png'

function AboutUs() {
  return (
    <section className="w-full grid grid-rows-3" id="about">
      <div className="w-full flex min-h-screen justify-around items-center px-20 py-40">
        <div className="flex flex-col justify-around items-start w-1/2">
          <h2 className="text-6xl ">About Us</h2>
          <div className="text-xl ml-2 mt-7 mr-10">
            <p>
              SkillLink is a peer-to-peer skill-sharing platform designed to
              help individuals Showcase, Learn, and Grow. We believe that
              knowledge is most impactful when shared, and traditional learning
              methods often limit access to real-world skills. SkillLink bridges
              this gap by creating a community-driven space where anyone can
              teach, learn, and collaborate across diverse fields.
            </p>
            <p className="mt-4">
              Unlike rigid educational systems, SkillLink promotes flexible,
              hands-on learning, allowing users to gain expertise directly from
              skilled individuals. Whether you're an expert looking to share
              your knowledge, a learner eager to develop new skills, or a
              creator showcasing your talents, SkillLink provides the perfect
              environment to connect, upskill, and grow together.
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="rounded-2xl min-h-full w-full"
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D"
            alt="This is an image"
          />
        </div>
      </div>
      <div className="w-full flex min-h-screen justify-around items-center px-20 py-40 bg-orange-200">
        <div className="flex flex-col justify-around items-start w-1/2">
          <h2 className="text-6xl ">Our Story</h2>
          <div className="text-xl ml-2 mt-7 mr-10">
            <p>
              The inspiration behind SkillLink came from a simple yet powerful
              realization: knowledge is most impactful when shared. We observed
              how traditional learning methods often limit individuals—relying
              solely on institutions, expensive courses, or outdated
              curriculums. Meanwhile, there exists a vast pool of untapped
              knowledge within communities, where individuals possess expertise
              in various domains but lack the means to share or monetize their
              skills effectively.
            </p>
            <p className="mt-4">
              With this in mind, SkillLink was created as a platform that
              empowers individuals—regardless of their background—to teach,
              learn, and grow together. We believe in breaking down barriers to
              education, making learning accessible, practical, and engaging.
              Our journey started with a vision to democratize skill
              development, and today, we are building a thriving community where
              anyone can contribute, collaborate, and thrive.
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="rounded-2xl"
            src={Rocket}
            alt="This is an image"
            height={"500px"}
          />
        </div>
      </div>
      <div className="w-full flex min-h-screen justify-around items-center px-20 py-15">
        <div className="flex flex-col justify-around items-start w-1/2">
          <h2 className="text-6xl ">Our Mission</h2>
          <div className="text-xl ml-2 mt-7 mr-10">
            <p>
              At SkillLink, our mission is to redefine the way people learn and
              share knowledge. We are committed to:
            </p>
            <p className="mt-4">
              🔹 Empowering individuals by providing them with a space to
              showcase their skills, gain recognition, and connect with
              like-minded learners.
            </p>
            <p className="mt-4">
              🔹 Facilitating lifelong learning through a peer-to-peer knowledge
              exchange, making education more dynamic, flexible, and accessible.
            </p>
            <p className="mt-4">
              🔹 Creating a collaborative ecosystem where professionals,
              students, and enthusiasts can engage in interactive
              skill-building, moving beyond passive learning to hands-on
              experience.
            </p>
            <p className="mt-4">
              🔹 Promoting a growth mindset by encouraging individuals to step
              out of their comfort zones, explore new disciplines, and
              continuously evolve in their personal and professional journeys.
            </p>
            <p className="mt-5">
              SkillLink is more than just a platform—it’s a movement toward a
              future where learning is limitless, knowledge is freely shared,
              and everyone has the opportunity to grow.
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="rounded-2xl"
            src=""
            alt="This is an image"
            height={"500px"}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
