import React, { useState } from 'react'
import { FaCalendarAlt, FaClock, FaTimes, FaUser } from 'react-icons/fa';

function SessionForm({ isOpen, onClose, onSubmit, mode }) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        duration: 60,
        date: "",
        time: "",
        participantsLimit: 10,
    });

    const [image, setImage] = useState({});

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        const dateTime = new Date(`${formData.date}T${formData.time}`);
        
        const submitData = {
          ...formData,
          date: dateTime.toISOString(),
          media: image
        };
        
        delete submitData.time;
        
        onSubmit(submitData);
      };

    if(!isOpen) return null;
    return (
        <div className='fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
                <div className='border-b border-amber-100 px-6 py-4 flex justify-between items-center'>
                    <h3 className='text-xl font-bold text-gray-800'>Host New Session</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2">Session Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                 className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="Enter session title"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                 className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                rows="4"
                                placeholder='Enter session details'
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className='block text-gray-700 font-medium mb-2'>Category</label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                value={formData.category}
                                onChange={(e) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        category: e.target.value,
                                    }));
                                }}
                                required
                                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="e.g., Web Development, System Design, etc."
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="title"
                            >
                                Image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaCalendarAlt className="text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Time</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaClock className="text-gray-400" />
                                </div>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                min="15"
                                step="15"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Max Participants</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.participantsLimit}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
                        >
                            {mode === 'host' ? 'Host Session' : "Update Session"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SessionForm