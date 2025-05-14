import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../features/user";
import { Link, useParams } from "react-router-dom";

function User() {
  // Mock user data - in a real app, you would fetch this from your API
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    title: "",
    bio: "",
    skillsLearning: [],
    skillsTaught: [],
    profilePicture: "",
    connections: [],
  });

  const fetchUserWithId = async () => {
    try {
      const res = await getUser(userId);
      if (res?.error) console.log(res.error);
      else {
        setUser(res);
        setUserData((prev) => ({
          name: res.name || "",
          email: res.email || "",
          title: "Devops Engineer",
          location: "Indore, Madhya Pradesh-453331",
          bio: res.bio || "",
          joinDate: "May 2025",
          skills: [...res?.skillsLearning, ...res?.skillsTaught] || [],
          connections: res.connections.length || 0,
          achievements: [
            {
              id: 1,
              title: "Problem Solver",
              icon: "🏆",
              description: "Solved 50+ technical challenges",
            },
            {
              id: 2,
              title: "Team Player",
              icon: "👥",
              description: "Collaborated on 10+ group projects",
            },
            {
              id: 3,
              title: "Early Adopter",
              icon: "🚀",
              description: "Among first 500 platform users",
            },
          ],
          profileImage: res.profilePicture || "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserWithId();
    console.log(user);
  }, []);

  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    title: "Devops Engineer",
    location: "Indore, Madhya Pradesh-453331",
    bio: user.bio || "",
    joinDate: "May 2025",
    skills: [...user?.skillsLearning, ...user?.skillsTaught] || [],
    connections: user.connections.length || 0,
    achievements: [
      {
        id: 1,
        title: "Problem Solver",
        icon: "🏆",
        description: "Solved 50+ technical challenges",
      },
      {
        id: 2,
        title: "Team Player",
        icon: "👥",
        description: "Collaborated on 10+ group projects",
      },
      {
        id: 3,
        title: "Early Adopter",
        icon: "🚀",
        description: "Among first 500 platform users",
      },
    ],
    profileImage: user.profilePicture || "",
  });

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen w-2/3">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image */}
          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-4xl font-semibold mb-4 md:mb-0 md:mr-8">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              userData.name.charAt(0)
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h1>
            <p className="text-amber-600 font-medium">{userData.title}</p>
            <p className="text-gray-600 mb-2">📍 {userData.location}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {userData.connections} connections
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Member since {userData.joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex overflow-x-auto">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "overview"
                ? "text-amber-600 border-b-2 border-amber-500"
                : "text-gray-600 hover:text-amber-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "skills"
                ? "text-amber-600 border-b-2 border-amber-500"
                : "text-gray-600 hover:text-amber-500"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "achievements"
                ? "text-amber-600 border-b-2 border-amber-500"
                : "text-gray-600 hover:text-amber-500"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 mb-6">{userData.bio}</p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="space-y-2 mb-6">
              <p className="flex items-center text-gray-700">
                <span className="mr-2">✉️</span> {userData.email}
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top Skills
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {userData.skills.length == 0 && (
                <div className="text-gray-500 text-center">
                  No skills added yet!
                </div>
              )}
              {userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill.title}
                </span>
              ))}
              {userData.skills.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  +{userData.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Skills & Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.skills.length == 0 && (
                <div className="text-gray-500 text-center">
                  No skills added yet!
                </div>
              )}
              {userData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{skill.title}</h3>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-8 rounded-full ${
                            i < 4 ? "bg-amber-500" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Achievements & Badges
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 border border-gray-200 rounded-lg text-center"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="font-medium text-amber-600">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
