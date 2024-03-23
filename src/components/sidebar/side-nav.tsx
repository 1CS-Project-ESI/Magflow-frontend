"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import logo from "../../../public/assets/images/logo/magflow.png";

const SideNav = () => {
  return (
    <div className="md:w-60 bg-slate-800 h-screen flex-1 fixed border-r hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b bg-white h-20 w-full">
          <img src={logo.src} className="w-52" alt="Logo" />
        </div>
        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row hover:text-white items-center p-2 rounded-lg w-full justify-between ${
              pathname.includes(item.path) ? "text-white" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span
                className={`font-medium hover:text-white text-xl flex ${
                  pathname.includes(item.path) ? "text-white" : ""
                }`}
              >
                {item.title}
              </span>
            </div>
            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>
          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span className="hover:text-white">{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row hover:text-white space-x-4 items-center p-2 m-1 rounded-lg ${
            item.path === pathname ? "text-white" : "text-neutral-400"
          }`}
        >
          {item.icon}
          <span className="w-1"></span>
          {item.title}
        </Link>
      )}
    </div>
  );
};
