
import React from 'react';
import { View, BloodRequest } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { MOCK_RECENT_ACTIVITIES } from '../constants';
import ActiveRequestsList from './ActiveRequestsList';
import { ArrowRightIcon, GiftIcon, UsersIcon } from './icons/HeroIcons';

interface RecentActivity {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

interface HomePageProps {
  onNavigate: (view: View) => void;
  emergencyRequests: BloodRequest[];
  recentActivities: RecentActivity[];
  onToggleRequestFulfilled: (requestId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, emergencyRequests, recentActivities, onToggleRequestFulfilled }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-2xl text-white">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">খানসামা রক্তদান গ্রুপে স্বাগতম</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto font-light">
          আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি জীবন। রক্ত দিন, জীবন বাঁচান। খানসামা উপজেলায় রক্তদাতা ও গ্রহীতাদের মেলবন্ধন।
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            onClick={() => onNavigate('registerDonor')} 
            className="bg-white text-red-600 hover:bg-gray-100"
            leftIcon={<GiftIcon className="w-5 h-5"/>}
          >
            রক্তদাতা হোন
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => onNavigate('requestBlood')} 
            className="border-white text-white hover:bg-white hover:text-red-600"
            leftIcon={<UsersIcon className="w-5 h-5"/>}
          >
            রক্তের আবেদন করুন
          </Button>
        </div>
      </section>

      {/* About Us Snippet */}
      <section>
        <Card className="p-8">
            <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <img src="https://picsum.photos/seed/aboutus/500/300" alt="আমাদের টিম" className="rounded-lg shadow-md w-full" />
                </div>
                <div className="text-gray-600 space-y-4 text-lg">
                    <p>
                        খানসামা রক্তদান গ্রুপ একটি সম্পূর্ণ অলাভজনক, স্বেচ্ছাসেবী সংগঠন। আমাদের প্রধান লক্ষ্য খানসামা উপজেলার রক্তদাতা এবং রক্তগ্রহীতাদের মধ্যে একটি নির্ভরযোগ্য সেতুবন্ধন তৈরি করা।
                    </p>
                    <p>
                        আমরা রক্তদানের গুরুত্ব সম্পর্কে সচেতনতা বৃদ্ধি, স্বেচ্ছাসেবকদের সংগঠিত করা এবং জরুরি রক্তের চাহিদা দ্রুততম সময়ে মেটানোর জন্য কাজ করে যাচ্ছি। আমাদের এই উদ্যোগে আপনার অংশগ্রহণ একান্ত কাম্য।
                    </p>
                     <Button onClick={() => onNavigate('awareness')} variant="primary" className="mt-4" rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
                        আরও জানুন
                    </Button>
                </div>
            </div>
        </Card>
      </section>


      {/* Emergency Blood Requests */}
      <section>
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">জরুরি রক্তের চাহিদা</h2>
        {emergencyRequests.length > 0 ? (
          <ActiveRequestsList requests={emergencyRequests} onToggleFulfilled={onToggleRequestFulfilled} />
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-600 text-lg">বর্তমানে কোনো জরুরি রক্তের চাহিদা নেই।</p>
          </Card>
        )}
      </section>

      {/* Recent Activities */}
      <section>
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">সাম্প্রতিক কার্যক্রম</h2>
        {recentActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentActivities.map(activity => (
              <Card key={activity.id} className="flex flex-col">
                <img src={activity.imageUrl} alt={activity.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">{activity.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{activity.date}</p>
                  <p className="text-gray-700 text-sm mb-4 flex-grow">{activity.description}</p>
                   <Button onClick={() => onNavigate('events')} variant="outline" size="sm" className="mt-auto self-start">
                    বিস্তারিত
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
           <Card className="p-6 text-center">
             <p className="text-gray-600">সাম্প্রতিক কোনো কার্যক্রমের তথ্য এখনো যুক্ত করা হয়নি।</p>
           </Card>
        )}
      </section>
    </div>
  );
};

export default HomePage;
