
import React, { useState } from 'react';
import { CampEvent } from '../types';
import Card from './ui/Card';
import EventCard from './EventCard';
import Button from './ui/Button';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/HeroIcons';

interface EventCalendarProps {
  events: CampEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [showPastEvents, setShowPastEvents] = useState(false);

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date() && !event.report);
  const pastEvents = events.filter(event => new Date(event.date) < new Date() || !!event.report);

  const eventsToShow = showPastEvents ? pastEvents : upcomingEvents;
  const title = showPastEvents ? "পূর্ববর্তী ইভেন্ট ও ক্যাম্পেইন" : "আসন্ন ইভেন্ট ও ক্যাম্পেইন";

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-700 mb-4 sm:mb-0 flex items-center">
            <CalendarDaysIcon className="w-8 h-8 mr-3 text-red-600" />
            {title}
          </h2>
          <Button 
            onClick={() => setShowPastEvents(!showPastEvents)}
            variant="outline"
            leftIcon={showPastEvents ? <ChevronLeftIcon className="w-5 h-5" /> : undefined}
            rightIcon={!showPastEvents ? <ChevronRightIcon className="w-5 h-5" /> : undefined}
          >
            {showPastEvents ? 'আসন্ন ইভেন্ট দেখুন' : 'পূর্ববর্তী ইভেন্ট দেখুন'}
          </Button>
        </div>
        
        {eventsToShow.length > 0 ? (
          <div className="space-y-6">
            {eventsToShow.map(event => (
              <EventCard key={event.id} event={event} isPastEvent={showPastEvents} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <CalendarDaysIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">
              {showPastEvents ? 'কোনো পূর্ববর্তী ইভেন্টের তথ্য নেই।' : 'বর্তমানে কোনো আসন্ন ইভেন্ট নেই।'}
            </p>
            <p className="text-sm text-gray-500 mt-2">অনুগ্রহ করে পরবর্তীতে আবার দেখুন।</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EventCalendar;
