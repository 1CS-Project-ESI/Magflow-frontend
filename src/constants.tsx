import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Comptes',
    path: '/comptes',
    icon: <Icon icon="lucide:circle-user-round" width="24" height="24" />,
  },
  {
    title: 'Roles',
    path: '/roles',
    icon: <Icon icon="lucide:user-round-cog" width="24" height="24" />,
  },
  {
    title: 'Archivage',
    path: '/archivage',
    icon: <Icon icon="lucide:folders" width="24" height="24" />,
  },
  {
    title: 'Parametres',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
  },
];