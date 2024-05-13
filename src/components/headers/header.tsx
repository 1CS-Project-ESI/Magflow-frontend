//header 
'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import PopupNotif from '../../components/popups/notifPopup'
import logo from '../../../public/assets/images/logo/magflow.png';
import NotificationIcon from '../notification/NotificationIcon';
import UserID from '@/utils/getID';


const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [showPopup, setShowPopup] = useState(false);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const togglePopup = () => {
    setShowPopup(!showPopup); // Inverser la valeur de l'état pour afficher ou masquer le popup
  };
  
  const handleClick = () => {
    setShowPopup(!showPopup); // Inverser la valeur de l'état pour afficher ou masquer le popup
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all `,
        {
          'bg-white/75 backdrop-blur-lg': scrolled,
          'bg-white': selectedLayout,
        },
      )}
    >
    <div className="flex h-20 bg-white items-center justify-between px-4">
      <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <img src={logo.src} className='w-36' />
          </Link>
      </div>
      <div className="relative flex items-center">
         {/* Ajouter relative pour positionner l'icône et le popup */}
           {showPopup && (
        <div
          className="fixed top-4 right-4 z-9999"
         onClick={(e) => e.stopPropagation()}
            >
          <PopupNotif onClose={togglePopup} userId={userIdNumber} />
        </div> )}
        <div>
         <button onClick={handleClick}>
           <NotificationIcon hasNewNotifications={true} />
         </button> </div>
         <div className="h-8 w-8 rounded-full bg-zinc-600 flex items-center justify-center text-center ml-4">
          <span className="font-semibold text-sm">HQ</span>
         </div>
       </div>
      </div>
    </div>
    
  );
};

export default Header;