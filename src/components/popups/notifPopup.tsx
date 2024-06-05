import React, { useEffect, useState } from 'react';
import NotificationItem from '../notification/NotificationItem';
import { Notification } from '../../types';

interface PopupNotifProps {
  onClose: () => void;
  userId: number; // Change UserId to userId to match the prop name passed from Header
}

const PopupNotif: React.FC<PopupNotifProps> = ({ onClose, userId }) => { // Change UserId to userId to match the prop name passed from Header
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const role = localStorage.getItem("role");
        let url = "";
        const id = localStorage.getItem("id");

      
        
        if (role === "magasinier") {
         
          url = `http://localhost:4000/api/notifications/magasinier/${id}`;
        } else if (role === "structureresponsable") {
         
          url = `http://localhost:4000/api/notifications/responsable/${id}`;
        } else if (role === "director") {
         
          url = `http://localhost:4000/api/notifications/directeur/${id}`;
        }
        else if (role === "consumer"){
          url = `http://localhost:4000/api/notifications/consommateur/${id}`;

        }
        
        const response = await fetch(url);
        const data = await response.json();
        console.log("data:",data)
        setHasNewNotifications(data.length > 0);
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-200 p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">Notifs</h2>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            message={notification.message}
            date={notification.date}
          />
        ))}
      </div>
      <button
        className="bg-purple-950 text-white py-2 px-4 rounded mt-4"
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
};

export default PopupNotif;