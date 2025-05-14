import React, { useEffect, useState } from "react";
import AddSkillForm from "./AddSkillForm";
import {
  getAllUserSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../features/skill";
import { useDispatch, useSelector } from "react-redux";

const MySkills = () => {
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const userId = useSelector((state) => state.auth.userData?._id);
  const [activeTab, setActiveTab] = useState("Learning");
  const dispatch = useDispatch();
  // Handle adding a new skill
    const handleAddSkill = async (skillData) => {
        try {
            const newSkill = {
                ...skillData,
                userId: userId,
            };
            await createSkill(newSkill);
            await fetchAllSkills();
            setShowAddSkillModal(false);
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    };

  // Fetch all skills for the user
  const fetchAllSkills = async () => {
    try {
      const res = await getAllUserSkills(userId);
      setSkills(res);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Delete a skill
  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(skillId);
      await fetchAllSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Update skill progress
    const handleUpdateProgress = async (skillId, newHours) => {
        try {
            const skill = skills.find((s) => s._id === skillId);
            if (skill) {
                const updatedSkill = {
                    ...skill,
                    hoursCompleted: Math.min(skill.approxTotalHours, newHours),
                };
                await updateSkill(skillId, updatedSkill);
                await fetchAllSkills();
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

  useEffect(() => {
    if (userId) {
      fetchAllSkills();
    }
  }, [userId]);

  // Function to render progress bar
  const renderProgressBar = (hoursCompleted, approxTotalHours) => {
    const progress =
      Math.min(100, Math.round((hoursCompleted / approxTotalHours) * 100)) || 0;

    return (
      <div className="w-full h-2 bg-amber-100 rounded-full">
        <div
          className="h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // Filter skills based on active tab
  const filteredSkills = skills.filter((skill) => skill.type === activeTab);

  // Calculate total learning hours
  const totalLearningHours = skills
    .filter((skill) => skill.type === "Learning")
    .reduce((total, skill) => total + (skill.hoursCompleted || 0), 0);

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate days remaining until end date
  const getDaysRemaining = (endDate) => {
    if (!endDate) return null;
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Skills</h1>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
            onClick={() => setShowAddSkillModal(true)}
          >
            Add New Skill
          </button>
          {showAddSkillModal && (
            <AddSkillForm
              isOpen={showAddSkillModal}
              onClose={() => setShowAddSkillModal(false)}
              onSubmit={handleAddSkill}
            />
          )}
          <button className="px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
            Find Mentor
          </button>
        </div>
      </div>

      {/* Skills Summary */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-amber-50 to-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-amber-700">Skills I'm Learning</h3>
          <p className="text-3xl font-bold mt-2 text-amber-800">
            {skills.filter((skill) => skill.type === "Learning").length}
          </p>
          <div className="w-full h-1 bg-amber-200 mt-3 rounded-full">
            <div
              className="w-3/4 h-1 bg-amber-500 rounded-full"
              style={{
                width: `${
                  skills.filter((skill) => skill.type === "Learning").length >
                  0
                    ? (skills.filter((skill) => skill.type === "Learning")
                        .length /
                        skills.length) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-orange-700">Skills I'm Teaching</h3>
          <p className="text-3xl font-bold mt-2 text-orange-800">
            {skills.filter((skill) => skill.type === "Teaching").length}
          </p>
          <div className="w-full h-1 bg-orange-200 mt-3 rounded-full">
            <div
              className="w-1/2 h-1 bg-orange-500 rounded-full"
              style={{
                width: `${
                  skills.filter((skill) => skill.type === "Teaching").length >
                  0
                    ? (skills.filter((skill) => skill.type === "Teaching")
                        .length /
                        skills.length) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:scale-105 duration-200">
          <h3 className="font-medium text-rose-700">Total Hours Learning</h3>
          <p className="text-3xl font-bold mt-2 text-rose-800">
            {totalLearningHours}
          </p>
          <div className="w-full h-1 bg-rose-200 mt-3 rounded-full">
             <div
              className="w-2/3 h-1 bg-rose-500 rounded-full"
              style={{
                width: `${
                  skills.filter((skill) => skill.type === "Learning").length >
                  0
                    ? (totalLearningHours /
                        skills.filter((skill) => skill.type === "Learning").reduce(
                          (total, skill) => total + (skill.approxTotalHours || 1),
                          1
                        )) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "Learning"
              ? "text-amber-600 border-b-2 border-amber-500"
              : "text-gray-600 hover:text-amber-600"
          }`}
          onClick={() => setActiveTab("Learning")}
        >
          Skills I'm Learning
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "Teaching"
              ? "text-amber-600 border-b-2 border-amber-500"
              : "text-gray-600 hover:text-amber-600"
          }`}
          onClick={() => setActiveTab("Teaching")}
        >
          Skills I'm Teaching
        </button>
      </div>

      {/* Skills Content */}
      <div className="space-y-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div
              key={skill._id}
              className="p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-amber-800">{skill.title}</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full capitalize">
                  {skill.type}
                </span>
              </div>

              {skill.type === "Learning" && (
                <div className="mt-3">
                  {renderProgressBar(
                    skill.hoursCompleted,
                    skill.approxTotalHours
                  )}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">
                      {Math.min(
                        100,
                        Math.round(
                          (skill.hoursCompleted / skill.approxTotalHours) * 100
                        )
                      ) || 0}% Complete
                    </span>
                    <span className="text-sm text-gray-600">
                      {skill.hoursCompleted} / {skill.approxTotalHours} hours
                    </span>
                  </div>
                </div>
              )}

              {skill.type === "Teaching" && (
                <div className="flex items-center mt-3">
                  <div className="flex items-center mr-6">
                    <span className="text-amber-500 text-lg mr-1">⏰</span>
                    <span className="text-sm text-gray-700">
                      {skill.hoursCompleted} hours taught
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-500 text-lg mr-1">🎯</span>
                    <span className="text-sm text-gray-700">
                      {skill.approxTotalHours} hours target
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-xs text-gray-500">
                    Started on {formatDate(skill.createdAt)}
                  </span>
                  {skill.endDate && (
                    <span className="text-xs text-gray-500 ml-4">
                      End date: {formatDate(skill.endDate)}{" "}
                      {getDaysRemaining(skill.endDate) !== null && (
                        <span className="ml-1 text-amber-600">
                          ({getDaysRemaining(skill.endDate)} days remaining)
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  {skill.type === "Learning" && (
                    <>
                      <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                        Find Mentor
                      </button>
                      <button
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300"
                        onClick={() =>
                          handleUpdateProgress(
                            skill._id,
                            (skill.hoursCompleted || 0) + 1
                          )
                        }
                      >
                        Log Hours
                      </button>
                    </>
                  )}

                  {skill.type === "Teaching" && (
                    <>
                      <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                        View Students
                      </button>
                      <button
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300"
                        onClick={() =>
                          handleUpdateProgress(
                            skill._id,
                            (skill.hoursCompleted || 0) + 1
                          )
                        }
                      >
                        Log Session
                      </button>
                    </>
                  )}

                  <button
                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200 transition duration-300"
                    onClick={() => handleDeleteSkill(skill._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No {activeTab.toLowerCase()} skills found. Add a new skill to get
            started!
          </div>
        )}
        <button
          className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center"
          onClick={() => setShowAddSkillModal(true)}
        >
          Add a {activeTab.toLowerCase()} skill{" "}
          <span className="ml-1">+</span>
        </button>
      </div>
    </div>
  );
};

export default MySkills;