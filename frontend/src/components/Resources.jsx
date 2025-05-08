import React, { useState } from "react";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample categories
  const categories = ["All", "Web Development", "Design", "Data Science", "Programming", "Marketing"];

  // Sample articles data
  const articlesData = [
    {
      id: 1,
      title: "Modern React Hooks: Best Practices for 2025",
      author: "Alex Chen",
      category: "Web Development",
      rating: 4.8,
      image: "/api/placeholder/240/135",
      readTime: "8 min",
      publishDate: "May 2, 2025",
      isBookmarked: true,
      isPremium: false,
    },
    {
      id: 2,
      title: "UI/UX Design Trends to Watch in 2025",
      author: "Priya Sharma",
      category: "Design",
      rating: 4.6,
      image: "/api/placeholder/240/135",
      readTime: "12 min",
      publishDate: "Apr 28, 2025",
      isBookmarked: false,
      isPremium: false,
    },
    {
      id: 3,
      title: "Data Visualization Techniques for Complex Datasets",
      author: "Miguel Santos",
      category: "Data Science",
      rating: 4.7,
      image: "/api/placeholder/240/135",
      readTime: "15 min",
      publishDate: "Apr 25, 2025",
      isBookmarked: true,
      isPremium: true,
    },
    {
      id: 4,
      title: "Python Tips and Tricks for Efficient Coding",
      author: "Yug Shrivastava",
      category: "Programming",
      rating: 4.9,
      image: "/api/placeholder/240/135",
      readTime: "10 min",
      publishDate: "Apr 20, 2025",
      isBookmarked: false,
      isPremium: false,
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox: When to Use Each",
      author: "Viral Jain",
      category: "Web Development",
      rating: 4.5,
      image: "/api/placeholder/240/135",
      readTime: "7 min",
      publishDate: "Apr 18, 2025",
      isBookmarked: true,
      isPremium: false,
    },
    {
      id: 6,
      title: "Digital Marketing Strategies for Tech Products",
      author: "Vansh Dubey",
      category: "Marketing",
      rating: 4.4,
      image: "/api/placeholder/240/135",
      readTime: "9 min",
      publishDate: "Apr 15, 2025",
      isBookmarked: false,
      isPremium: true,
    },
  ];

  // Filter articles based on selected category and search query
  const filteredArticles = articlesData.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to toggle bookmark
  const toggleBookmark = (id) => {
    // In a real app, you would update this in your state management system
    console.log(`Toggled bookmark for resource ${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Learning Articles</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300">
          Submit Article
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-amber-500">
            🔍
          </div>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id}
            className="border border-amber-100 rounded-xl overflow-hidden hover:shadow-md transition duration-300 hover:scale-102"
          >
            <div className="relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-36 object-cover"
              />
              <div 
                className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-50"
                onClick={() => toggleBookmark(article.id)}
              >
                {article.isBookmarked ? 
                  <span className="text-amber-500">★</span> : 
                  <span className="text-amber-300">☆</span>
                }
              </div>
              {article.isPremium && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-md">
                  Premium
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="px-2 py-0.5 bg-amber-500/80 text-white text-xs rounded-md">
                  {article.readTime} read
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-amber-800 line-clamp-2">{article.title}</h3>
                <div className="flex items-center ml-2 whitespace-nowrap">
                  <span className="text-amber-500 mr-1">⭐</span>
                  <span className="text-sm text-gray-700">{article.rating}</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 items-center">
                <span className="text-gray-600 text-sm">By {article.author}</span>
                <span className="text-gray-500 text-xs">{article.publishDate}</span>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {article.category}
                </span>
                <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                  {article.isPremium ? "Unlock" : "Read"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center py-10">
          <div className="text-amber-500 text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-700">No articles found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Featured Article Collections */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Article Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition duration-300">
            <h3 className="font-medium text-amber-800">Web Development Fundamentals</h3>
            <p className="text-sm text-gray-600 mt-1">Essential articles for modern web development</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">8 articles</span>
              <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                View Collection
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition duration-300">
            <h3 className="font-medium text-rose-800">UI/UX Design Principles</h3>
            <p className="text-sm text-gray-600 mt-1">Articles on design thinking and best practices</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">6 articles</span>
              <button className="px-3 py-1 border border-rose-500 text-rose-600 text-sm rounded-md hover:bg-rose-50 transition duration-300">
                View Collection
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition duration-300">
            <h3 className="font-medium text-blue-800">Data Science Insights</h3>
            <p className="text-sm text-gray-600 mt-1">Deep dives into data analysis techniques</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">7 articles</span>
              <button className="px-3 py-1 border border-blue-500 text-blue-600 text-sm rounded-md hover:bg-blue-50 transition duration-300">
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Authors */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Authors</h2>
        <div className="flex flex-wrap gap-4">
          {["Alex Chen", "Priya Sharma", "Miguel Santos", "Viral Jain", "Vansh Dubey"].map((author, index) => (
            <div key={index} className="flex items-center bg-amber-50 rounded-full px-4 py-2 border border-amber-200 hover:bg-amber-100 transition duration-300">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold mr-2">
                {author.charAt(0)}
              </div>
              <span className="text-amber-800">{author}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center mx-auto">
          Browse all articles <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default Resources;