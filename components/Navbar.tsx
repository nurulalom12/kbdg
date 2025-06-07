
import React from 'react';
import { NavItem, View } from '../types';
import { Bars3Icon, XMarkIcon, SunIcon } from './icons/HeroIcons'; // Assuming SunIcon for logo placeholder

interface NavbarProps {
  navItems: NavItem[];
  onNavigate: (view: View) => void;
  currentView: View;
  appName: string;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, onNavigate, currentView, appName, showMobileMenu, setShowMobileMenu }) => {
  return (
    <nav className="bg-red-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onNavigate('home')}
            aria-label="হোমপেজে যান"
          >
            <SunIcon className="h-10 w-10 text-white mr-3" /> {/* Placeholder Logo */}
            <span className="text-white text-2xl font-bold tracking-tight">{appName}</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                    ${currentView === item.view 
                      ? 'bg-red-700 text-white shadow-inner' 
                      : 'text-red-100 hover:bg-red-500 hover:text-white'
                    }`}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-red-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2 rounded-md"
              aria-label={showMobileMenu ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={showMobileMenu}
            >
              {showMobileMenu ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-red-600 border-t border-red-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`w-full text-left flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 ease-in-out
                    ${currentView === item.view 
                      ? 'bg-red-700 text-white' 
                      : 'text-red-100 hover:bg-red-500 hover:text-white'
                    }`}
                >
                  {IconComponent && <IconComponent className="w-6 h-6 mr-3" />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
