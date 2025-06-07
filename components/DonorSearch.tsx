
import React, { useState, useMemo } from 'react';
import { Donor, BloodGroup } from '../types';
import { BLOOD_GROUP_OPTIONS } from '../constants';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';
import Card from './ui/Card';
import DonorCard from './DonorCard';
import { MagnifyingGlassIcon, UserGroupIcon } from './icons/HeroIcons';

interface DonorSearchProps {
  donors: Donor[];
}

const DonorSearch: React.FC<DonorSearchProps> = ({ donors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState<BloodGroup | ''>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false); // True for "Available for donation"

  const isDonorAvailable = (lastDonationDate?: string): boolean => {
    if (!lastDonationDate) return true; // Available if never donated
    const lastDate = new Date(lastDonationDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 120; // Available if 120 days (4 months) have passed
  };

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const nameMatch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const addressMatch = donor.address.toLowerCase().includes(searchTerm.toLowerCase());
      const bloodGroupMatch = !bloodGroupFilter || donor.bloodGroup === bloodGroupFilter;
      const availabilityMatch = !availabilityFilter || isDonorAvailable(donor.lastDonationDate);
      return (nameMatch || addressMatch) && bloodGroupMatch && availabilityMatch;
    });
  }, [donors, searchTerm, bloodGroupFilter, availabilityFilter]);

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center flex items-center justify-center">
          <MagnifyingGlassIcon className="w-8 h-8 mr-3 text-red-600" />
          রক্তদাতা খুঁজুন
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <InputField
            id="searchTerm"
            label="নাম বা ঠিকানা দিয়ে খুঁজুন"
            placeholder="নাম বা ঠিকানা লিখুন..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            containerClassName="mb-0"
          />
          <SelectField
            id="bloodGroupFilter"
            label="রক্তের গ্রুপ"
            value={bloodGroupFilter}
            onChange={e => setBloodGroupFilter(e.target.value as BloodGroup | '')}
            options={[{ value: '', label: 'সকল গ্রুপ' }, ...BLOOD_GROUP_OPTIONS]}
            containerClassName="mb-0"
          />
          <div className="flex items-end mb-0">
             <label htmlFor="availabilityFilter" className="flex items-center space-x-2 p-2.5 border border-gray-300 rounded-lg shadow-sm bg-white w-full cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                id="availabilityFilter"
                checked={availabilityFilter}
                onChange={e => setAvailabilityFilter(e.target.checked)}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm font-medium text-gray-700">শুধুমাত্র যারা রক্তদানে সক্ষম</span>
            </label>
          </div>
        </div>
      </Card>

      {filteredDonors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} isAvailable={isDonorAvailable(donor.lastDonationDate)} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <UserGroupIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">দুঃখিত, আপনার অনুসন্ধানের সাথে মেলে এমন কোনো রক্তদাতা পাওয়া যায়নি।</p>
          <p className="text-sm text-gray-500 mt-2">অনুগ্রহ করে অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </Card>
      )}
    </div>
  );
};

export default DonorSearch;
