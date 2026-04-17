"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Full data shape across all 3 steps ──────────────────────────────────────
export interface SignupData {
  // Step 1
  email: string;
  // Step 2
  selectedPlan: "yearly" | "monthly" | "membership" | "";
  // Step 3 – basic info
  fullName: string;
  phone: string;
  address: string;
  // Step 3 – pool
  poolShape: string;
  petName: string;
  // Step 3 – gate
  gateAccess: string;
  gateCode: string;
  gateNotes: string;
  // Step 3 – time preference
  timeSlot1: string;
  timeSlot2: string;
  timeNotes: string;
}

const STORAGE_KEY = "aquasense_signup";

const defaultData: SignupData = {
  email: "",
  selectedPlan: "",
  fullName: "",
  phone: "",
  address: "",
  poolShape: "Square",
  petName: "",
  gateAccess: "Left Gate",
  gateCode: "",
  gateNotes: "",
  timeSlot1: "7:00 AM – 10:00 AM",
  timeSlot2: "1:00 PM – 4:00 PM",
  timeNotes: "",
};

interface SignupContextValue {
  data: SignupData;
  update: (partial: Partial<SignupData>) => void;
  reset: () => void;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SignupData>(defaultData);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setData(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function update(partial: Partial<SignupData>) {
    setData((prev) => {
      const next = { ...prev, ...partial };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function reset() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setData(defaultData);
  }

  return (
    <SignupContext.Provider value={{ data, update, reset }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup(): SignupContextValue {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used inside <SignupProvider>");
  return ctx;
}
