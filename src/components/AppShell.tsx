"use client";

import { useState, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [colapsado, setColapsado] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onToggleSidebar={() => setColapsado((c) => !c)} />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar colapsado={colapsado} />
        <main style={{ flex: 1, padding: 24, background: "#F8FAFC", overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
