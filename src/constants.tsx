"use client";

import { SideNavItem } from "./types";
import { User } from "./types";
import { Archive } from "./types";

import acc from "../public/assets/icons/accounts.svg";
import rol from "../public/assets/icons/role.svg";
import back from "../public/assets/icons/Archivage_folder.svg";
import param from "../public/assets/icons/parametre.svg";
import strct from "../public/assets/icons/customers.svg";
import cmd from "../public/assets/icons/Commande.svg";
import chp from "../public/assets/icons/Chapitre.svg";
import art from "../public/assets/icons/Article.svg";
import prd from "../public/assets/icons/Produit.svg";

export const SIDENAV_ADMIN_ITEMS: SideNavItem[] = [
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
    title: "Structures",
    path: "/structures",
    icon: <img src={strct.src} width="18" height="18" />,
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

export const SIDENAV_AGENT_ITEMS: SideNavItem[] = [
  {
    title: "Commandes Externes",
    path: "/commandes",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Chapitres",
    path: "/chapitres",
    icon: <img src={chp.src} width="18" height="18" />,
  },
  {
    title: "Articles",
    path: "/articles",
    icon: <img src={art.src} width="18" height="18" />,
  },
  {
    title: "Produits",
    path: "/produits",
    icon: <img src={prd.src} width="18" height="18" />,
  },
  {
    title: "Statistiques",
    path: "/stats",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settingsAgent",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const SIDENAV_MAGASINIER_ITEMS: SideNavItem[] = [
  {
    title: "Commandes Externes",
    path: "/commandes",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Receptions",
    path: "/receptions",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Commandes Internes",
    path: "/commandesIn",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Sorties",
    path: "/sorties",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Decharges",
    path: "/decharges",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Chapitres",
    path: "/chapitres",
    icon: <img src={chp.src} width="18" height="18" />,
  },
  {
    title: "Articles",
    path: "/articles",
    icon: <img src={art.src} width="18" height="18" />,
  },
  {
    title: "Produits",
    path: "/produits",
    icon: <img src={prd.src} width="18" height="18" />,
  },
  {
    title: "Statistiques",
    path: "/stats",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settingsAgent",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const SIDENAV_RESPON_ITEMS: SideNavItem[] = [
  {
    title: "Commandes Internes",
    path: "/commandesIn",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Statistiques",
    path: "/stats",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settingsAgent",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const SIDENAV_DIRECTOR_ITEMS: SideNavItem[] = [
  {
    title: "Commandes Internes",
    path: "/commandesIn",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Statistiques",
    path: "/stats",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settingsAgent",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const SIDENAV_CONSOMMATEUR_ITEMS: SideNavItem[] = [
  {
    title: "Commandes Internes",
    path: "/commandesIn",
    icon: <img src={cmd.src} width="18" height="18" />,
  },
  {
    title: "Statistiques",
    path: "/stats",
    icon: <img src={back.src} width="18" height="18" />,
  },
  {
    title: "Parametres",
    path: "/settingsAgent",
    icon: <img src={param.src} width="18" height="18" />,
  },
];

export const USERS: User[] = [
  // {
//     firstname: "Assil",
//     lastname: "Kahlerras",
//     email: "a.kahlerras@esi-sba.dz",
//     newEmail :"",
//     isActive: true,
//     role: "Consommateur",
//   },
//   {
//     firstname: "Assil",
//     lastname: "Kahlerras",
//     email: "a.kahlerras@esi-sba.dz",
//     isActive: true,
//     role: "Consommateur",
//   },
//   {
//     firstname: "Assil",
//     lastname: "Kahlerras",
//     email: "a.kahlerras@esi-sba.dz",
//     isActive: true,
//     role: "Admin",
//   },
//   {
//     firstname: "Assil",
//     lastname: "Kahlerras",
//     email: "a.kahlerras@esi-sba.dz",
//     isActive: true,
//     role: "User",
//   },
//   {
//     firstname: "Assil",
//     lastname: "Kahlerras",
//     email: "a.kahlerras@esi-sba.dz",
//     isActive: true,
//     role: "Consommateur",
  //  },
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

export const BACKUPS: Archive[] =[
{
  id:"Backup_2024-07-07T08-11-47.389Z.txt",
  filepath:"C:\Users\Abdelkrim HALIMI\OneDrive\Attachments\
  Backup_2024-07-07T08-11-47.389Z.txt",
  filename:"07/07/2024",
}

]

export const STRUCTURES: string[] = [
  "Structure",
  "Structure",
  "Structure",
  "Structure",
  "Structure",
  "Structure",
];

