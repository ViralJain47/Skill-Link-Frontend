import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data
  const skillMatches = [
    { id: 1, name: 'Alex Chen', avatar: '/api/placeholder/40/40', skill: 'React Development', compatibility: 92, location: 'Remote' },
    { id: 2, name: 'Priya Sharma', avatar: '/api/placeholder/40/40', skill: 'UI/UX Design', compatibility: 88, location: 'Remote' },
    { id: 3, name: 'Miguel Santos', avatar: '/api/placeholder/40/40', skill: 'Data Analysis', compatibility: 85, location: 'In-person' }
  ];
  
  const upcomingEvents = [
    { id: 1, title: 'Intro to MERN Stack', date: 'Apr 5, 2025', time: '3:00 PM', host: 'Viral Jain', participants: 12 },
    { id: 2, title: 'UI/UX Design Workshop', date: 'Apr 8, 2025', time: '5:30 PM', host: 'Yug Shrivastava', participants: 8 },
    { id: 3, title: 'Web Development Basics', date: 'Apr 12, 2025', time: '4:00 PM', host: 'Vansh Dubey', participants: 15 }
  ];
  
  const recentMessages = [
    { id: 1, sender: 'Priya Sharma', preview: "I'd love to learn more about your experience with React...", time: '2h ago', unread: true },
    { id: 2, sender: 'Miguel Santos', preview: 'Thanks for the feedback on my data visualization project!', time: '1d ago', unread: false }
  ];
  
  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-amber-400">SkillLink</h1>
        </div>
        <nav className="mt-6">
          {['dashboard', 'my skills', 'messages', 'events', 'resources', 'community', 'settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-6 py-3 flex items-center ${
                activeTab === item ? 'bg-amber-50 text-amber-700 border-r-4 border-amber-500' : 'text-gray-500 hover:bg-amber-50'
              }`}
            >
              <span className="ml-2 capitalize">{item}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skills, users, events..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <div className="absolute left-3 top-2.5 text-amber-500">
                  🔍
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-amber-400 hover:text-amber-500 relative">
                🔔
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-amber-400 hover:text-amber-500 relative">
                ✉️
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                U
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-amber-100">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, User!</h1>
                <p className="text-gray-600 mt-1">Continue your learning journey today</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
                  Add New Skill
                </button>
                <button className="px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
                  Join Event
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm hover:scale-105 duration-200">
                <h3 className="font-medium text-amber-700">Skills I'm Learning</h3>
                <p className="text-3xl font-bold mt-2 text-amber-800">4</p>
                <div className="w-full h-1 bg-amber-200 mt-3 rounded-full">
                  <div className="w-3/4 h-1 bg-amber-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 shadow-sm hover:scale-105 duration-200">
                <h3 className="font-medium text-orange-700">Skills I'm Teaching</h3>
                <p className="text-3xl font-bold mt-2 text-orange-800">2</p>
                <div className="w-full h-1 bg-orange-200 mt-3 rounded-full">
                  <div className="w-1/2 h-1 bg-orange-500 rounded-full"></div>
                </div>
              </div>
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
                {skillMatches.map(match => (
                  <div key={match.id} className="flex items-center justify-between p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-102">
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
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 text-center">
                        <div className="h-10 w-10 rounded-full border-2 border-amber-300 flex items-center justify-center">
                          <span className="text-sm font-bold text-amber-600">{match.compatibility}%</span>
                        </div>
                        <span className="text-xs text-gray-500 block mt-1">match</span>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
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
                <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                  Create Event
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-102">
                    <h3 className="font-medium text-amber-800">{event.title}</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span className="text-amber-500">📅</span>
                      <span className="ml-1">{event.date}</span>
                      <span className="mx-2 text-amber-300">•</span>
                      <span className="text-amber-500">⏰</span>
                      <span className="ml-1">{event.time}</span>
                      <span className="mx-2 text-amber-300">•</span>
                      <span className="text-amber-500">👥</span>
                      <span className="ml-1">{event.participants} participants</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-500">Hosted by <span className="text-amber-700">{event.host}</span></span>
                      <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center">
                View all events <span className="ml-1">→</span>
              </button>
            </div>
          </div>
          
          {/* Recent Messages */}
          <div className="bg-white p-6 rounded-xl shadow-sm mt-6 border border-amber-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-amber-500 mr-2">✉️</span> Recent Messages
            </h2>
            
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map(message => (
                  <div key={message.id} className="flex items-center justify-between p-4 border border-amber-100 rounded-lg hover:bg-amber-50 transition duration-300 hover:scale-101">
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
                      <span className="text-xs text-gray-500 block text-right">{message.time}</span>
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
      </div>
    </div>
  );
};

export default Dashboard;