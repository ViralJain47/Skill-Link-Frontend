import React, { useState } from "react";

const Sessions = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Sample categories
  const categories = ["All", "Web Development", "Design", "Data Science", "Programming", "Marketing"];

  // Sample sessions data
  const sessionsData = {
    upcoming: [
      {
        id: 1,
        title: "Advanced React Hooks Workshop",
        instructor: "Alex Chen",
        instructorAvatar: "A",
        category: "Web Development",
        date: "May 12, 2025",
        time: "10:00 AM - 12:00 PM",
        duration: "2 hours",
        participants: 18,
        maxParticipants: 25,
        image: "/api/placeholder/240/135",
        isJoined: true
      },
      {
        id: 2,
        title: "UI/UX Design Systems",
        instructor: "Priya Sharma",
        instructorAvatar: "P",
        category: "Design",
        date: "May 15, 2025",
        time: "2:00 PM - 4:30 PM",
        duration: "2.5 hours",
        participants: 12,
        maxParticipants: 20,
        image: "/api/placeholder/240/135",
        isJoined: true
      },
      {
        id: 3,
        title: "Python for Data Analysis",
        instructor: "Miguel Santos",
        instructorAvatar: "M",
        category: "Data Science",
        date: "May 18, 2025",
        time: "11:00 AM - 1:30 PM",
        duration: "2.5 hours",
        participants: 15,
        maxParticipants: 15,
        image: "/api/placeholder/240/135",
        isJoined: false
      }
    ],
    past: [
      {
        id: 4,
        title: "CSS Grid Masterclass",
        instructor: "Viral Jain",
        instructorAvatar: "V",
        category: "Web Development",
        date: "May 5, 2025",
        time: "10:00 AM - 11:30 AM",
        duration: "1.5 hours",
        participants: 22,
        maxParticipants: 25,
        image: "/api/placeholder/240/135",
        isJoined: true,
        recording: true,
        feedback: true
      },
      {
        id: 5,
        title: "Digital Marketing Fundamentals",
        instructor: "Vansh Dubey",
        instructorAvatar: "V",
        category: "Marketing",
        date: "May 2, 2025",
        time: "3:00 PM - 5:00 PM",
        duration: "2 hours",
        participants: 18,
        maxParticipants: 20,
        image: "/api/placeholder/240/135",
        isJoined: true,
        recording: true,
        feedback: false
      },
      {
        id: 6,
        title: "JavaScript Performance Optimization",
        instructor: "Alex Chen",
        instructorAvatar: "A",
        category: "Programming",
        date: "Apr 28, 2025",
        time: "1:00 PM - 3:00 PM",
        duration: "2 hours",
        participants: 20,
        maxParticipants: 20,
        image: "/api/placeholder/240/135",
        isJoined: false,
        recording: true,
        feedback: false
      }
    ],
    hosted: [
      {
        id: 7,
        title: "Introduction to Frontend Frameworks",
        category: "Web Development",
        date: "May 20, 2025",
        time: "10:00 AM - 12:00 PM",
        duration: "2 hours",
        participants: 12,
        maxParticipants: 30,
        image: "/api/placeholder/240/135",
        status: "upcoming"
      },
      {
        id: 8,
        title: "Building RESTful APIs",
        category: "Programming",
        date: "May 25, 2025",
        time: "2:00 PM - 4:00 PM",
        duration: "2 hours",
        participants: 8,
        maxParticipants: 20,
        image: "/api/placeholder/240/135",
        status: "upcoming"
      },
      {
        id: 9,
        title: "Responsive Design Principles",
        category: "Design",
        date: "Apr 22, 2025",
        time: "11:00 AM - 1:00 PM",
        duration: "2 hours",
        participants: 25,
        maxParticipants: 25,
        image: "/api/placeholder/240/135",
        status: "completed",
        recording: true
      }
    ]
  };

  // Get the active sessions based on tab
  const activeSessions = sessionsData[activeTab] || [];

  // Filter sessions based on selected category and search query
  const filteredSessions = activeSessions.filter(session => {
    const matchesCategory = selectedCategory === "All" || session.category === selectedCategory;
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (session.instructor && session.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Function to join a session
  const joinSession = (id) => {
    console.log(`Joining session ${id}`);
  };

  // Function to leave a session
  const leaveSession = (id) => {
    console.log(`Leaving session ${id}`);
  };

  // Function to view session details
  const viewSessionDetails = (id) => {
    console.log(`Viewing details for session ${id}`);
  };

  // Function to view session recording
  const viewRecording = (id) => {
    console.log(`Viewing recording for session ${id}`);
  };

  // Function to provide feedback
  const provideFeedback = (id) => {
    console.log(`Providing feedback for session ${id}`);
  };
  
  // Function to edit hosted session
  const editSession = (id) => {
    console.log(`Editing session ${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Learning Sessions</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
          Host New Session
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-200 mb-6">
        {["upcoming", "past", "hosted"].map((tab) => (
          <button
            key={tab}
            className={`py-3 px-5 font-medium transition-all ${
              activeTab === tab
                ? "text-amber-600 border-b-2 border-amber-500"
                : "text-gray-600 hover:text-amber-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Sessions
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-amber-500">
            🔍
          </div>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <div 
            key={session.id}
            className="border border-amber-100 rounded-xl overflow-hidden hover:shadow-md transition duration-300"
          >
            <div className="relative">
              <img 
                src={session.image} 
                alt={session.title}
                className="w-full h-36 object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-md">
                {session.category}
              </div>
              {activeTab === "hosted" && (
                <div className={`absolute top-2 right-2 px-2 py-0.5 text-white text-xs rounded-md ${
                  session.status === "upcoming" ? "bg-green-500" : "bg-gray-500"
                }`}>
                  {session.status === "upcoming" ? "Upcoming" : "Completed"}
                </div>
              )}
              {session.participants === session.maxParticipants && activeTab === "upcoming" && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-md">
                  Full
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-amber-800 line-clamp-2 mb-2">{session.title}</h3>
              
              {(activeTab === "upcoming" || activeTab === "past") && (
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold mr-2">
                    {session.instructorAvatar}
                  </div>
                  <span className="text-gray-600 text-sm">By {session.instructor}</span>
                </div>
              )}
              
              <div className="flex items-center mb-2">
                <span className="text-amber-500 mr-2">📅</span>
                <span className="text-gray-600 text-sm">{session.date}</span>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="text-amber-500 mr-2">⏰</span>
                <span className="text-gray-600 text-sm">{session.time}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-amber-500 mr-2">👥</span>
                <span className="text-gray-600 text-sm">{session.participants}/{session.maxParticipants} Participants</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                {activeTab === "upcoming" && (
                  <>
                    <button onClick={() => viewSessionDetails(session.id)} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-md hover:bg-amber-200 transition duration-300">
                      Details
                    </button>
                    {session.isJoined ? (
                      <button onClick={() => leaveSession(session.id)} className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                        Leave
                      </button>
                    ) : (
                      <button 
                        onClick={() => joinSession(session.id)} 
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300"
                        disabled={session.participants === session.maxParticipants}
                      >
                        Join
                      </button>
                    )}
                  </>
                )}
                
                {activeTab === "past" && (
                  <div className="flex space-x-2 w-full">
                    {session.recording && (
                      <button onClick={() => viewRecording(session.id)} className="flex-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-md hover:bg-amber-200 transition duration-300">
                        View Recording
                      </button>
                    )}
                    {session.isJoined && !session.feedback && (
                      <button onClick={() => provideFeedback(session.id)} className="flex-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                        Give Feedback
                      </button>
                    )}
                    {session.isJoined && session.feedback && (
                      <span className="flex-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md text-center">
                        Feedback Sent
                      </span>
                    )}
                  </div>
                )}
                
                {activeTab === "hosted" && (
                  <div className="flex space-x-2 w-full">
                    <button onClick={() => viewSessionDetails(session.id)} className="flex-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-md hover:bg-amber-200 transition duration-300">
                      Details
                    </button>
                    {session.status === "upcoming" ? (
                      <button onClick={() => editSession(session.id)} className="flex-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                        Edit
                      </button>
                    ) : (
                      <button onClick={() => viewRecording(session.id)} className="flex-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-md hover:bg-amber-200 transition duration-300">
                        Recording
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredSessions.length === 0 && (
        <div className="text-center py-10">
          <div className="text-amber-500 text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-700">No sessions found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Featured Sessions */}
      {activeTab === "upcoming" && filteredSessions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-medium text-amber-800">Advanced JavaScript Concepts</h3>
              <div className="flex items-center mt-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs mr-2">
                  A
                </div>
                <span className="text-sm text-gray-600">Alex Chen</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">May 30, 2025 • 2:00 PM</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-600">12/30 Participants</span>
                <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                  Join
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-medium text-rose-800">Color Theory for Digital Products</h3>
              <div className="flex items-center mt-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-2">
                  P
                </div>
                <span className="text-sm text-gray-600">Priya Sharma</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">May 28, 2025 • 11:00 AM</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-600">8/20 Participants</span>
                <button className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm rounded-md hover:from-rose-600 hover:to-pink-700 shadow-sm transition duration-300">
                  Join
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-medium text-blue-800">Introduction to Machine Learning</h3>
              <div className="flex items-center mt-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xs mr-2">
                  M
                </div>
                <span className="text-sm text-gray-600">Miguel Santos</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Jun 5, 2025 • 10:00 AM</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-600">15/25 Participants</span>
                <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:from-blue-600 hover:to-cyan-700 shadow-sm transition duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center mx-auto">
          Browse all sessions <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default Sessions;