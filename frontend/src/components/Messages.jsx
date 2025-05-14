import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import io from "socket.io-client"; // Note: io is imported but not directly used if socketInstance comes from context
import axios from "axios";
import { Construction } from "lucide-react"; // This seems unused, can be removed if not needed
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { SocketContext } from "../hooks/Socket";

// Assume you have Redux actions and selectors like these (conceptual)
// import { chatActions } from './redux/chatSlice'; // e.g., chatActions.setConversationMessages, chatActions.addMessageToConversation
// import { selectMessagesForConversationFromStore } from './redux/chatSelectors'; // e.g., a selector function

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState("All");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [currentUser, setCurrentUser] = useState(null); // Replaced by Redux selector
  const [loading, setLoading] = useState(true); // General loading for initial data
  const [messagesLoading, setMessagesLoading] = useState(false); // Specific loading for messages area

  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  const socketInstance = useContext(SocketContext);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  // Get current user from Redux store
  const currentUser = useSelector((state) => state.auth.userData); 
  
  // Selector to get all chat messages from Redux (example structure)
  // Replace with your actual selector. This assumes messages are stored in an object keyed by conversationId.
  const allChatMessagesFromRedux = useSelector((state) => state.chat?.messagesByConversationId || {});

  // Memoized version of fetchConversations
  const fetchConversations = useCallback(async (selectFirst = false) => {
    if (!currentUser?._id) return; // Don't fetch if no current user
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + `/api/message/${currentUser?._id}`);

      console.log(response.data.conversations)
      const formattedConversations = response.data.conversations.map(conv => ({
        id: conv?.userId,
        userId: conv?.userId,
        name: conv?.name,
        avatar: conv.avatar ? conv.avatar: conv.name.charAt(0),
        time: new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: conv.unreadCount,
        online: conv.isOnline,
        pinned: conv.pinned,
        category: conv.category || "General",
        lastMessageTimestamp: conv.lastMessageTime 
      }));

      setConversations(formattedConversations);

      if (selectFirst && formattedConversations.length > 0 && !selectedConversation) {
        // Automatically select the first conversation and fetch its messages
        handleSelectConversation(formattedConversations[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?._id, selectedConversation]); // Added selectedConversation to dependencies if selectFirst logic depends on it indirectly

  // Function to mark messages as read (local, Redux, and optionally backend)
  const markMessagesAsRead = useCallback(async (conversationId) => {
    if (!currentUser?._id || !conversationId) return;

    // Update local conversations state
    setConversations(prevConvs =>
        prevConvs.map(conv =>
            conv.id === conversationId ? { ...conv, unread: 0 } : conv
        )
    );
  }, [currentUser?._id, dispatch]);


  const fetchMessages = useCallback(async (receiverId) => {
    if (!currentUser?._id || !receiverId) return;
    setMessagesLoading(true);
    setMessages([]);
    console.log("sdafas: ", receiverId)
      try {
        console.log(`${import.meta.env.VITE_API_URL}/api/message/${currentUser?._id}/${receiverId}`)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/${currentUser?._id}/${receiverId}`);
        const rawMessages = response.data.messages;
        console.log(rawMessages)


        const formattedApiMessages = rawMessages.map(msg => ({
          id: msg._id,
          sender: msg.sender,
          content: msg.content,
          timestamp: msg.timestamp, // Store raw timestamp
          time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: msg.sender === currentUser._id
        }));

        setMessages(formattedApiMessages);
        
        markMessagesAsRead(receiverId);
      } catch (error) {
        console.error("Error fetching messages from API:", error);
        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
  }, [currentUser?._id, dispatch, allChatMessagesFromRedux, markMessagesAsRead]); // Added dependencies


  // Initial data load and socket setup
  useEffect(() => {
    if (currentUser?._id) {
      fetchConversations(true); // Fetch conversations and select the first one initially
    }
  }, [currentUser?._id, fetchConversations]);


  // Socket event listeners
  useEffect(() => {
    if (!socketInstance || !currentUser?._id) return;

    const handleNewMessage = (incomingMessage) => {
      // incomingMessage expected: { _id, sender, receiver, message, timestamp, senderName (optional) }
      const conversationPartnerId = incomingMessage.sender === currentUser._id ? incomingMessage.receiver : incomingMessage.sender;

      const formattedMessage = {
        id: incomingMessage._id,
        conversationId: conversationPartnerId,
        sender: incomingMessage.sender,
        // senderAvatar: incomingMessage.senderName?.charAt(0), // If senderName is provided
        content: incomingMessage.message,
        timestamp: incomingMessage.timestamp,
        time: new Date(incomingMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: incomingMessage.sender === currentUser._id
      };

      // Update Redux store with the new message
      // dispatch(chatActions.addMessageToConversation({ conversationId: conversationPartnerId, message: formattedMessage }));

      // Update local messages state if this is the currently open chat
      if (selectedConversation?.id === conversationPartnerId) {
        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        markMessagesAsRead(conversationPartnerId); // Mark as read if user is viewing this chat
      }

      // Update conversations list (last message, time, unread count)
      setConversations(prevConvs => {
        let conversationExists = false;
        const updatedConvs = prevConvs.map(conv => {
          if (conv.id === conversationPartnerId) {
            conversationExists = true;
            return {
              ...conv,
              lastMessage: formattedMessage.content,
              time: formattedMessage.time,
              lastMessageTimestamp: formattedMessage.timestamp,
              unread: conv.id === selectedConversation?.id ? 0 : (conv.unread || 0) + 1,
            };
          }
          return conv;
        });

        // If new message is for a brand new conversation not yet in the list
        if (!conversationExists) {
            // Potentially fetch user details for `incomingMessage.sender` to create a new conversation entry
            // For now, let's assume new conversations are initiated by the current user via UI
            // Or, if the backend provides enough info (like senderName), create a basic entry:
            // updatedConvs.push({
            //   id: conversationPartnerId,
            //   userId: conversationPartnerId,
            //   name: incomingMessage.senderName || 'New Chat', // Requires senderName
            //   avatar: (incomingMessage.senderName || 'N').charAt(0),
            //   lastMessage: formattedMessage.content,
            //   time: formattedMessage.time,
            //   lastMessageTimestamp: formattedMessage.timestamp,
            //   unread: 1,
            //   online: false, // Need presence info
            //   pinned: false,
            //   category: "General"
            // });
            console.log("Received message for a new or unlisted conversation. Consider fetching conversation list or user details.");
            // Optionally, trigger a re-fetch of conversations if a message arrives for an unknown chat
            // fetchConversations();
        }
        // Sort conversations, e.g., by last message time
        return updatedConvs.sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp));
      });
    };

    socketInstance.on("new-message", handleNewMessage);

    // Listen for online/offline status updates if your socket server emits them
    // socketInstance.on("user-online", (userId) => updateOnlineStatus(userId, true));
    // socketInstance.on("user-offline", (userId) => updateOnlineStatus(userId, false));

    return () => {
      socketInstance.off("new-message", handleNewMessage);
      // socketInstance.off("user-online");
      // socketInstance.off("user-offline");
    };
  }, [socketInstance, currentUser?._id, selectedConversation?.id, dispatch, markMessagesAsRead, fetchConversations]); // Added fetchConversations if called inside

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    if (selectedConversation?.id === conversation.id && messages.length > 0) { // Avoid re-fetch if already selected and messages loaded
        if(conversation.unread > 0) markMessagesAsRead(conversation.id); // Still mark as read if opened with unread
        return;
    }
    setSelectedConversation(conversation);
    fetchMessages(conversation.id); // This will now use Redux or API
  };
  
  // Handle key press for sending message with Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser?._id) return;
  
    try {
      const messageData = {
        sender: currentUser._id,
        receiver: selectedConversation.id,
        message: newMessage,
        timestamp: new Date().toISOString(), // Good to send client timestamp, server can override
      };
      
      socketInstance.emit("message", messageData); // Send message via socket

      // Optimistic update for the sender's own message can be done here
      // OR rely on the server to broadcast it back and the "new-message" listener will pick it up.
      // The current "new-message" listener handles "isOwn" correctly.
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch all users when "+" button is clicked
  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL+'/api/user/all'); 
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
    if (!currentUser?._id) return;
    
    const existingConversation = conversations.find(conv => conv.id === user._id);
    
    if (existingConversation) {
      handleSelectConversation(existingConversation);
    } else {
      // Create a new temporary conversation locally
      const newConversation = {
        id: user._id,
        userId: user._id,
        name: user.name,
        avatar: user.name.charAt(0),
        lastMessage: "Started a new chat", // Placeholder
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lastMessageTimestamp: new Date().toISOString(),
        unread: 0,
        online: user.online || false, // Assuming user object has 'online' status
        pinned: false,
        category: "General"
      };

      // Add to local state and select it.
      // The backend conversation might be created upon the first message.
      setConversations(prev => [newConversation, ...prev].sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)));
      handleSelectConversation(newConversation); 
      // `WorkspaceMessages` will be called for this new conversation. 
      // API will likely return empty array, which is fine.
      // Redux will be updated after the first fetch (with an empty array if no history).
    }
  };

  // Filter conversations based on search query and filter
  const filteredConversations = conversations.filter(conversation => {
    const nameMatch = conversation.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const lastMessageMatch = conversation.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = nameMatch || lastMessageMatch;
    
    const matchesFilter = filter === "All" || 
                          (filter === "Unread" && conversation.unread > 0) ||
                          (filter === "Pinned" && conversation.pinned) ||
                          filter === conversation.category;
    return matchesSearch && matchesFilter;
  });

  const categories = ["All", "Unread", "Pinned"];
  const uniqueCategories = [...new Set(conversations.map(conv => conv.category).filter(Boolean))];
  const filterOptions = [...categories, ...uniqueCategories];

  if (!currentUser?._id && loading) { // Show a general loading screen if user isn't loaded yet
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex min-h-screen max-h-screen overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-amber-100 pr-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <button 
            className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300 text-lg flex items-center justify-center h-10 w-10"
            onClick={fetchUsers}
            aria-label="New Conversation"
          >
            ✚
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
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

        <div className="flex-grow overflow-y-auto">
          {loading && conversations.length === 0 ? ( // Show loading spinner only if conversations are empty
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
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm`}>
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                      )}
                    </div>

                    <div className="ml-3 flex-grow min-w-0"> {/* Added min-w-0 for truncation */}
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 truncate">{conversation.name}</span>
                        <div className="flex items-center flex-shrink-0">
                          {conversation.pinned && <span className="text-amber-500 mr-1 text-xs">📌</span>}
                          <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.time}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="ml-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                            {conversation.unread > 9 ? '9+' : conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && filteredConversations.length === 0 && (
                <div className="text-center py-10">
                  <div className="text-amber-500 text-4xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M12 22V12M12 12L15.5 15.5M12 12L8.5 15.5M12 12V6.5C12 4.01472 14.0147 2 16.5 2C18.9853 2 21 4.01472 21 6.5V17.5C21 19.9853 18.9853 22 16.5 22M12 12V6.5C12 4.01472 9.98528 2 7.5 2C5.01472 2 3 4.01472 3 6.5V17.5C3 19.9853 5.01472 22 7.5 22"/></svg>
                  </div>
                  <h3 className="text-md font-medium text-gray-700">No conversations found</h3>
                  <p className="text-sm text-gray-500 mt-2">Try different search terms or start a new chat.</p>
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
            <div className="flex items-center justify-between py-3 border-b border-amber-100">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="font-medium text-gray-800 truncate">{selectedConversation.name}</h2>
                  <span className="text-xs text-gray-500">
                    {selectedConversation.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200" aria-label="Call">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </button>
                <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200" aria-label="Video Call">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                </button>
                <button className="p-2 rounded-full hover:bg-amber-50 text-amber-600 transition duration-200" aria-label="More options">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto py-4">
              {messagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                </div>
              ) : (
                <>
                  {messages.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="text-amber-500 text-4xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <h3 className="text-md font-medium text-gray-700">No messages yet</h3>
                      <p className="text-sm text-gray-500 mt-2">Start the conversation or say hello!</p>
                    </div>
                  ) : (
                    messages.map((message) => ( // Removed index as key, use message.id
                      <div 
                        key={message.id}
                        className={`mb-4 flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        {!message.isOwn && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold mr-2 mt-1 flex-shrink-0">
                            {/* Use selectedConversation.avatar for partner, or message.senderAvatar if available */}
                            {selectedConversation.avatar} 
                          </div>
                        )}
                        <div 
                          className={`max-w-[70%] rounded-lg px-3 py-2 shadow-sm ${ // Adjusted padding
                            message.isOwn 
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm break-words">{message.content}</p> {/* Ensure long words break */}
                          <span 
                            className={`text-xs mt-1 self-end block text-right ${ // Ensure time is on new line if needed and aligned
                              message.isOwn ? "text-amber-200" : "text-gray-500"
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="border-t border-amber-100 pt-4">
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  className="p-2 rounded-full text-amber-500 hover:bg-amber-50 transition duration-200"
                  aria-label="Attach file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={messagesLoading || !selectedConversation}
                />
                <button 
                  onClick={sendMessage}
                  className={`p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300 h-10 w-10 flex items-center justify-center ${
                    (!newMessage.trim() || messagesLoading || !selectedConversation) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!newMessage.trim() || messagesLoading || !selectedConversation}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <div className="text-amber-500 text-6xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M17 9 দূত1-7-7 7"></path><path d="M7 17l4-4"></path><path d="M14 10l-4 4"></path><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8c-.5 1.3-1.2 2.4-2.1 3.2a8.57 8.57 0 0 1-3.2 2.1 8.38 8.38 0 0 1-3.8.9A8.38 8.38 0 0 1 7.2 21a8.57 8.57 0 0 1-3.2-2.1A8.38 8.38 0 0 1 3 15.2a8.38 8.38 0 0 1 .9-3.8 8.57 8.57 0 0 1 2.1-3.2A8.38 8.38 0 0 1 9.8 3a8.38 8.38 0 0 1 3.8-.9c1.3.1 2.6.5 3.8.9a8.57 8.57 0 0 1 3.2 2.1 8.38 8.38 0 0 1 .9 3.8z"></path></svg>
            </div>
            <h2 className="text-xl font-medium text-gray-700">Select a conversation</h2>
            <p className="text-gray-500 mt-2">Choose a contact from the sidebar to start messaging or create a new chat.</p>
          </div>
        )}
      </div>

      {/* User Selection Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Start a New Chat</h2>
              <button
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
                onClick={() => setIsUserModalOpen(false)}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No other users found to start a new chat.</p>
            ) : (
              <div className="space-y-2 overflow-y-auto">
                {users.map(user => (
                  <div
                    key={user._id}
                    className="flex items-center p-3 rounded-lg hover:bg-amber-50 cursor-pointer"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
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

// Helper CSS for no-scrollbar (if not using Tailwind plugin)
// Add this to your global CSS or a style tag if needed:
// .no-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// .no-scrollbar {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }