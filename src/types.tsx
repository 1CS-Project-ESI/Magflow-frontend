export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type User = {
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  newEmail: string; // to solve update by email error
  password?: string;
  isActive: boolean;
  phone?: string;
  role: string;
};

export interface Archive {
  id: string;
  filename: string;
  filepath: string;
  // Add other properties as needed
}

export type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  path?: string;
};

export type Chapter = {
  id?: number;
  name: string;
  description: string;
  id_agentserviceachat?: number;
};

export type Article = {
  id?: number;
  name: string;
  description: string;
  tva?: number;
  chapter_id?: number;
};

export type Product = {
  id?: number;
  name: string;
  caracteristics: string;
  price?: number;
  article_id?: number;
};

export type Commande = {
  id: number;
  number: number;
  orderdate: Date;
  deliverydate: Date;
  orderspecifications: string;
  status: string;
  total_ht: number;
  tva: number;
  total_ttc: number;
  id_agentserviceachat: number;
};

export type Fournisseur = {
  id: number;
  name: string;
  email: string;
  phone: number;
  rc: string;
  nif: number;
  rib: string;
};
export type Reception={
 id: number;
 id_magasinier: number;
 number: number;
 deleverydate: Date;
}