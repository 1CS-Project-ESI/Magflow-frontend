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

export type Consumer = {
  user_id :string,
  matricule :string,
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
  code?: number;
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
  quantity: string | number | readonly string[] | undefined;
  id?: number;
  name: string;
  caracteristics: string;
  price:string | number | readonly string[] | undefined;
  seuil: string | number | readonly string[] | undefined;
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
  deliverydate: Date;
 }

 export type CommandeIn={
  id: number;
  id_consommateur: number;
  number: number;
  date: Date;
  validation: number;
 }

 export type ProductCommandeIn={
  id_produit: number;
  id_boncommandeinterne: number;
  orderedquantity: number;
  accordedquantity: number;
 }


 export type Structure = {
  id: number;
  name: string;
  responsable_Name: string;
};


/* li zdhom krimou */
export type ProduitBCI = {
  id_BCI: number;
  id: number;
  orderedQuantity: number;
  accordeQuantity: number;
};
export type BCI = {
  id: number;
  num: number;
  date: Date;
  phone: number;
  Validation: number;
};

