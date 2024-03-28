"use client";

import { SideNavItem } from "./types";
import { User } from "./types";

import acc from "../public/assets/icons/accounts.svg";
import rol from "../public/assets/icons/role.svg";
import back from "../public/assets/icons/Archivage_folder.svg";
import param from "../public/assets/icons/parametre.svg";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Comptes",
    path: "/comptes",
    icon: <img src={acc.src} width="18" height="18" />,
  },
  {
    title: "Roles",
    path: "/roles",
    icon: <img src={rol.src} width="18" height="18" />,
  },
  {
    title: "Archivage",
    path: "/archivage",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settings",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const USERS: User[] = [
  {
    firstname: "Assil",
    lastname: "Kahlerras",
    email: "a.kahlerras@esi-sba.dz",
    isActive: true,
    role: "Consommateur",
  },
  {
    firstname: "Assil",
    lastname: "Kahlerras",
    email: "a.kahlerras@esi-sba.dz",
    isActive: true,
    role: "Consommateur",
  },
  {
    firstname: "Assil",
    lastname: "Kahlerras",
    email: "a.kahlerras@esi-sba.dz",
    isActive: true,
    role: "Admin",
  },
  {
    firstname: "Assil",
    lastname: "Kahlerras",
    email: "a.kahlerras@esi-sba.dz",
    isActive: true,
    role: "User",
  },
  {
    firstname: "Assil",
    lastname: "Kahlerras",
    email: "a.kahlerras@esi-sba.dz",
    isActive: true,
    role: "Consommateur",
  },
];

export const ROLES: string[] = [
  "admin",
  "director",
  "consumer",
  "magasinier",
  "agentserviceachat",
  "structureresponsable",
];

export const PERMISSIONS: string[] = [
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
];
