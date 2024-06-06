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
  name: string
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
  name?: string;
  description?: string;
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
  logicalQuantity: any;
  quantity: number;
  id: number;
  name: string;
  caracteristics: string;
  seuil: string | number | readonly string[] | undefined;

};

export type Commande = {
  id: number;
  number: number;
  orderdate: Date;
  orderspecifications: string;
  status: string;
  total_ht: number;
  tva: number;
  total_ttc: number;
  id_agentserviceachat: number;
  fournisseur_name: string;
};

export type ProductCommande={
  name: string;
  id_produit: number;
  id_boncommande: number;
  ordered_quantity: number;
  price: number;
 }

 export type ProductReception={
  name: string;
  productId: number;
  id_bonreception: number;
  receivedquantity: number;
  orderedQuantity: number;
  remainingQuantity: number;
 }
 

export type Fournisseur = {
  id: number;
  name: string;
  email: string;
  phone: number;
  rc: string;
  nif: number;
  rib: string;
  id_chapitre: number;
};

export type Reception={
  id: number;
  id_magasinier: number;
  id_boncommande: number;
  number: number;
  deliverydate: Date;
 }

 export type CommandeIn={
  id: number;
  id_consommateur: number;
  number: string;
  date: Date;
  validation: number;
  typecommande: string;
 }

 export type ProductCommandeIn={
  name: string;
  id_produit: number;
  id_boncommandeinterne: number;
  orderedQuantity: number;
  accordedQuantity: number;
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
export type Sortie = {
  id: number;
  id_boncommandeinterne: number;
  id_magasinier: number;
  observation: string;
  date: Date;
  service: string;
  id_consommateur: number;
};

export type BCI = {
  id: number;
  num: number;
  date: Date;
  }

export type Notification={
  id: number;
  message: string;
  date: string;
} 
 
export type NotificationSent={
  id_notification: number;
  id_user: number;

  phone: number;
  Validation: number;
};

export type Inventaire = {
  id: number;
  number: number;
  date: Date;
  validation: number;
  id_article: number;
};
