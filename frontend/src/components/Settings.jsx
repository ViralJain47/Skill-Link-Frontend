import React, { useState } from "react";
import { 
  FaCog, 
  FaBell, 
  FaLock, 
  FaUser, 
  FaGlobe, 
  FaCalendarAlt, 
  FaToggleOn, 
  FaToggleOff,
  FaSave,
  FaCheckCircle
} from "react-icons/fa";

function Settings() {
  // State for various settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    upcomingWebinars: true,
    recommendedWebinars: true,
    webinarReminders: true,
    marketingEmails: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    shareActivity: false,
    publicBookmarks: false
  });
  
  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
    highContrast: false
  });
  
  const [timeZone, setTimeZone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [language, setLanguage] = useState("en-US");
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("notifications");
  
  // State for save confirmation
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  
  // Handle toggle switches
  const handleToggle = (category, setting) => {
    const setStateMap = {
      notifications: setNotificationSettings,
      privacy: setPrivacySettings,
      display: setDisplaySettings
    };
    
    setStateMap[category]((prevState) => ({
      ...prevState,
      [setting]: !prevState[setting]
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveConfirmation(true);
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowSaveConfirmation(false);
    }, 3000);
  };
  
  // Toggle component
  const ToggleSwitch = ({ isOn, handleToggle }) => {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className="focus:outline-none"
        aria-pressed={isOn}
      >
        {isOn ? (
          <FaToggleOn className="text-amber-500-600 text-2xl" />
        ) : (
          <FaToggleOff className="text-gray-400 text-2xl" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <FaCog className="text-blue-600 text-2xl mr-3" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      {/* Settings tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {["notifications", "privacy", "account", "display"].map((tab) => (
          <button
            key={tab}
            className={`pb-4 px-6 relative whitespace-nowrap ${activeTab === tab 
              ? "text-blue-600 font-medium border-b-2 border-blue-600" 
              : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab(tab)}
          >
            <div className="flex items-center gap-2">
              {tab === "notifications" && <FaBell />}
              {tab === "privacy" && <FaLock />}
              {tab === "account" && <FaUser />}
              {tab === "display" && <FaGlobe />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </div>
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Notifications Tab Content */}
        {activeTab === "notifications" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
            {Object.keys(notificationSettings).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 border rounded-lg mb-4"
              >
                <div>
                  <h3 className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-sm text-gray-500">Enable or disable {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}</p>
                </div>
                <ToggleSwitch 
                  isOn={notificationSettings[key]} 
                  handleToggle={() => handleToggle("notifications", key)}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Privacy Tab Content */}
        {activeTab === "privacy" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
            {Object.keys(privacySettings).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 border rounded-lg mb-4"
              >
                <div>
                  <h3 className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-sm text-gray-500">Enable or disable {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}</p>
                </div>
                <ToggleSwitch 
                  isOn={privacySettings[key]} 
                  handleToggle={() => handleToggle("privacy", key)}
                />
              </div>
            ))}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">Data Privacy</h3>
              <p className="text-gray-700 mb-4">You can request a copy of your data or delete your account at any time.</p>
              <div className="flex gap-3">
                <button 
                  type="button"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Request Data Copy
                </button>
                <button 
                  type="button"
                  className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Account Tab Content */}
        {activeTab === "account" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {["Full Name", "Email Address", "Department"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                  <input
                    type="text"
                    defaultValue={field === "Full Name" ? "John Doe" : field === "Email Address" ? "john.doe@example.com" : "Computer Science"}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="alumni">Alumni</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <h2 className="text-lg font-medium mb-4">Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {["Current Password", "New Password", "Confirm New Password"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                  <input
                    type="password"
                    placeholder={field}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display & Language Tab Content */}
        {activeTab === "display" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Display Settings</h2>
            {Object.keys(displaySettings).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 border rounded-lg mb-4"
              >
                <div>
                  <h3 className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <p className="text-sm text-gray-500">Enable or disable {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}</p>
                </div>
                <ToggleSwitch 
                  isOn={displaySettings[key]} 
                  handleToggle={() => handleToggle("display", key)}
                />
              </div>
            ))}
            <h2 className="text-lg font-medium mb-4">Language & Region</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                  <option value="zh-CN">Chinese (Simplified)</option>
                  <option value="ja-JP">Japanese</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select
                  id="timezone"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  <option value="Europe/Paris">Central European Time (CET)</option>
                  <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                <select
                  id="dateFormat"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 text-xs p-2 rounded-md">
                  <FaCalendarAlt className="inline-block mr-1" />
                  Webinar times will be displayed in your local time zone.
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Save button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <FaSave />
            <span>Save Settings</span>
          </button>
        </div>
        
        {/* Save confirmation message */}
        {showSaveConfirmation && (
          <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md flex items-center">
            <FaCheckCircle className="mr-2" />
            Settings have been saved successfully.
          </div>
        )}
      </form>
    </div>
  );
}

export default Settings;
