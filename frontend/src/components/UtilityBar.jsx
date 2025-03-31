import React from 'react'

function UtilityBar() {
  return (
    <header className="bg-white shadow-sm p-4">
          <div className="flex justify-around items-center gap-20">
            <div className="w-full">
              <div className="relative w-full">
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
  )
}

export default UtilityBar
