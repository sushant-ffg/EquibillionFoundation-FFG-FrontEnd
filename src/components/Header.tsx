import React from 'react';
import { Menu, ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
type HeaderProps = {
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  sidebarCollapsed: boolean;
};
export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  toggleMobileMenu,
  sidebarCollapsed
}) => {
  const {
    user
  } = useAuth();
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Open sidebar">
            <Menu size={24} />
          </button>
          <button onClick={toggleSidebar} className="hidden md:block text-gray-500 hover:text-gray-700 focus:outline-none ml-1" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div className="ml-4 md:ml-6">
            <h1 className="text-lg font-semibold text-[#111827]">
              Equibillion Foundation
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="ml-3 relative">
            <div className="flex items-center">
              <div className="ml-3 mr-2">
                <p className="text-sm font-medium text-[#111827]">
                  {user?.name}
                </p>
                <p className="text-xs text-[#374151]">
                  {user?.role === 'super_admin' ? 'Super Admin' : 'Corporate Admin'}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={20} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};