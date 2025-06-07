
import React, { useState, useCallback, useEffect } from 'react';
import { Donor, BloodRequest, CampEvent, View, AwarenessInfo } from './types';
import { APP_TITLE, NAVIGATION_ITEMS, MOCK_RECENT_ACTIVITIES, MOCK_EVENTS, MOCK_AWARENESS_INFO, INITIAL_DONORS, INITIAL_BLOOD_REQUESTS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import DonorRegistrationForm from './components/DonorRegistrationForm';
import BloodRequestForm from './components/BloodRequestForm';
import DonorSearch from './components/DonorSearch';
import EventCalendar from './components/EventCalendar';
import AwarenessSection from './components/AwarenessSection';
import ContactSection from './components/ContactSection';
import ActiveRequestsList from './components/ActiveRequestsList'; // Added for displaying active requests

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(INITIAL_BLOOD_REQUESTS);
  const [events, setEvents] = useState<CampEvent[]>(MOCK_EVENTS);
  const [awarenessInfo, setAwarenessInfo] = useState<AwarenessInfo[]>(MOCK_AWARENESS_INFO);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    setShowMobileMenu(false); // Close mobile menu on navigation
    window.scrollTo(0, 0); // Scroll to top on view change
  }, []);

  const handleAddDonor = useCallback((donor: Omit<Donor, 'id'>) => {
    setDonors(prevDonors => [...prevDonors, { ...donor, id: Date.now().toString() }]);
    alert('রক্তদাতা হিসেবে আপনার নিবন্ধন সফল হয়েছে!');
    handleNavigate('findDonor');
  }, [handleNavigate]);

  const handleAddBloodRequest = useCallback((request: Omit<BloodRequest, 'id' | 'postedDate' | 'isFulfilled'>) => {
    setBloodRequests(prevRequests => [
      { ...request, id: Date.now().toString(), postedDate: new Date().toISOString(), isFulfilled: false },
      ...prevRequests 
    ]);
    alert('আপনার রক্তের আবেদন সফলভাবে জমা হয়েছে!');
    handleNavigate('home'); // Navigate to home to see the request or a dedicated list
  }, [handleNavigate]);

  const handleToggleRequestFulfilled = useCallback((requestId: string) => {
    setBloodRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, isFulfilled: !req.isFulfilled } : req
      )
    );
  }, []);
  
  // Effect to log API_KEY presence for debugging purposes, will not be used in UI
  useEffect(() => {
    if (process.env.API_KEY) {
      console.log("Gemini API Key is available.");
    } else {
      console.warn("Gemini API Key is not set in environment variables.");
    }
  }, []);


  const renderView = () => {
    const activeBloodRequests = bloodRequests.filter(req => !req.isFulfilled);
    switch (currentView) {
      case 'home':
        return <HomePage 
                  onNavigate={handleNavigate} 
                  emergencyRequests={activeBloodRequests} 
                  recentActivities={MOCK_RECENT_ACTIVITIES} 
                  onToggleRequestFulfilled={handleToggleRequestFulfilled}
                />;
      case 'registerDonor':
        return <DonorRegistrationForm onSubmit={handleAddDonor} />;
      case 'requestBlood':
        return <BloodRequestForm onSubmit={handleAddBloodRequest} />;
      case 'findDonor':
        return <DonorSearch donors={donors} />;
      case 'events':
        return <EventCalendar events={events} />;
      case 'awareness':
        return <AwarenessSection awarenessInfo={awarenessInfo} />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomePage 
                  onNavigate={handleNavigate} 
                  emergencyRequests={activeBloodRequests} 
                  recentActivities={MOCK_RECENT_ACTIVITIES}
                  onToggleRequestFulfilled={handleToggleRequestFulfilled}
                />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex flex-col text-gray-700">
      <Navbar 
        navItems={NAVIGATION_ITEMS} 
        onNavigate={handleNavigate} 
        currentView={currentView}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        appName={APP_TITLE} 
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        {renderView()}
      </main>
      <Footer appName={APP_TITLE} />
    </div>
  );
};

export default App;
