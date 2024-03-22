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
    email: string;
    isActive: boolean;
    role: string; 
  };