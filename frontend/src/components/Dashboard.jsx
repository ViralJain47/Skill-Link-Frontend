import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventModal from "./Dashboard/EventModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  // Sample data

  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'

  const [recommendedUsers, setRecommendedUsers] = useState([]);
  
  const user = useSelector((state) => state.auth.userData);
  console.log(user)

  // Fetch and process skill matches
  const fetchSkillMatches = async () => {
    try {
      // Fetch all users
      const usersResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/all`
      );

      // Create skill matcher
      const skillMatcher = new SkillMatcher(user, usersResponse.data);
      
      // Find best matches
      const matches = skillMatcher.findBestMatches();
      
      // Transform matches for UI
      const formattedMatches = matches.map(match => ({
        id: match._id,
        name: match.name,
        avatar: "/api/placeholder/40/40", // Replace with actual avatar logic
        skill: match.skills.join(", "), // Join skills for display
        compatibility: match.compatibilityScore,
        location: match.location || "Remote", // Default to remote if no location
        commonSkills: match.commonSkills
      }));

      setRecommendedUsers(formattedMatches);
    } catch (err) {
      setError("Failed to fetch skill matches");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSkillMatches();
    }
  }, [user]);


  class SkillMatcher {
    constructor(currentUser, allUsers) {
      this.currentUser = currentUser;
      this.allUsers = allUsers;
    }
  
    // Calculate skill compatibility
    calculateSkillCompatibility(userSkills, matchSkills) {
      // Convert skills to sets for easier comparison
      const currentUserSkillSet = new Set(userSkills.map(skill => skill.toLowerCase().trim()));
      const matchUserSkillSet = new Set(matchSkills.map(skill => skill.toLowerCase().trim()));
  
      // Calculate overlap
      const commonSkills = new Set(
        [...currentUserSkillSet].filter(skill => matchUserSkillSet.has(skill))
      );
  
      // Compatibility calculation
      const totalUniqueSkills = new Set([...currentUserSkillSet, ...matchUserSkillSet]);
      const compatibilityScore = Math.round((commonSkills.size / totalUniqueSkills.size) * 100);
  
      return {
        compatibilityScore,
        commonSkills: Array.from(commonSkills)
      };
    }
  
    // Advanced matching algorithm
    findBestMatches(maxMatches = 5, minCompatibility = 30) {
      const potentialMatches = this.allUsers
        // Exclude the current user
        .filter(user => user._id !== this.currentUser._id)
        // Exclude users with no skills
        .filter(user => user.skills && user.skills.length > 0)
        // Map and score potential matches
        .map(user => {
          const compatibility = this.calculateSkillCompatibility(
            this.currentUser.skills || [], 
            user.skills
          );
  
          return {
            ...user,
            compatibilityScore: compatibility.compatibilityScore,
            commonSkills: compatibility.commonSkills
          };
        })
        // Filter by minimum compatibility
        .filter(match => match.compatibilityScore >= minCompatibility)
        // Sort by compatibility score in descending order
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
        // Limit to max matches
        .slice(0, maxMatches);
  
      return potentialMatches;
    }
  }


  

  const openCreateModal = () => {
    setCurrentEvent(null);
    setModalMode("create");
    setShowModal(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/event/all"
      );
      if (response?.data?.error) {
        setError("Error during fetching events");
        console.log(response.data.error);
      } else {
        console.log(response.data);
        setEvents(response?.data);
        setEvents((prev) => prev.filter((event) => event.host._id != user._id));
        setEvents(prev => prev.slice(0, 3));
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
      console.error(err);
    }
  };

  // const user = useSelector((state) => state.auth.userData);

  const handleCreateEvent = async (eventData) => {
    eventData.host = user._id;
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/event/create",
        eventData
      );
      fetchEvents();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error(err);
    }
    if (error) toast.error(error);
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/event/update/${eventData._id}`,
        eventData
      );
      fetchEvents();
      setShowModal(false);
    } catch (err) {
      setError("Failed to update event. Please try again.");
      console.error(err);
    }
  };

  const skillMatches = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/api/placeholder/40/40",
      skill: "React Development",
      compatibility: 92,
      location: "Remote",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "/api/placeholder/40/40",
      skill: "UI/UX Design",
      compatibility: 88,
      location: "Remote",
    },
    {
      id: 3,
      name: "Miguel Santos",
      avatar: "/api/placeholder/40/40",
      skill: "Data Analysis",
      compatibility: 85,
      location: "In-person",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      sender: "Priya Sharma",
      preview: "I'd love to learn more about your experience with React...",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Miguel Santos",
      preview: "Thanks for the feedback on my data visualization project!",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <main className="p-6 w-full">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-amber-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, User!
            </h1>
            <p className="text-gray-600 mt-1">
              Continue your learning journey today
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
              Add New Skill
            </button>
            <Link to={"/events"}>
              <button className="px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
                Join Event
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <Link to={"/my-skills"}>
            <div className="bg-gradient-to-br from-amber-50 to-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm hover:scale-105 duration-200">
              <h3 className="font-medium text-amber-700">
                Skills I'm Learning
              </h3>
              <p className="text-3xl font-bold mt-2 text-amber-800">4</p>
              <div className="w-full h-1 bg-amber-200 mt-3 rounded-full">
                <div className="w-3/4 h-1 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </Link>
          <Link to={"my-skills"}>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 shadow-sm hover:scale-105 duration-200">
              <h3 className="font-medium text-orange-700">
                Skills I'm Teaching
              </h3>
              <p className="text-3xl font-bold mt-2 text-orange-800">2</p>
              <div className="w-full h-1 bg-orange-200 mt-3 rounded-full">
                <div className="w-1/2 h-1 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </Link>
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:scale-105 duration-200">
            <h3 className="font-medium text-rose-700">Active Connections</h3>
            <p className="text-3xl font-bold mt-2 text-rose-800">7</p>
            <div className="w-full h-1 bg-rose-200 mt-3 rounded-full">
              <div className="w-2/3 h-1 bg-rose-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Skill Matches */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-amber-500 mr-2">🔍</span> Recommended Skill Matches
        </h2>

        <div className="space-y-4">
          {recommendedUsers.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-102"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {match.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{match.name}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">{match.skill}</span>
                    <span className="mx-2 text-amber-300">•</span>
                    <span className="text-sm text-gray-600">{match.location}</span>
                  </div>
                  {match.commonSkills && match.commonSkills.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Common skills: {match.commonSkills.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-center">
                  <div className="h-10 w-10 rounded-full border-2 border-amber-300 flex items-center justify-center">
                    <span className="text-sm font-bold text-amber-600">
                      {match.compatibility}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 block mt-1">
                    match
                  </span>
                </div>
                <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {recommendedUsers.length === 0 && (
          <p className="text-gray-500 text-center">
            No skill matches found. Try adding more skills to your profile!
          </p>
        )}

        <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
          View all matches <span className="ml-1">→</span>
        </button>
      </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="text-amber-500 mr-2">📅</span> Upcoming Events
            </h2>
            <button
              onClick={openCreateModal}
              className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300"
            >
              Create Event
            </button>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-102"
              >
                <h3 className="font-medium text-amber-800">{event.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className="text-amber-500">📅</span>
                  <span className="ml-1">{event.date.slice(0, 10)}</span>
                  <span className="mx-2 text-amber-300">•</span>
                  <span className="text-amber-500">⏰</span>
                  <span className="ml-1">
                    {event?.time || "abhi baaki hai bhai"}
                  </span>
                  <span className="mx-2 text-amber-300">•</span>
                  <span className="text-amber-500">👥</span>
                  <span className="ml-1">
                    {event.participants.length} participants
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    Hosted by{" "}
                    <span className="text-amber-700">{event.host.name}</span>
                  </span>
                  <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link to={"/events"}>
            <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
              View all events <span className="ml-1">→</span>
            </button>
          </Link>
        </div>
        {showModal && (
          <EventModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={
              modalMode === "create" ? handleCreateEvent : handleUpdateEvent
            }
            event={currentEvent}
            mode={modalMode}
          />
        )}
      </div>

      {/* Recent Messages */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6 border border-amber-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-amber-500 mr-2">✉️</span> Recent Messages
        </h2>

        {recentMessages.length > 0 ? (
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-101"
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    {message.sender.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h3 className="font-medium">{message.sender}</h3>
                      {message.unread && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-orange-600"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{message.preview}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block text-right">
                    {message.time}
                  </span>
                  <button className="mt-1 px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300 block w-full">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent messages</p>
        )}

        <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
          View all messages <span className="ml-1">→</span>
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
