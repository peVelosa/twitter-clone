import { Home, Bell, User, Twitter } from 'lucide-react';

export const links = [
  {
    icon: Twitter,
    href: '/',
    className: 'fill-blue stroke-blue',
    isPrivate: false,
  },
  {
    icon: Home,
    label: 'home',
    href: '/',
    isPrivate: false,
  },
  // {
  //   icon: Bell,
  //   label: "notifications",
  //   href: "/notifications",
  //   isPrivate: true,
  // },
  {
    icon: User,
    label: 'profile',
    href: '/',
    isPrivate: true,
  },
];
