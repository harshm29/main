// components/common/Layouts.tsx
import AdminLayout from "./Layouts/admin/AdminLayout";

import FrontendLayout from "./Layouts/frontend/FrontendLayout";
import UserLayout from "./Layouts/user/UserLayout";
export const Layouts = {
  admin: AdminLayout,
  front: FrontendLayout,
  user: UserLayout,
};
export type LayoutKeys = keyof typeof Layouts; //  "user" | "admin" | "front"
