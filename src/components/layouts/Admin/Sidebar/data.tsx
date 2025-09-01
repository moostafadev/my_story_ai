import { LayoutDashboard, Users, ShoppingCart, Settings } from "lucide-react";

export const sidebarData = [
  {
    href: "",
    label: "لوحة التحكم",
    icon: <LayoutDashboard />,
  },
  {
    href: "users",
    label: "المستخدمين",
    icon: <Users />,
  },
  {
    href: "orders",
    label: "الطلبات",
    icon: <ShoppingCart />,
  },
  {
    href: "settings",
    label: "الإعدادات",
    icon: <Settings />,
  },
];
