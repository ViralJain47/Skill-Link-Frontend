import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Sidebar({className}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-md relative h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-amber-400">SkillLink</h1>
        </div>
        <nav className="mt-6">
          {[{name: 'dashboard', slug: '/'}, {name: 'my skills', slug: '/my-skills'}, {name: 'messages', slug: '/messages'}, {name: 'sessions', slug: '/sessions'}, {name: 'events', slug: '/events'}, {name: 'resources', slug: '/resources'}, {name: 'community', slug: '/community'}, {name: 'settings', slug: '/settings'}].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name)
                navigate(item.slug)
              }}
              className={`w-full text-left px-6 py-3 flex items-center ${
                activeTab === item.name ? 'bg-amber-50 text-amber-700 border-r-4 border-amber-500' : 'text-gray-500 hover:bg-amber-50'
              }`}
            >
              <span className="ml-2 capitalize">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
  )
}

export default Sidebar
