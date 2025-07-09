"use client";

import React, { createContext, useContext, useState } from "react";

export interface TransitionContextType {
  toggleCompleted: (value: boolean) => void;
  completed: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
