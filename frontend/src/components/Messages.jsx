import React, { useState } from "react";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState("All");
  
  // Sample conversations data
  const conversationsData = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "A",
      lastMessage: "Hey, did you check out that React Hooks article?",
      time: "10:32 AM",
      unread: 2,
      online: true,
      pinned: true,
      category: "Development"
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "P",
      lastMessage: "I've shared the design mockups with you",
      time: "Yesterday",
      unread: 0,
      online: true,
      pinned: true,
      category: "Design"
    },
    {
      id: 3,
      name: "Miguel Santos",
      avatar: "M",
      lastMessage: "Let's discuss the data visualization project",
      time: "Yesterday",
      unread: 5,
      online: false,
      pinned: false,
      category: "Data Science"
    },
    {
      id: 4,
      name: "Viral Jain",
      avatar: "V",
      lastMessage: "Can you help me with the CSS Grid layout?",
      time: "May 1",
      unread: 0,
      online: false,
      pinned: false,
      category: "Development"
    },
    {
      id: 5,
      name: "Vansh Dubey",
      avatar: "V",
      lastMessage: "The marketing strategy document is ready",
      time: "Apr 28",
      unread: 0,
      online: true,
      pinned: false,
      category: "Marketing"
    }
  ];

  // Sample messages for the selected conversation
  const messagesData = [
    {
      id: 1,
      conversationId: 1,
      sender: "Alex Chen",
      senderAvatar: "A",
      content: "Hey, did you check out that React Hooks article I shared?",
      time: "10:15 AM",
      isOwn: false,
    },
    {
      id: 2,
      conversationId: 1,
      sender: "You",
      content: "Not yet! Is it the one about best practices for 2025?",
      time: "10:18 AM",
      isOwn: true,
    },
    {
      id: 3,
      conversationId: 1,
      sender: "Alex Chen",
      senderAvatar: "A",
      content: "Yes, exactly! It has some really cool patterns for optimizing performance. I think we could use some of these ideas in our current project.",
      time: "10:20 AM",
      isOwn: false,
    },
    {
      id: 4,
      conversationId: 1,
      sender: "You",
      content: "Sounds great! I'll definitely take a look at it today.",
      time: "10:25 AM",
      isOwn: true,
    },
    {
      id: 5,
      conversationId: 1,
      sender: "Alex Chen",
      senderAvatar: "A",
      content: "Perfect! Let me know what you think. Also, are you free for a quick call tomorrow to discuss implementation?",
      time: "10:32 AM",
      isOwn: false,
    },
    {
      id: 6,
      conversationId: 2,
      sender: "Priya Sharma",
      senderAvatar: "P",
      content: "I've shared the design mockups with you. Please take a look when you have time.",
      time: "Yesterday",
      isOwn: false,
    },
    {
      id: 7,
      conversationId: 2,
      sender: "You",
      content: "Thanks, Priya! I'll review them this afternoon.",
      time: "Yesterday",
      isOwn: true,
    }
  ];

  // Filter conversations based on search query and filter
  const filteredConversations = conversationsData.filter(conversation => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || 
                          (filter === "Unread" && conversation.unread > 0) ||
                          (filter === "Pinned" && conversation.pinned) ||
                          filter === conversation.category;
    return matchesSearch && matchesFilter;
  });

  // Get messages for the selected conversation
  const currentMessages = messagesData.filter(
    message => message.conversationId === selectedConversation
  );
  
  // Get the selected conversation details
  const currentConversation = conversationsData.find(
    conv => conv.id === selectedConversation
  );

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, you would add the message to your state/database
    console.log(`Sending message to conversation ${selectedConversation}: ${newMessage}`);
    setNewMessage("");
    
    // Scroll to bottom of messages (would be implemented with useRef in a real app)
  };
  
  // Handle key press for sending message with Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Filter options
  const filterOptions = ["All", "Unread", "Pinned", "Development", "Design", "Data Science", "Marketing"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex min-h-screen">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-amber-100 pr-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <button className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
            ✚
          </button>
        </div>
        
        {/* Search for conversations */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-amber-500">
            🔍
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all ${
                filter === option
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* Conversations list */}
        <div className="flex-grow overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer transition duration-200 ${
                selectedConversation === conversation.id 
                  ? "bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500" 
                  : "hover:bg-amber-50"
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold`}>
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  )}
                </div>
                
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{conversation.name}</span>
                    <div className="flex items-center">
                      {conversation.pinned && <span className="text-amber-500 mr-2">📌</span>}
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="ml-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredConversations.length === 0 && (
            <div className="text-center py-10">
              <div className="text-amber-500 text-4xl mb-4">🔍</div>
              <h3 className="text-md font-medium text-gray-700">No conversations found</h3>
              <p className="text-sm text-gray-500 mt-2">Try different search terms</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="w-2/3 flex flex-col pl-4">
        {/* Chat header */}
        {currentConversation && (
          <div className="flex items-center justify-between py-3 border-b border-amber-100">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {currentConversation.avatar}
                </div>
                {currentConversation.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium text-gray-800">{currentConversation.name}</h2>
                <span className="text-xs text-gray-500">
                  {currentConversation.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200">
                📞
              </button>
              <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200">
                📹
              </button>
              <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200">
                ⋯
              </button>
            </div>
          </div>
        )}
        
        {/* Messages area */}
        <div className="flex-grow overflow-y-auto py-4">
          {currentMessages.map((message) => (
            <div 
              key={message.id}
              className={`mb-4 flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              {!message.isOwn && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold mr-2 mt-1">
                  {message.senderAvatar}
                </div>
              )}
              <div 
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isOwn 
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex flex-col">
                  <p>{message.content}</p>
                  <span 
                    className={`text-xs mt-1 self-end ${
                      message.isOwn ? "text-amber-200" : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="border-t border-amber-100 pt-4">
          <div className="flex items-center">
            <button 
              type="button"
              className="p-2 rounded-full text-amber-500 hover:bg-amber-50 transition duration-200"
            >
              📎
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow mx-2 px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button 
              onClick={sendMessage}
              className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
              disabled={!newMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
