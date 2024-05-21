import React from 'react';

interface NotificationItemProps {
  message: string;
  date: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message, date }) => {
    

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-2">
      <p className="text-gray-800">{message}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

export default NotificationItem;