import { FC } from 'react';
import { Search, Bell, User } from 'lucide-react';

export const DashboardHeader: FC = () => {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-white border-b border-gray-100">
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-64"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-50 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-full">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Profile</span>
        </button>
      </div>
    </header>
  );
}; 