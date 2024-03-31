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

export type Archive ={
nom:string;
local:string;
date:string;
}

  export type ButtonProps = {
    children: React.ReactNode;
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    path?: string;
  };
