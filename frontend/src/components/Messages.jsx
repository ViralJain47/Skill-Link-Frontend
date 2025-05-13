import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Construction } from "lucide-react";
import {useSelector} from "react-redux"
import { SocketContext } from "../hooks/Socket";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState("All");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // New state for user list and modal
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const socketInstance = useContext(SocketContext)

  const messagesEndRef = useRef(null);

  // Connect to socket and fetch initial data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResponse = useSelector((state) => state.auth.userData);
        setCurrentUser(userResponse);

        socketInstance.on("new-message", (message) => {
          if (
            (message.sender === currentUser?._id && message.receiver === selectedConversation?.userId) ||
            (message.receiver === currentUser?._id && message.sender === selectedConversation?.userId)
          ) {
            setMessages((prev) => [...prev, {
              id: message._id,
              conversationId: message.sender === currentUser?._id ? message.receiver : message.sender,
              sender: message.sender,
              content: message.message,
              time: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isOwn: message.sender === currentUser?._id
            }]);
          }

          setConversations(prev => {
            return prev.map(conv => {
              if (
                (conv.id === message.sender && currentUser?._id === message.receiver) ||
                (conv.id === message.receiver && currentUser?._id === message.sender)
              ) {
                return {
                  ...conv,
                  lastMessage: message.message,
                  time: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  unread: conv.id === selectedConversation?.userId ? 0 : (conv.unread || 0) + 1
                };
              }
              return conv;
            });
          });
        });

        fetchConversations();
      } catch (error) {
        console.log("Error initializing:", error);
        setLoading(false);
      }
    };

    getUserData();
  }, [currentUser?._id]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch conversations from the backend
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_API_URL+'/api/messages/conversations');

      const formattedConversations = response.data.map(conv => ({
        id: conv.userId,
        userId: conv.userId, // Ensure userId is included
        name: conv.name,
        avatar: conv.name.charAt(0),
        lastMessage: conv.lastMessage,
        time: new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: conv.unreadCount,
        online: conv.online,
        pinned: conv.pinned,
        category: conv.category || "General"
      }));

      setConversations(formattedConversations);

      if (formattedConversations.length > 0 && !selectedConversation) {
        handleSelectConversation(formattedConversations[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setLoading(false);
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL+`/api/messages/${userId}`);

      const formattedMessages = response.data.map(msg => ({
        id: msg._id,
        conversationId: msg.sender === currentUser?._id ? msg.receiver : msg.sender,
        sender: msg.sender,
        senderAvatar: msg.senderName?.charAt(0),
        content: msg.message,
        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: msg.sender === currentUser?._id
      }));

      setMessages(formattedMessages);
      markMessagesAsRead(userId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
  };

  
  // Handle key press for sending message with Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;
  
    try {
      const messageData = {
        sender: currentUser._id,
        receiver: selectedConversation.id,
        message: newMessage,
      };
      
      socket.emit("message", messageData);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch all users when "+" button is clicked
  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL+'/api/user/all'); 
      console.log(response);
      // Filter out the current user
      const filteredUsers = response.data.filter(user => user._id !== currentUser?._id);
      setUsers(filteredUsers);
      setIsUserModalOpen(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle user selection from the modal
  const handleSelectUser = async (user) => {
    setIsUserModalOpen(false);
    
    // Check if a conversation with this user already exists
    const existingConversation = conversations.find(conv => conv.id === user._id);
    
    if (existingConversation) {
      // Select the existing conversation
      handleSelectConversation(existingConversation);
    } else {
      // Create a new conversation
      const newConversation = {
        id: user._id,
        userId: user._id,
        name: user.name,
        avatar: user.name.charAt(0),
        lastMessage: "",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: 0,
        online: user.online || false,
        pinned: false,
        category: "General"
      };

      // Add the new conversation to the list
      setConversations(prev => [...prev, newConversation]);
      handleSelectConversation(newConversation);
    }
  };

  // Filter conversations based on search query and filter
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         conversation.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || 
                          (filter === "Unread" && conversation.unread > 0) ||
                          (filter === "Pinned" && conversation.pinned) ||
                          filter === conversation.category;
    return matchesSearch && matchesFilter;
  });

  const categories = ["All", "Unread", "Pinned"];
  const uniqueCategories = [...new Set(conversations.map(conv => conv.category))];
  const filterOptions = [...categories, ...uniqueCategories];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex min-h-screen">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-amber-100 pr-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <button 
            className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
            onClick={fetchUsers}
          >
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
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <>
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition duration-200 ${
                    selectedConversation?.id === conversation.id 
                      ? "bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500" 
                      : "hover:bg-amber-50"
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
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
            </>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col pl-4">
        {selectedConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between py-3 border-b border-amber-100">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="font-medium text-gray-800">{selectedConversation.name}</h2>
                  <span className="text-xs text-gray-500">
                    {selectedConversation.online ? "Online" : "Offline"}
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

            {/* Messages area */}
            <div className="flex-grow overflow-y-auto py-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                </div>
              ) : (
                <>
                  {messages.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="text-amber-500 text-4xl mb-4">💬</div>
                      <h3 className="text-md font-medium text-gray-700">No messages yet</h3>
                      <p className="text-sm text-gray-500 mt-2">Start a conversation!</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div 
                        key={message.id || index}
                        className={`mb-4 flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        {!message.isOwn && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold mr-2 mt-1">
                            {selectedConversation.avatar}
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
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
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
                  disabled={loading}
                />
                <button 
                  onClick={sendMessage}
                  className={`p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300 ${
                    !newMessage.trim() || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!newMessage.trim() || loading}
                >
                  ➤
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-amber-500 text-6xl mb-4">💬</div>
            <h2 className="text-xl font-medium text-gray-700">Select a conversation</h2>
            <p className="text-gray-500 mt-2">Choose a contact to start messaging</p>
          </div>
        )}
      </div>

      {/* User Selection Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Select a User</h2>
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsUserModalOpen(false)}
              >
                ✕
              </button>
            </div>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center">No users found</p>
            ) : (
              <div className="space-y-2">
                {users.map(user => (
                  <div
                    key={user._id}
                    className="flex items-center p-3 rounded-lg hover:bg-amber-50 cursor-pointer"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p  className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;