
import React from 'react';
import { BloodRequest } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { PhoneIcon, CheckCircleIcon, XCircleIcon } from './icons/HeroIcons';

interface ActiveRequestsListProps {
  requests: BloodRequest[];
  onToggleFulfilled: (requestId: string) => void;
  showFulfilledToggle?: boolean;
}

const ActiveRequestsList: React.FC<ActiveRequestsListProps> = ({ requests, onToggleFulfilled, showFulfilledToggle = true }) => {
  if (requests.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600">বর্তমানে কোনো রক্তের চাহিদা নেই।</p>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {requests.map(request => (
        <Card key={request.id} className={`p-6 ${request.isFulfilled ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-l-4`}>
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-red-700">{request.patientName} ({request.bloodGroup})</h3>
              <p className="text-sm text-gray-600">হাসপাতাল: {request.hospitalName}</p>
              <p className="text-sm text-gray-600">প্রয়োজন: {request.bagsNeeded} ব্যাগ</p>
              <p className="text-sm text-gray-500">আবেদনের তারিখ: {formatDate(request.postedDate)}</p>
              {request.notes && <p className="text-sm text-gray-500 mt-1">বিশেষ দ্রষ্টব্য: {request.notes}</p>}
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <p className="text-md font-medium text-gray-700">যোগাযোগ: {request.contactName}</p>
              <a href={`tel:${request.contactMobile}`} className="text-red-600 hover:text-red-800 font-semibold flex items-center justify-start sm:justify-end">
                <PhoneIcon className="w-4 h-4 mr-1" /> {request.contactMobile}
              </a>
              {request.emergencyContactMobile && (
                <a href={`tel:${request.emergencyContactMobile}`} className="text-sm text-gray-600 hover:text-red-700 flex items-center justify-start sm:justify-end mt-1">
                  <PhoneIcon className="w-4 h-4 mr-1" /> (জরুরি) {request.emergencyContactMobile}
                </a>
              )}
            </div>
          </div>
          {showFulfilledToggle && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
              <Button 
                onClick={() => onToggleFulfilled(request.id)}
                variant={request.isFulfilled ? "secondary" : "primary"}
                size="sm"
                leftIcon={request.isFulfilled ? <XCircleIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
              >
                {request.isFulfilled ? 'অমীমাংসিত করুন' : 'পূরণ হয়েছে标记 করুন'}
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ActiveRequestsList;
