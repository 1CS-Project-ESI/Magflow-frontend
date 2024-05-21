import React from 'react';
import Image from 'next/image';
import noNtificationIcon from '../../../public/assets/icons/No_notification.svg';
import notificationIcon from '../../../public/assets/icons/notification.svg';

interface NotificationIconProps {
  hasNewNotifications: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ hasNewNotifications }) => {
  return (
    <div className="relative ml-4">
      {/* Use the <Image /> component */}
      <Image
        src={hasNewNotifications ? notificationIcon : noNtificationIcon}
        alt={hasNewNotifications ? 'Notification Icon' : 'No Notification Icon'}
        width={24} // Set the width of the image
        height={24} // Set the height of the image
        className="cursor-pointer"
      />
    </div>
  );
};

export default NotificationIcon;