import { useState } from "react";
import { X, Home, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminBottomBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fff] border-t border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-">
            {/* Dashboard */}
            <Link to="/" className="flex flex-col items-center group py-2">
              <Home className="w-6 h-6 sm:w-8 sm:h-8 text-[#b39c2a]" />
              <span className="text-xs sm:text-sm font-semibold text-black">Dashboard</span>
            </Link>

            {/* Users */}
            <Link to="/admin/users" className="flex flex-col items-center group py-2">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#b39c2a]" />
              <span className="text-xs sm:text-sm font-semibold text-black">Users</span>
            </Link>

            {/* Requests */}
            <Link to="/admin/requests" className="flex flex-col items-center group py-2">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#b39c2a]" />
              <span className="text-xs sm:text-sm font-semibold text-black">Requests</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="w-64 bg-gray-800 text-white h-full p-5 shadow-lg">
          <button className="mb-5 text-right w-full" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6 inline-block" />
          </button>

          <nav className="space-y-4">
            <Link to="/" className="block text-[#b39c2a] font-semibold hover:text-gray-300">Dashboard</Link>
            <Link to="/admin/users" className="block text-[#b39c2a] font-semibold hover:text-gray-300">Users</Link>
            <Link to="/admin/requests" className="block text-[#b39c2a] font-semibold hover:text-gray-300">Requests</Link>
          </nav>
        </div>

        {/* Overlay */}
        <div className="flex-1 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
      </div>
    </>
  );
}
