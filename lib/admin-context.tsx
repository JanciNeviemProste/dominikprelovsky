"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AdminContextValue = {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  editMode: false,
  setEditMode: () => {},
});

export function AdminProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: ReactNode;
}) {
  const [editMode, setEditMode] = useState<boolean>(isAdmin);
  return (
    <AdminContext.Provider value={{ isAdmin, editMode, setEditMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
