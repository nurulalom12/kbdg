
import React, { useState } from 'react';
import Button from './ui/Button';
import InputField from './ui/InputField';
import TextAreaField from './ui/TextAreaField';
import Card from './ui/Card';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ChatBubbleLeftEllipsisIcon } from './icons/HeroIcons';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log({ name, email, subject, message });
    setIsSubmitted(true);
    setName(''); setEmail(''); setSubject(''); setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000); // Reset message after 5 seconds
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center">
          <PhoneIcon className="w-8 h-8 mr-3 text-red-600" />
          যোগাযোগ ও সহায়তা
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">আমাদের সাথে যোগাযোগ করুন</h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start">
                <MapPinIcon className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" />
                <span>প্রধান কার্যালয়: খানসামা বাজার, খানসামা, দিনাজপুর।</span>
              </p>
              <p className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3 text-red-500" />
                হেল্পলাইন: <a href="tel:+8801XXXXXXXXX" className="text-red-600 hover:underline ml-1">+৮৮০১xxxxxxxxx</a>
              </p>
              <p className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-3 text-red-500" />
                ইমেইল: <a href="mailto:info@khansamablood.org" className="text-red-600 hover:underline ml-1">info@khansamablood.org</a>
              </p>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-800 mb-2">সোশ্যাল মিডিয়াতে আমরা</h4>
              <div className="flex space-x-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">ফেসবুক</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">টুইটার</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">ইনস্টাগ্রাম</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">আপনার বার্তা পাঠান</h3>
            {isSubmitted ? (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center">
                <p>আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField id="contactName" label="আপনার নাম" value={name} onChange={e => setName(e.target.value)} required placeholder="আপনার সম্পূর্ণ নাম"/>
                <InputField id="contactEmail" label="আপনার ইমেইল" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your.email@example.com"/>
                <InputField id="contactSubject" label="বিষয়" value={subject} onChange={e => setSubject(e.target.value)} required placeholder="আপনার বার্তার বিষয়"/>
                <TextAreaField id="contactMessage" label="আপনার বার্তা" value={message} onChange={e => setMessage(e.target.value)} required placeholder="বিস্তারিত লিখুন..."/>
                <Button type="submit" variant="primary" className="w-full" leftIcon={<ChatBubbleLeftEllipsisIcon className="w-5 h-5"/>}>
                  বার্তা পাঠান
                </Button>
              </form>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactSection;
