
import React from 'react';
import { BloodGroup, NavItem, CampEvent, AwarenessInfo, Donor, BloodRequest } from './types';
import { HomeIcon, UserPlusIcon, HeartIcon, MagnifyingGlassIcon, CalendarDaysIcon, InformationCircleIcon, PhoneIcon } from './components/icons/HeroIcons';

export const APP_TITLE = "খানসামা রক্তদান গ্রুপ";

export const BLOOD_GROUP_OPTIONS = [
  { value: BloodGroup.A_POSITIVE, label: "এ পজিটিভ (A+)" },
  { value: BloodGroup.A_NEGATIVE, label: "এ নেগেটিভ (A-)" },
  { value: BloodGroup.B_POSITIVE, label: "বি পজিটিভ (B+)" },
  { value: BloodGroup.B_NEGATIVE, label: "বি নেগেটিভ (B-)" },
  { value: BloodGroup.O_POSITIVE, label: "ও পজিটিভ (O+)" },
  { value: BloodGroup.O_NEGATIVE, label: "ও নেগেটিভ (O-)" },
  { value: BloodGroup.AB_POSITIVE, label: "এবি পজিটিভ (AB+)" },
  { value: BloodGroup.AB_NEGATIVE, label: "এবি নেগেটিভ (AB-)" },
];

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "হোমপেজ", view: "home", icon: HomeIcon },
  { label: "রক্তদাতা নিবন্ধন", view: "registerDonor", icon: UserPlusIcon },
  { label: "রক্তের আবেদন", view: "requestBlood", icon: HeartIcon },
  { label: "রক্তদাতা খুঁজুন", view: "findDonor", icon: MagnifyingGlassIcon },
  { label: "ইভেন্ট ও ক্যাম্পেইন", view: "events", icon: CalendarDaysIcon },
  { label: "সচেতনতা", view: "awareness", icon: InformationCircleIcon },
  { label: "যোগাযোগ", view: "contact", icon: PhoneIcon },
];

// Mock Data
export const MOCK_RECENT_ACTIVITIES = [
  { id: '1', title: 'পাকোরিয়া উচ্চ বিদ্যালয়ে রক্তদান ক্যাম্পেইন', date: '২০২৪-০৭-১৫', description: '৫০ ব্যাগ রক্ত সংগৃহীত হয়েছে।', imageUrl: 'https://picsum.photos/seed/activity1/400/200' },
  { id: '2', title: 'খানসামা উপজেলা স্বাস্থ্য কমপ্লেক্সে জরুরি রক্তদান', date: '২০২৪-০৭-১০', description: 'দুর্ঘটনায় আহত রোগীর জন্য ৩ ব্যাগ বি পজিটিভ রক্ত সরবরাহ।', imageUrl: 'https://picsum.photos/seed/activity2/400/200' },
];

export const MOCK_EVENTS: CampEvent[] = [
  { id: 'ev1', title: 'বড় ধরনের রক্তদান শিবির', date: '২০২৪-০৮-১৫', time: 'সকাল ৯টা - বিকাল ৪টা', location: 'খানসামা ডিগ্রি কলেজ মাঠ', description: 'আসন্ন জাতীয় শোক দিবস উপলক্ষে স্বেচ্ছায় রক্তদান কর্মসূচি। আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি জীবন।', imageUrl: 'https://picsum.photos/seed/event1/600/300' },
  { id: 'ev2', title: 'রক্তের গ্রুপ নির্ণয় ও সচেতনতামূলক ক্যাম্পেইন', date: '২০২৪-০৯-০১', time: 'সকাল ১০টা - দুপুর ২টা', location: 'খানসামা পাইলট বালিকা উচ্চ বিদ্যালয়', description: 'বিনামূল্যে রক্তের গ্রুপ নির্ণয় এবং রক্তদানের উপকারিতা বিষয়ে আলোচনা।', imageUrl: 'https://picsum.photos/seed/event2/600/300' },
  { id: 'ev3', title: 'পূর্ববর্তী ক্যাম্পেইন রিপোর্ট', date: '২০২৪-০৬-২০', time: 'সকাল ৯টা - বিকাল ৩টা', location: 'আঙ্গারপাড়া ইউনিয়ন পরিষদ', description: ' সফলভাবে সম্পন্ন হয়েছে। মোট ১২০ ব্যাগ রক্ত সংগৃহীত।', report: 'বিস্তারিত রিপোর্ট এখানে...', gallery: ['https://picsum.photos/seed/gallery1/200/150', 'https://picsum.photos/seed/gallery2/200/150', 'https://picsum.photos/seed/gallery3/200/150'], imageUrl: 'https://picsum.photos/seed/event3/600/300' },
];

export const MOCK_AWARENESS_INFO: AwarenessInfo[] = [
  { id: 'aw1', title: 'রক্তদানের উপকারিতা', category: 'benefits', content: 'নিয়মিত রক্তদানে হৃদরোগের ঝুঁকি কমে, শরীরে নতুন রক্তকণিকা তৈরি হয় এবং এটি একটি মহৎ মানবিক কাজ যা অন্যের জীবন বাঁচাতে পারে।' },
  { id: 'aw2', title: 'রক্তদানের প্রয়োজনীয়তা', category: 'benefits', content: 'দুর্ঘটনা, থ্যালাসেমিয়া, ক্যান্সারসহ বিভিন্ন রোগের চিকিৎসায় রক্তের প্রয়োজন হয়। আপনার এক ব্যাগ রক্ত একজন মুমূর্ষু রোগীর জীবন রক্ষা করতে পারে।' },
  { id: 'aw3', title: 'রক্তদানের নিয়মাবলী', category: 'rules', content: '১৮-৬০ বছর বয়সী যেকোনো সুস্থ মানুষ (পুরুষের ওজন ন্যূনতম ৪৮ কেজি, মহিলার ৪৫ কেজি) প্রতি ৪ মাস অন্তর রক্তদান করতে পারেন। রক্তদানের পূর্বে পর্যাপ্ত ঘুম ও পুষ্টিকর খাবার গ্রহণ করা উচিত।' },
  { id: 'aw4', title: 'রক্তদানের সতর্কতা', category: 'rules', content: 'জ্বর, সর্দি, কাশি বা কোনো সংক্রামক রোগে আক্রান্ত অবস্থায় রক্তদান করা যাবে না। নির্দিষ্ট কিছু ওষুধ সেবনরত অবস্থায় এবং গর্ভবতী মহিলারা রক্তদান করতে পারবেন না।' },
  { id: 'aw5', title: 'রক্তের গ্রুপ সম্পর্কিত তথ্য', category: 'blood_group_info', content: 'প্রধানত রক্তের গ্রুপগুলো হলো A, B, AB, এবং O। প্রতিটি গ্রুপ আবার Rh ফ্যাক্টরের উপর ভিত্তি করে পজিটিভ (+) বা নেগেটিভ (-) হতে পারে। O নেগেটিভ গ্রুপের রক্তকে সার্বজনীন দাতা এবং AB পজিটিভ গ্রুপের রক্তকে সার্বজনীন গ্রহীতা বলা হয়।' },
];

export const INITIAL_DONORS: Donor[] = [
    { id: 'donor1', name: 'মোঃ রহিম উদ্দিন', age: 30, bloodGroup: BloodGroup.O_POSITIVE, address: 'খানসামা, দিনাজপুর', mobile: '0171XXXXXXX', lastDonationDate: '2024-03-15' },
    { id: 'donor2', name: 'ফাতেমা আক্তার', age: 25, bloodGroup: BloodGroup.A_POSITIVE, address: 'পাকেরহাট, খানসামা', mobile: '0182XXXXXXX', lastDonationDate: '2024-05-20' },
    { id: 'donor3', name: 'আব্দুল করিম', age: 45, bloodGroup: BloodGroup.B_POSITIVE, address: 'ভেড়ভেড়ী, খানসামা', mobile: '0193XXXXXXX', lastDonationDate: '2024-01-10' },
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
    { id: 'req1', patientName: 'জরুরী রোগী', hospitalName: 'খানসামা উপজেলা স্বাস্থ্য কমপ্লেক্স', bloodGroup: BloodGroup.AB_POSITIVE, bagsNeeded: 2, contactName: 'রোগীর স্বজন', contactMobile: '0155XXXXXXX', postedDate: new Date().toISOString(), isFulfilled: false, notes: 'জরুরী ভিত্তিতে প্রয়োজন' },
];
