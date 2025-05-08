import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { 
  FaHashtag, FaVolumeUp, FaUserFriends, FaChevronDown, FaChevronRight, 
  FaPlus, FaCog, FaPaperPlane, FaPaperclip, FaSmile, FaSearch,
  FaUserCircle, FaMicrophone, FaHeadphones, FaCrown, FaEllipsisV,
  FaAt, FaBell, FaInbox, FaQuestionCircle
} from "react-icons/fa";

function CommunityRooms() {
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState({});
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(true);
  
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Mock data
    const mockServers = [
      { id: "s1", name: "UniHive", icon: "UH" },
      { id: "s2", name: "Computer Science", icon: "CS" },
      { id: "s3", name: "Engineering Club", icon: "EC" },
      { id: "s4", name: "Game Development", icon: "GD" },
      { id: "s5", name: "AI Research", icon: "AI" }
    ];

    const mockChannels = {
      "s1": [
        { id: "c1", name: "welcome", type: "text", category: "INFORMATION" },
        { id: "c2", name: "announcements", type: "text", category: "INFORMATION" },
        { id: "c3", name: "general", type: "text", category: "TEXT CHANNELS" },
        { id: "c4", name: "off-topic", type: "text", category: "TEXT CHANNELS" },
        { id: "c5", name: "study-groups", type: "text", category: "TEXT CHANNELS" },
        { id: "c6", name: "help-desk", type: "text", category: "TEXT CHANNELS" },
        { id: "c7", name: "Study Lounge", type: "voice", category: "VOICE CHANNELS" },
        { id: "c8", name: "Gaming Lobby", type: "voice", category: "VOICE CHANNELS" }
      ],
      "s2": [
        { id: "c9", name: "java-help", type: "text", category: "PROGRAMMING" },
        { id: "c10", name: "python-help", type: "text", category: "PROGRAMMING" },
        { id: "c11", name: "web-dev", type: "text", category: "PROGRAMMING" },
        { id: "c12", name: "algorithms", type: "text", category: "ACADEMICS" },
        { id: "c13", name: "databases", type: "text", category: "ACADEMICS" },
        { id: "c14", name: "Coding Session", type: "voice", category: "VOICE CHANNELS" }
      ]
    };

    const mockMessages = {
      "c3": [
        {
          id: "m1",
          author: { id: "u1", name: "Emily Chen", avatar: "", role: "admin" },
          content: "Hey everyone! Welcome to the general chat. Feel free to introduce yourselves!",
          timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
          reactions: [{ emoji: "👋", count: 5 }]
        },
        {
          id: "m2", 
          author: { id: "u2", name: "James Wilson", avatar: "" },
          content: "Hi all! I'm James, a sophomore in Computer Science. Looking forward to connecting with you all!",
          timestamp: new Date(Date.now() - 3 * 86400000 + 1200000).toISOString(), // 20 minutes after previous
          reactions: []
        },
        {
          id: "m3",
          author: { id: "u3", name: "Sophia Lee", avatar: "" },
          content: "Hello! I'm Sophia, majoring in Environmental Science. Anyone else interested in sustainability tech?",
          timestamp: new Date(Date.now() - 3 * 86400000 + 3600000).toISOString(), // 1 hour after first message
          reactions: [{ emoji: "🌱", count: 3 }]
        },
        {
          id: "m4", 
          author: { id: "u2", name: "James Wilson", avatar: "" },
          content: "Definitely interested! I'm working on an app that helps track carbon footprint. Would love to get your insights sometime.",
          timestamp: new Date(Date.now() - 3 * 86400000 + 3900000).toISOString(), // 5 minutes after previous
          reactions: [{ emoji: "👍", count: 2 }]
        },
        {
          id: "m5", 
          author: { id: "u4", name: "Michael Torres", avatar: "", role: "moderator" },
          content: "Just a reminder that we have a sustainability project showcase next Friday at 4 PM in the Innovation Lab!",
          timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
          reactions: [{ emoji: "📆", count: 7 }]
        },
        {
          id: "m6", 
          author: { id: "u5", name: "Virat Kohli", avatar: "" },
          content: "Hey everyone! Has anyone taken Professor Johnson's AI Ethics course? Thinking of enrolling next semester.",
          timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
          reactions: []
        },
        {
          id: "m7", 
          author: { id: "u6", name: "David Park", avatar: "" },
          content: "I took it last year! It's a great course, lots of interesting discussions. The workload is manageable too.",
          timestamp: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
          reactions: [{ emoji: "👍", count: 1 }]
        },
        {
          id: "m8", 
          author: { id: "u3", name: "Sophia Lee", avatar: "" },
          content: "Thanks for the info about the showcase, Michael! I'll definitely be there.",
          timestamp: new Date(Date.now() - 12 * 3600000).toISOString(), // 12 hours ago
          reactions: []
        }
      ],
      "c6": [
        {
          id: "m9", 
          author: { id: "u7", name: "Alex Johnson", avatar: "" },
          content: "Hi everyone! I'm having trouble with my course registration. It shows a hold on my account but I can't figure out why. Any ideas?",
          timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
          reactions: []
        },
        {
          id: "m10", 
          author: { id: "u4", name: "Michael Torres", avatar: "", role: "moderator" },
          content: "Hey Alex! Holds are usually related to either financial obligations or missing requirements. Have you checked your student portal for any notifications?",
          timestamp: new Date(Date.now() - 2 * 86400000 + 1800000).toISOString(), // 30 minutes after previous
          reactions: []
        }
      ]
    };

    const mockOnlineUsers = [
      { id: "u1", name: "Emily Chen", status: "online", avatar: "", role: "admin" },
      { id: "u2", name: "James Wilson", status: "online", avatar: "" },
      { id: "u3", name: "Sophia Lee", status: "idle", avatar: "" },
      { id: "u4", name: "Michael Torres", status: "online", avatar: "", role: "moderator" },
      { id: "u5", name: "Virat Kohli", status: "online", avatar: "" },
      { id: "u6", name: "David Park", status: "dnd", avatar: "" }, // Do Not Disturb
      { id: "u7", name: "Alex Johnson", status: "offline", avatar: "" },
      { id: "u8", name: "Sarah Williams", status: "offline", avatar: "" },
      { id: "u9", name: "Robert Brown", status: "offline", avatar: "" },
      { id: "u10", name: "Jessica Taylor", status: "online", avatar: "" }
    ];

    // Set initial expanded categories
    const initialExpandedCategories = {};
    Object.keys(mockChannels).forEach(serverId => {
      const categories = [...new Set(mockChannels[serverId].map(channel => channel.category))];
      categories.forEach(category => {
        initialExpandedCategories[`${serverId}-${category}`] = true;
      });
    });

    // Initialize data with delay to simulate loading
    setTimeout(() => {
      setServers(mockServers);
      setChannels(mockChannels);
      setMessages(mockMessages);
      setExpandedCategories(initialExpandedCategories);
      setOnlineUsers(mockOnlineUsers);
      setSelectedServer("s1");
      setSelectedChannel("c3");
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannel, messages]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    // If message is from today, show time only
    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, "h:mm a");
    }
    
    // If message is from yesterday, show "Yesterday" + time
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${format(messageDate, "h:mm a")}`;
    }
    
    // Otherwise show full date
    return format(messageDate, "MMM d, yyyy h:mm a");
  };

  // Toggle category expansion
  const toggleCategory = (serverId, category) => {
    const key = `${serverId}-${category}`;
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    // Create new message
    const newMessage = {
      id: `m${Date.now()}`,
      author: { id: "u5", name: "Virat Kohli", avatar: "" }, // Assuming current user
      content: messageInput,
      timestamp: new Date().toISOString(),
      reactions: []
    };
    
    // Add message to the current channel
    setMessages(prev => ({
      ...prev,
      [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
    }));
    
    // Clear input
    setMessageInput("");
  };

  // Get user status color
  const getUserStatusColor = (status) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  // Group messages by date for displaying date separators
  const groupMessagesByDate = (messagesArray) => {
    if (!messagesArray) return [];
    
    const groupedMessages = [];
    let currentDate = null;
    
    messagesArray.forEach(message => {
      const messageDate = new Date(message.timestamp).toDateString();
      
      if (messageDate !== currentDate) {
        groupedMessages.push({ type: "dateSeparator", date: messageDate });
        currentDate = messageDate;
      }
      
      groupedMessages.push({ type: "message", ...message });
    });
    
    return groupedMessages;
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-700">
      {/* Server Sidebar */}
      <div className="w-16 flex-shrink-0 bg-blue-800 flex flex-col items-center py-4 space-y-4">
        {servers.map(server => (
          <button
            key={server.id}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 hover:bg-blue-600 ${
              selectedServer === server.id ? "bg-blue-600 text-white" : "bg-blue-700 text-white"
            }`}
            onClick={() => {
              setSelectedServer(server.id);
              // Select the first channel of this server if exists
              const serverChannels = channels[server.id] || [];
              if (serverChannels.length > 0) {
                setSelectedChannel(serverChannels[0].id);
              } else {
                setSelectedChannel(null);
              }
            }}
          >
            {server.icon}
          </button>
        ))}
        
        {/* Add Server Button */}
        <button className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-500 transition-all duration-200">
          <FaPlus />
        </button>
      </div>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-white">
          <p className="text-blue-600">Loading...</p>
        </div>
      ) : (
        <>
          {/* Channel Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white border-r flex flex-col shadow-sm">
            {/* Server Header */}
            <div className="h-14 border-b flex items-center px-4 font-bold text-lg">
              {servers.find(s => s.id === selectedServer)?.name || "Select Server"}
              <FaChevronDown className="ml-auto text-gray-500" />
            </div>
            
            {/* Channel List */}
            <div className="flex-1 overflow-y-auto py-4">
              {selectedServer && channels[selectedServer] ? (
                <>
                  {/* Group channels by category */}
                  {[...new Set(channels[selectedServer].map(channel => channel.category))].map(category => (
                    <div key={category} className="mb-4">
                      <div 
                        className="px-4 mb-1 flex items-center text-xs font-semibold text-gray-500 cursor-pointer hover:text-blue-600"
                        onClick={() => toggleCategory(selectedServer, category)}
                      >
                        {expandedCategories[`${selectedServer}-${category}`] ? (
                          <FaChevronDown className="mr-1 text-xs" />
                        ) : (
                          <FaChevronRight className="mr-1 text-xs" />
                        )}
                        <span>{category}</span>
                      </div>
                      
                      {expandedCategories[`${selectedServer}-${category}`] && (
                        <div className="space-y-1">
                          {channels[selectedServer]
                            .filter(channel => channel.category === category)
                            .map(channel => (
                              <div 
                                key={channel.id}
                                className={`px-2 py-1 mx-2 rounded flex items-center cursor-pointer ${
                                  selectedChannel === channel.id 
                                    ? "bg-blue-100 text-blue-600" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                                onClick={() => setSelectedChannel(channel.id)}
                              >
                                {channel.type === "text" ? (
                                  <FaHashtag className="mr-2 text-sm" />
                                ) : (
                                  <FaVolumeUp className="mr-2 text-sm" />
                                )}
                                <span className="truncate">{channel.name}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-gray-500 text-center p-4">No channels available</div>
              )}
            </div>
            
            {/* User Panel */}
            <div className="h-14 bg-blue-50 border-t flex items-center px-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white">
                  <span className="font-medium">LM</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Virat Kohli</div>
                  <div className="text-xs text-gray-500">#4231</div>
                </div>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <FaMicrophone />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaHeadphones />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaCog />
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Channel Header */}
            <div className="h-14 border-b flex items-center px-4 bg-white shadow-sm">
              <FaHashtag className="text-gray-500 mr-2" />
              <span className="font-bold">
                {selectedChannel ? channels[selectedServer]?.find(c => c.id === selectedChannel)?.name : "Select a channel"}
              </span>
              
              <div className="ml-auto flex items-center space-x-4">
                <button className="text-gray-500 hover:text-blue-600">
                  <FaBell />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaAt />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaUserFriends onClick={() => setShowUserList(!showUserList)} />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaSearch />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaInbox />
                </button>
                <button className="text-gray-500 hover:text-blue-600">
                  <FaQuestionCircle />
                </button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedChannel && messages[selectedChannel] ? (
                groupMessagesByDate(messages[selectedChannel]).map((item, index) => {
                  if (item.type === "dateSeparator") {
                    return (
                      <div key={`date-${index}`} className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <div className="mx-4 text-xs text-gray-500 bg-gray-50 px-2">
                          {format(new Date(item.date), "MMMM d, yyyy")}
                        </div>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={item.id} className="group bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            {item.author.avatar ? (
                              <img 
                                src={item.author.avatar} 
                                alt={`${item.author.name}'s avatar`}
                                className="rounded-full w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-bold">{item.author.name.charAt(0)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-bold mr-2 text-gray-800">
                              {item.author.name}
                              {item.author.role && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                  {item.author.role === "admin" ? (
                                    <span className="flex items-center"><FaCrown className="mr-1 text-yellow-400" /> Admin</span>
                                  ) : (
                                    <span>Mod</span>
                                  )}
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500">{formatTimestamp(item.timestamp)}</span>
                            <div className="ml-auto hidden group-hover:flex space-x-2 text-gray-500">
                              <button className="hover:text-blue-600"><FaSmile /></button>
                              <button className="hover:text-blue-600"><FaReply /></button>
                              <button className="hover:text-blue-600"><FaEllipsisV /></button>
                            </div>
                          </div>
                          <div className="text-gray-700 whitespace-pre-wrap">{item.content}</div>
                          
                          {/* Reactions */}
                          {item.reactions && item.reactions.length > 0 && (
                            <div className="flex mt-2 space-x-2">
                              {item.reactions.map((reaction, idx) => (
                                <div key={idx} className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 flex items-center text-xs cursor-pointer border border-blue-100">
                                  <span className="mr-1">{reaction.emoji}</span>
                                  <span>{reaction.count}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {selectedChannel ? "No messages yet" : "Select a channel to view messages"}
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
            
            {/* Message Input */}
            {selectedChannel && (
              <div className="p-4 bg-white border-t">
                <form onSubmit={sendMessage} className="relative">
                  <div className="flex items-center">
                    <button type="button" className="p-2 text-gray-500 hover:text-blue-600">
                      <FaPaperclip />
                    </button>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder={`Message #${channels[selectedServer]?.find(c => c.id === selectedChannel)?.name}`}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="button" className="p-2 text-gray-500 hover:text-blue-600">
                      <FaSmile />
                    </button>
                    <button 
                      type="submit" 
                      className={`p-2 ${messageInput.trim() ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400'}`}
                      disabled={!messageInput.trim()}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Members Sidebar */}
          {showUserList && (
            <div className="w-60 flex-shrink-0 bg-white border-l overflow-y-auto">
              <div className="p-4">
                <h3 className="text-xs text-gray-500 font-semibold mb-2">ONLINE — {onlineUsers.filter(u => u.status !== "offline").length}</h3>
                {onlineUsers
                  .filter(user => user.status !== "offline")
                  .map(user => (
                    <div key={user.id} className="flex items-center py-1 px-2 hover:bg-blue-50 rounded cursor-pointer">
                      <div className="relative mr-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={`${user.name}'s avatar`}
                              className="rounded-full w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-medium">{user.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getUserStatusColor(user.status)}`}></div>
                      </div>
                      <div>
                        <span className={`text-sm ${user.role ? 'font-semibold' : ''}`}>
                          {user.name}
                        </span>
                        {user.role && (
                          <span className="ml-2 text-xs text-gray-500">
                            {user.role === "admin" ? (
                              <FaCrown className="inline text-yellow-400" />
                            ) : (
                              "mod"
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                
                {/* Offline Users */}
                <h3 className="text-xs text-gray-500 font-semibold mt-4 mb-2">OFFLINE — {onlineUsers.filter(u => u.status === "offline").length}</h3>
                {onlineUsers
                  .filter(user => user.status === "offline")
                  .map(user => (
                    <div key={user.id} className="flex items-center py-1 px-2 hover:bg-blue-50 rounded cursor-pointer opacity-70">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3 text-gray-600">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={`${user.name}'s avatar`}
                            className="rounded-full w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-medium">{user.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{user.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FaReply() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 17 4 12 9 7"></polyline>
      <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
    </svg>
  );
}

export default CommunityRooms;