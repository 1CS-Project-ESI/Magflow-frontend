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
    password?: string;
    isActive: boolean;
    phone?: number;
    role: string; 
  };