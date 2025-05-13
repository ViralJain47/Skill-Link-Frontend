import { useState } from "react";
import { useSelector } from "react-redux";


function Profile() {
    // Mock user data - in a real app, you would fetch this from your API

    const user = useSelector((state) => state.auth.userData);    
    const [userData, setUserData] = useState({
      name: user.name,
      email: user.email,
      title: "Devops Engineer",
      location: "Indore, Madhya Pradesh-453331",
      bio: user.bio,
      joinDate: "May 2025",
      skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"],
      connections: user.connections.length,
      achievements: [
        { id: 1, title: "Problem Solver", icon: "🏆", description: "Solved 50+ technical challenges" },
        { id: 2, title: "Team Player", icon: "👥", description: "Collaborated on 10+ group projects" },
        { id: 3, title: "Early Adopter", icon: "🚀", description: "Among first 500 platform users" }
      ],
      profileImage: user.profilePicture // In a real app, this would be an image URL
    });
  
    
    const [activeTab, setActiveTab] = useState("overview");
  
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen">
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
              <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
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
            
            {/* Action Buttons */}
            <div className="mt-4 md:mt-0 space-y-2">
              <button className="w-full md:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition duration-200 mx-1">
                Edit Profile
              </button>
              <button className="w-full md:w-auto px-4 py-2 border border-amber-500 text-amber-500 hover:bg-amber-50 rounded-md transition duration-200">
                Share Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === "overview" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-500"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === "skills" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-500"}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === "achievements" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-500"}`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === "connections" ? "text-amber-600 border-b-2 border-amber-500" : "text-gray-600 hover:text-amber-500"}`}
              onClick={() => setActiveTab("connections")}
            >
              Connections
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-700 mb-6">{userData.bio}</p>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-2 mb-6">
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">📧</span> {userData.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">🔗</span> linkedin.com/in/vanshdubeyy
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">🌐</span> vanshdubey.dev
                </p>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Skills</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {userData.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
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
                <h2 className="text-xl font-semibold text-gray-800">Skills & Expertise</h2>
                <button className="px-3 py-1 text-sm border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50">
                  Add Skill
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">{skill}</h3>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-2 w-8 rounded-full ${i < 4 ? "bg-amber-500" : "bg-gray-200"}`}
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
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievements & Badges</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userData.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-medium text-amber-600">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Connections Tab */}
          {activeTab === "connections" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Connections</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search connections..."
                    className="pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="absolute left-2 top-2.5 text-gray-400">🔍</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mock connection cards */}
                {[1, 2, 3, 4].map((id) => (
                  <div key={id} className="p-4 flex items-center border border-gray-200 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                      C{id}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Connection {id}</h3>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-xs border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Profile;