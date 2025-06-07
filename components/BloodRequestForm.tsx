
import React, { useState } from 'react';
import { BloodRequest, BloodGroup } from '../types';
import { BLOOD_GROUP_OPTIONS } from '../constants';
import Button from './ui/Button';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';
import TextAreaField from './ui/TextAreaField';
import Card from './ui/Card';
import { HeartIcon } from './icons/HeroIcons';

interface BloodRequestFormProps {
  onSubmit: (request: Omit<BloodRequest, 'id' | 'postedDate' | 'isFulfilled'>) => void;
}

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({ onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [bagsNeeded, setBagsNeeded] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [emergencyContactMobile, setEmergencyContactMobile] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<BloodRequest, 'id' | 'postedDate' | 'isFulfilled'>, string>>>({});

  // Regex defined using new RegExp for robustness
  const mobileRegex = new RegExp("^(01[3-9]\\d{8})$");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<BloodRequest, 'id' | 'postedDate' | 'isFulfilled'>, string>> = {};
    if (!patientName.trim()) newErrors.patientName = 'রোগীর নাম আবশ্যক।';
    if (!hospitalName.trim()) newErrors.hospitalName = 'হাসপাতালের নাম আবশ্যক।';
    if (!bloodGroup) newErrors.bloodGroup = 'রক্তের গ্রুপ নির্বাচন করুন।';
    if (!bagsNeeded.trim() || isNaN(Number(bagsNeeded)) || Number(bagsNeeded) <= 0) newErrors.bagsNeeded = 'সঠিক পরিমাণ রক্তের ব্যাগ উল্লেখ করুন।';
    if (!contactName.trim()) newErrors.contactName = 'যোগাযোগকারীর নাম আবশ্যক।';
    if (!contactMobile.trim() || !mobileRegex.test(contactMobile)) newErrors.contactMobile = 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (01xxxxxxxxx)।';
    if (emergencyContactMobile.trim() && !mobileRegex.test(emergencyContactMobile)) newErrors.emergencyContactMobile = 'সঠিক ১১ সংখ্যার জরুরি মোবাইল নম্বর দিন (01xxxxxxxxx)।';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      patientName,
      hospitalName,
      bloodGroup: bloodGroup as BloodGroup,
      bagsNeeded: parseInt(bagsNeeded, 10),
      contactName,
      contactMobile,
      emergencyContactMobile: emergencyContactMobile || undefined,
      notes: notes || undefined,
    });
     // Reset form
    setPatientName('');
    setHospitalName('');
    setBloodGroup('');
    setBagsNeeded('');
    setContactName('');
    setContactMobile('');
    setEmergencyContactMobile('');
    setNotes('');
    setErrors({});
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center">
        <HeartIcon className="w-8 h-8 mr-3 text-red-600" />
        রক্তের জন্য আবেদন করুন
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField id="patientName" label="রোগীর নাম" value={patientName} onChange={e => setPatientName(e.target.value)} error={errors.patientName} required placeholder="রোগীর সম্পূর্ণ নাম"/>
        <InputField id="hospitalName" label="হাসপাতালের নাম ও ঠিকানা" value={hospitalName} onChange={e => setHospitalName(e.target.value)} error={errors.hospitalName} required placeholder="যেমন: খানসামা উপজেলা স্বাস্থ্য কমপ্লেক্স"/>
        <SelectField id="bloodGroup" label="প্রয়োজনীয় রক্তের গ্রুপ" value={bloodGroup} onChange={e => setBloodGroup(e.target.value as BloodGroup)} options={BLOOD_GROUP_OPTIONS} error={errors.bloodGroup} required />
        <InputField id="bagsNeeded" label="কত ব্যাগ প্রয়োজন?" type="number" value={bagsNeeded} onChange={e => setBagsNeeded(e.target.value)} error={errors.bagsNeeded} required placeholder="সংখ্যায় লিখুন"/>
        <InputField id="contactName" label="যোগাযোগকারীর নাম" value={contactName} onChange={e => setContactName(e.target.value)} error={errors.contactName} required placeholder="যার সাথে যোগাযোগ করা হবে"/>
        <InputField id="contactMobile" label="যোগাযোগকারীর মোবাইল নম্বর" type="tel" value={contactMobile} onChange={e => setContactMobile(e.target.value)} error={errors.contactMobile} required placeholder="01xxxxxxxxx"/>
        <InputField id="emergencyContactMobile" label="জরুরি মোবাইল নম্বর (যদি থাকে)" type="tel" value={emergencyContactMobile} onChange={e => setEmergencyContactMobile(e.target.value)} error={errors.emergencyContactMobile} placeholder="01xxxxxxxxx"/>
        <TextAreaField id="notes" label="অতিরিক্ত তথ্য (ঐচ্ছিক)" value={notes} onChange={e => setNotes(e.target.value)} placeholder="যেমন: রক্তের প্রয়োজন কখন, রোগীর অবস্থা ইত্যাদি"/>
        
        <Button type="submit" variant="primary" size="lg" className="w-full" leftIcon={<HeartIcon className="w-5 h-5"/>}>
          আবেদন জমা দিন
        </Button>
      </form>
    </Card>
  );
};

export default BloodRequestForm;
