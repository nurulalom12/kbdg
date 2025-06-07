
export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
}

export interface Donor {
  id: string;
  name: string;
  age: number;
  bloodGroup: BloodGroup;
  address: string;
  mobile: string;
  email?: string;
  lastDonationDate?: string; // YYYY-MM-DD
  healthInfo?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  hospitalName: string;
  bloodGroup: BloodGroup;
  bagsNeeded: number;
  contactName: string;
  contactMobile: string;
  emergencyContactMobile?: string;
  postedDate: string; // ISO string
  isFulfilled: boolean;
  notes?: string;
}

export interface CampEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  report?: string; // for past events
  gallery?: string[]; // image URLs for past events
}

export interface AwarenessInfo {
  id: string;
  title: string;
  content: string;
  category: 'benefits' | 'rules' | 'blood_group_info';
}

export type View = 'home' | 'registerDonor' | 'requestBlood' | 'findDonor' | 'events' | 'awareness' | 'contact';

export interface NavItem {
  label: string;
  view: View;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
