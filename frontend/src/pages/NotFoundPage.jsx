import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50">
      <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100 max-w-lg w-full text-center">
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl text-white">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist in the Skill Link universe.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
              Return to Dashboard
            </button>
          </Link>
          
          <div className="flex gap-4">
            <Link to="/events" className="flex-1">
              <button className="w-full px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
                Browse Events
              </button>
            </Link>
            <Link to="/my-skills" className="flex-1">
              <button className="w-full px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300">
                My Skills
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-amber-100">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 shadow-sm text-center w-24">
              <h3 className="text-xs font-medium text-amber-700">Learning</h3>
              <p className="text-xl font-bold text-amber-800">4</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200 shadow-sm text-center w-24">
              <h3 className="text-xs font-medium text-orange-700">Teaching</h3>
              <p className="text-xl font-bold text-orange-800">2</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-3 rounded-lg border border-rose-200 shadow-sm text-center w-24">
              <h3 className="text-xs font-medium text-rose-700">Connections</h3>
              <p className="text-xl font-bold text-rose-800">7</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? <Link to="/contact" className="text-amber-600 hover:text-amber-800">Contact Support</Link>
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;