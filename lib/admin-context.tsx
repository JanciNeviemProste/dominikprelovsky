"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ContentType } from "./admin-content";

export type DeployStatus = "idle" | "saving" | "deploying" | "live" | "error";

export type PendingChange = {
  contentType: ContentType;
  path: string;
  originalValue: string;
  newValue: string;
};

type AdminContextValue = {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  pendingChanges: Map<string, PendingChange>;
  pendingCount: number;
  recordChange: (
    contentType: ContentType,
    path: string,
    originalValue: string,
    newValue: string,
  ) => void;
  saveAll: () => Promise<void>;
  discardAll: () => void;
  deployStatus: DeployStatus;
  deploySecondsLeft: number;
  errorMessage: string | null;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  editMode: false,
  setEditMode: () => {},
  pendingChanges: new Map(),
  pendingCount: 0,
  recordChange: () => {},
  saveAll: async () => {},
  discardAll: () => {},
  deployStatus: "idle",
  deploySecondsLeft: 0,
  errorMessage: null,
});

const DEPLOY_COUNTDOWN = 60; // sec

function changeKey(contentType: ContentType, path: string) {
  return `${contentType}::${path}`;
}

export function AdminProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: ReactNode;
}) {
  const [editMode, setEditMode] = useState<boolean>(isAdmin);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(
    new Map(),
  );
  const [deployStatus, setDeployStatus] = useState<DeployStatus>("idle");
  const [deploySecondsLeft, setDeploySecondsLeft] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const recordChange = useCallback(
    (
      contentType: ContentType,
      path: string,
      originalValue: string,
      newValue: string,
    ) => {
      setPendingChanges((prev) => {
        const next = new Map(prev);
        const key = changeKey(contentType, path);
        if (newValue === originalValue) {
          next.delete(key);
        } else {
          next.set(key, { contentType, path, originalValue, newValue });
        }
        return next;
      });
    },
    [],
  );

  const discardAll = useCallback(() => {
    setPendingChanges(new Map());
    setErrorMessage(null);
  }, []);

  const saveAll = useCallback(async () => {
    if (pendingChanges.size === 0) return;
    setDeployStatus("saving");
    setErrorMessage(null);

    const changes = Array.from(pendingChanges.values()).map((c) => ({
      contentType: c.contentType,
      path: c.path,
      value: c.newValue,
    }));

    try {
      const res = await fetch("/api/admin/inline-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Nepodarilo sa uložiť.");
      }
      setPendingChanges(new Map());
      setDeployStatus("deploying");
      setDeploySecondsLeft(DEPLOY_COUNTDOWN);
      if (countdownRef.current) clearInterval(countdownRef.current);
      countdownRef.current = setInterval(() => {
        setDeploySecondsLeft((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            setDeployStatus("live");
            setTimeout(() => setDeployStatus("idle"), 5000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setDeployStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Chyba.");
      setTimeout(() => setDeployStatus("idle"), 6000);
    }
  }, [pendingChanges]);

  const value = useMemo<AdminContextValue>(
    () => ({
      isAdmin,
      editMode,
      setEditMode,
      pendingChanges,
      pendingCount: pendingChanges.size,
      recordChange,
      saveAll,
      discardAll,
      deployStatus,
      deploySecondsLeft,
      errorMessage,
    }),
    [
      isAdmin,
      editMode,
      pendingChanges,
      recordChange,
      saveAll,
      discardAll,
      deployStatus,
      deploySecondsLeft,
      errorMessage,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
