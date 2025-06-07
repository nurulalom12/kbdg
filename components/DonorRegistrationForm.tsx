
import React, { useState } from 'react';
import { Donor, BloodGroup } from '../types';
import { BLOOD_GROUP_OPTIONS } from '../constants';
import Button from './ui/Button';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';
import TextAreaField from './ui/TextAreaField';
import Card from './ui/Card';
import { UserPlusIcon } from './icons/HeroIcons';

interface DonorRegistrationFormProps {
  onSubmit: (donor: Omit<Donor, 'id'>) => void;
}

const DonorRegistrationForm: React.FC<DonorRegistrationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [healthInfo, setHealthInfo] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Donor, 'id'>, string>>>({});

  // Regex defined using new RegExp for robustness
  const mobileRegex = new RegExp("^(01[3-9]\\d{8})$");
  const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Donor, 'id'>, string>> = {};
    if (!name.trim()) newErrors.name = 'নাম আবশ্যক।';
    if (!age.trim() || isNaN(Number(age)) || Number(age) <=0 ) newErrors.age = 'সঠিক বয়স দিন।';
    else if (Number(age) < 18 || Number(age) > 60) newErrors.age = 'বয়স ১৮ থেকে ৬০ এর মধ্যে হতে হবে।';
    if (!bloodGroup) newErrors.bloodGroup = 'রক্তের গ্রুপ নির্বাচন করুন।';
    if (!address.trim()) newErrors.address = 'ঠিকানা আবশ্যক।';
    if (!mobile.trim() || !mobileRegex.test(mobile)) newErrors.mobile = 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (01xxxxxxxxx)।';
    if (email.trim() && !emailRegex.test(email)) newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন।';
    if (lastDonationDate && new Date(lastDonationDate) > new Date()) newErrors.lastDonationDate = 'শেষ রক্তদানের তারিখ আজকের দিনের পরে হতে পারে না।';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name,
      age: parseInt(age, 10),
      bloodGroup: bloodGroup as BloodGroup,
      address,
      mobile,
      email: email || undefined,
      lastDonationDate: lastDonationDate || undefined,
      healthInfo: healthInfo || undefined,
    });
    // Reset form could be done here or handled by parent component navigation
    setName('');
    setAge('');
    setBloodGroup('');
    setAddress('');
    setMobile('');
    setEmail('');
    setLastDonationDate('');
    setHealthInfo('');
    setErrors({});
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center">
        <UserPlusIcon className="w-8 h-8 mr-3 text-red-600" />
        নতুন রক্তদাতা নিবন্ধন
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField id="name" label="সম্পূর্ণ নাম" value={name} onChange={e => setName(e.target.value)} error={errors.name} required placeholder="আপনার পুরো নাম লিখুন" />
        <InputField id="age" label="বয়স (বছর)" type="number" value={age} onChange={e => setAge(e.target.value)} error={errors.age} required placeholder="আপনার বয়স লিখুন"/>
        <SelectField id="bloodGroup" label="রক্তের গ্রুপ" value={bloodGroup} onChange={e => setBloodGroup(e.target.value as BloodGroup)} options={BLOOD_GROUP_OPTIONS} error={errors.bloodGroup} required />
        <InputField id="address" label="বর্তমান ঠিকানা" value={address} onChange={e => setAddress(e.target.value)} error={errors.address} required placeholder="গ্রাম, ইউনিয়ন, উপজেলা, জেলা"/>
        <InputField id="mobile" label="মোবাইল নম্বর" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} error={errors.mobile} required placeholder="01xxxxxxxxx"/>
        <InputField id="email" label="ইমেইল (যদি থাকে)" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} placeholder="example@mail.com"/>
        <InputField id="lastDonationDate" label="শেষ রক্তদানের তারিখ (যদি থাকে)" type="date" value={lastDonationDate} onChange={e => setLastDonationDate(e.target.value)} error={errors.lastDonationDate} max={new Date().toISOString().split("T")[0]}/>
        <TextAreaField id="healthInfo" label="স্বাস্থ্য সম্পর্কিত তথ্য (যদি থাকে)" value={healthInfo} onChange={e => setHealthInfo(e.target.value)} placeholder="যেমনঃ কোনো রোগ বা নিয়মিত ঔষধ সেবন করেন কিনা"/>
        
        <Button type="submit" variant="primary" size="lg" className="w-full" leftIcon={<UserPlusIcon className="w-5 h-5"/>}>
          নিবন্ধন করুন
        </Button>
      </form>
    </Card>
  );
};

export default DonorRegistrationForm;
