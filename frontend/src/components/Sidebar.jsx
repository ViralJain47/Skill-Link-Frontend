import React, { useState } from 'react'

function Sidebar({className}) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
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
  )
}

export default Sidebar
