import React, { useState } from "react";

const MySkills = () => {
  // Sample data for skills the user is learning
  const [learningSkills, setLearningSkills] = useState([
    {
      id: 1,
      name: "React Development",
      progress: 65,
      hoursSpent: 28,
      category: "Web Development",
      startedDate: "Mar 12, 2025",
    },
    {
      id: 2,
      name: "UI/UX Design",
      progress: 40,
      hoursSpent: 15,
      category: "Design",
      startedDate: "Apr 02, 2025",
    },
    {
      id: 3,
      name: "Node.js",
      progress: 25,
      hoursSpent: 8,
      category: "Web Development",
      startedDate: "Apr 15, 2025",
    },
    {
      id: 4,
      name: "Data Visualization",
      progress: 80,
      hoursSpent: 35,
      category: "Data Science",
      startedDate: "Feb 20, 2025",
    },
  ]);

  // Sample data for skills the user is teaching
  const [teachingSkills, setTeachingSkills] = useState([
    {
      id: 1,
      name: "Python Basics",
      students: 12,
      rating: 4.8,
      category: "Programming",
      createdDate: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Digital Marketing",
      students: 8,
      rating: 4.5,
      category: "Marketing",
      createdDate: "Mar 05, 2025",
    },
  ]);

  const [activeTab, setActiveTab] = useState("learning");

  // Function to render progress bar
  const renderProgressBar = (progress) => {
    return (
      <div className="w-full h-2 bg-amber-100 rounded-full">
        <div 
          className="h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Skills</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
            Add New Skill
          </button>
          <button className="px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
            Find Mentor
          </button>
        </div>
      </div>

      {/* Skills Summary */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-amber-50 to-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-amber-700">Skills I'm Learning</h3>
          <p className="text-3xl font-bold mt-2 text-amber-800">{learningSkills.length}</p>
          <div className="w-full h-1 bg-amber-200 mt-3 rounded-full">
            <div className="w-3/4 h-1 bg-amber-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-orange-700">Skills I'm Teaching</h3>
          <p className="text-3xl font-bold mt-2 text-orange-800">{teachingSkills.length}</p>
          <div className="w-full h-1 bg-orange-200 mt-3 rounded-full">
            <div className="w-1/2 h-1 bg-orange-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-rose-700">Total Hours Learning</h3>
          <p className="text-3xl font-bold mt-2 text-rose-800">
            {learningSkills.reduce((total, skill) => total + skill.hoursSpent, 0)}
          </p>
          <div className="w-full h-1 bg-rose-200 mt-3 rounded-full">
            <div className="w-2/3 h-1 bg-rose-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-200 mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "learning" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-600"}`}
          onClick={() => setActiveTab("learning")}
        >
          Skills I'm Learning
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "teaching" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-600"}`}
          onClick={() => setActiveTab("teaching")}
        >
          Skills I'm Teaching
        </button>
      </div>

      {/* Learning Skills Content */}
      {activeTab === "learning" && (
        <div className="space-y-4">
          {learningSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-amber-800">{skill.name}</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {skill.category}
                </span>
              </div>
              <div className="mt-3">
                {renderProgressBar(skill.progress)}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">{skill.progress}% Complete</span>
                  <span className="text-sm text-gray-600">{skill.hoursSpent} hours spent</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Started on {skill.startedDate}</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                    Find Mentor
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                    Update Progress
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
            Add skill to learn <span className="ml-1">+</span>
          </button>
        </div>
      )}

      {/* Teaching Skills Content */}
      {activeTab === "teaching" && (
        <div className="space-y-4">
          {teachingSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-amber-800">{skill.name}</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {skill.category}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex items-center mr-6">
                  <span className="text-amber-500 text-lg mr-1">👥</span>
                  <span className="text-sm text-gray-700">{skill.students} Students</span>
                </div>
                <div className="flex items-center">
                  <span className="text-amber-500 text-lg mr-1">⭐</span>
                  <span className="text-sm text-gray-700">{skill.rating} Rating</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Created on {skill.createdDate}</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                    View Students
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                    Schedule Session
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
            Add skill to teach <span className="ml-1">+</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MySkills;