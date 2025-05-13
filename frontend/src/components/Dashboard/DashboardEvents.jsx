import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import placeholder from "../../assets/placeholder.png"
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import EventModal from "./EventModal";
import { useSelector } from "react-redux";

function DashboardEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'

  const user = useSelector((state) => state.auth.userData);

  const eventsRef = useRef(null);
  const eventsInView = useInView(eventsRef, { once: true });

  // Animation variants
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
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
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new event
  const handleCreateEvent = async (eventData) => {
    eventData.host = user._id;
    try {
      console.log(eventData.media)
      const formData = new FormData()
      formData.append('title', eventData.title)
      formData.append('description', eventData.description)
      formData.append('date', eventData.date)
      formData.append('time', eventData.time)
      formData.append('duration', eventData.duration)
      formData.append('venue', eventData.venue)
      formData.append('type', eventData.type)
      formData.append('maxParticipants', eventData.maxParticipants)
      formData.append('minParticipants', eventData.minParticipants)
      formData.append('registrationFee', eventData.registrationFee)
      formData.append('status', eventData.status)
      formData.append('host', eventData.host)
      
      for(let image of eventData.media)
      {
        formData.append('media', image)
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/event/create",
        formData,
        {
          headers : {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      fetchEvents();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error(err);
    }
  };

  // Update an existing event
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

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/event/delete/${eventId}`
        );
        fetchEvents();
      } catch (err) {
        setError("Failed to delete event. Please try again.");
        console.error(err);
      }
    }
  };

  // Open modal for creating a new event
  const openCreateModal = () => {
    setCurrentEvent(null);
    setModalMode("create");
    setShowModal(true);
  };

  // Open modal for editing an event
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setModalMode("edit");
    setShowModal(true);
  };

  // Get category color based on event type
  const getCategoryColor = (type) => {
    const typeMap = {
      Workshop: "blue",
      Networking: "purple",
      "Guest Lecture": "emerald",
      "Career Fair": "orange",
      Seminar: "red",
      Conference: "indigo",
      Hackathon: "pink",
    };
    return typeMap[type] || "gray";
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Get placeholder image based on event type
  const getEventImage = (type) => {
    const typeMap = {
      Workshop: "/api/placeholder/400/200",
      Networking: "/api/placeholder/400/200",
      "Guest Lecture": "/api/placeholder/400/200",
      "Career Fair": "/api/placeholder/400/200",
      Seminar: "/api/placeholder/400/200",
    };
    return typeMap[type] || "/api/placeholder/400/200";
  };

  return (
    <section id="events" className="min-h-screen bg-gray-50 py-20">
      <motion.div
        ref={eventsRef}
        className="container mx-auto px-6"
        initial="hidden"
        animate={eventsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-center mb-16"
          variants={fadeInUp}
        >
          <div className="p-3 rounded-full bg-emerald-100 mb-6">
            <FaCalendarAlt className="text-amber-600 text-3xl" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Upcoming Events
          </h3>
          <p className="text-gray-600 mt-4 max-w-2xl text-center">
            Join us for these exciting opportunities to learn, connect, and grow
            with fellow students and industry experts.
          </p>
          <div className="w-24 h-1 bg-amber-500 mt-6 rounded-full"></div>
        </motion.div>

        {/* Create Event Button */}
        <motion.div className="mb-8 flex justify-end" variants={fadeInUp}>
          <button
            onClick={openCreateModal}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center"
          >
            <FaPlus className="mr-2" /> Create Event
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            variants={fadeInUp}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <motion.div className="flex justify-center py-12" variants={fadeInUp}>
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Events Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    variants={fadeInUp}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={ event.media[0] ? `${import.meta.env.VITE_API_URL}${event.media?.[0]}` || getEventImage(event.type): placeholder}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute top-4 left-4 bg-${getCategoryColor(
                          event.type
                        )}-600 text-white rounded-lg px-3 py-1 text-sm font-medium`}
                      >
                        {event.type || "Event"}
                      </div>
                      <div
                        className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-${getCategoryColor(
                          event.type
                        )}-700 rounded-lg px-3 py-1 text-sm font-bold`}
                      >
                        {formatDate(event.date)}
                      </div>

                      {/* Admin controls */}
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <button
                          onClick={() => openEditModal(event)}
                          className="bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex items-center text-gray-500 mb-6">
                        <FaClock className="mr-2" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          ({event.duration} mins)
                        </span>
                        <div className="mx-3 w-1 h-1 rounded-full bg-gray-400"></div>
                        <FaMapMarkerAlt className="mr-2" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {event.participants &&
                          event.participants.length > 0 ? (
                            <>
                              {event.participants
                                .slice(0, 2)
                                .map((participant, index) => (
                                  <div
                                    key={index}
                                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                                  >
                                    <img
                                      src={
                                        participant.avatar ||
                                        "/api/placeholder/50/50"
                                      }
                                      alt={participant.displayName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              {event.participants.length > 2 && (
                                <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-xs text-emerald-700 font-bold border-2 border-white">
                                  +{event.participants.length - 2}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">
                              No participants yet
                            </div>
                          )}
                        </div>
                        <button
                          className={`bg-${getCategoryColor(
                            event.type
                          )}-50 hover:bg-${getCategoryColor(
                            event.type
                          )}-100 text-${getCategoryColor(
                            event.type
                          )}-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300`}
                        >
                          {event.registrationFee > 0
                            ? `Register (₹${event.registrationFee})`
                            : "RSVP"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-12 text-gray-500"
                variants={fadeInUp}
              >
                No events found. Create your first event!
              </motion.div>
            )}
          </>
        )}

        {/* View All Events Link */}
        <motion.div className="mt-12 text-center" variants={fadeInUp}>
          <a
            href="#all-events"
            className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
          >
            View all events
            <FaArrowRight className="ml-2" />
          </a>
        </motion.div>
      </motion.div>

      {/* Event Modal Component */}
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
    </section>
  );
}

export default DashboardEvents;
