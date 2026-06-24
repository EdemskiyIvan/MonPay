"use client";

import { useState } from "react";
import { Screen, initialProject, paidProject, ProjectState } from "@/lib/mockData";
import DashboardScreen from "@/components/screens/DashboardScreen";
import PaymentDetailsScreen from "@/components/screens/PaymentDetailsScreen";
import PaymentScreen from "@/components/screens/PaymentScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import NotificationsScreen from "@/components/screens/NotificationsScreen";
import DesktopSummaryPanel from "@/components/DesktopSummaryPanel";
import { LayoutDashboard, CreditCard, FileText, HeadphonesIcon } from "lucide-react";

const navItems: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Проект",     icon: <LayoutDashboard size={18} /> },
  { id: "payments",  label: "Платежи",    icon: <CreditCard size={18} /> },
  { id: "docs",      label: "Документы",  icon: <FileText size={18} /> },
  { id: "support",   label: "Поддержка",  icon: <HeadphonesIcon size={18} /> },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [isPaid, setIsPaid] = useState(false);
  const project: ProjectState = isPaid ? paidProject : initialProject;

  const handleNavigate = (next: Screen) => {
    if (next === "success") setIsPaid(true);
    if (next === "dashboard" && screen === "success") {
      // already set isPaid above
    }
    setScreen(next);
  };

  const activeNavId =
    screen === "dashboard" ? "dashboard" :
    screen === "details" || screen === "payment" || screen === "success" ? "payments" :
    screen === "notifications" ? "dashboard" :
    "dashboard";

  const screenTitle =
    screen === "dashboard"     ? project.name :
    screen === "details"       ? "Детали оплаты" :
    screen === "payment"       ? "Оплата" :
    screen === "notifications" ? "Уведомления" :
    "Оплата принята";

  return (
    <div style={{ minHeight: "100vh", background: "#F7F9FC" }}>
      {/* Top nav */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#4F7DF3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <rect x={1} y={6} width={4} height={7} rx={1} fill="white" />
                <rect x={6} y={3} width={4} height={10} rx={1} fill="white" opacity={0.8} />
                <rect x={11} y={0} width={2} height={13} rx={1} fill="white" opacity={0.6} />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
              MonPay
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "flex", gap: 4 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "dashboard") setScreen("dashboard");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: activeNavId === item.id ? "#EEF3FE" : "transparent",
                  color: activeNavId === item.id ? "#4F7DF3" : "#6B7280",
                  fontSize: 14,
                  fontWeight: activeNavId === item.id ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User avatar */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#4F7DF3",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            А
          </div>
        </div>
      </header>

      {/* Page content */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 100px" }}>
        {/* Breadcrumb / title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>
            {screenTitle}
          </h1>
          {screen === "dashboard" && (
            <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
              Управление инфраструктурой проекта
            </p>
          )}
        </div>

        {/* Desktop two-column layout */}
        <div className="page-layout">
          {/* Main content */}
          <div className="main-col">
            {screen === "dashboard" && (
              <DashboardScreen project={project} onNavigate={handleNavigate} isPaid={isPaid} />
            )}
            {screen === "details" && (
              <PaymentDetailsScreen project={project} onNavigate={handleNavigate} />
            )}
            {screen === "payment" && (
              <PaymentScreen total={project.totalRub} onNavigate={handleNavigate} />
            )}
            {screen === "success" && (
              <SuccessScreen total={project.totalRub} onNavigate={handleNavigate} />
            )}
            {screen === "notifications" && (
              <NotificationsScreen onNavigate={handleNavigate} />
            )}
          </div>

          {/* Desktop sidebar — hidden on dashboard to avoid duplication */}
          <div className="sidebar-col" style={{ display: screen === "dashboard" ? "none" : undefined }}>
            <DesktopSummaryPanel
              project={project}
              currentScreen={screen}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div
        className="mobile-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          zIndex: 50,
        }}
      >
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "dashboard") setScreen("dashboard");
            }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "10px 0 14px",
              border: "none",
              background: "transparent",
              color: activeNavId === item.id ? "#4F7DF3" : "#9CA3AF",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: activeNavId === item.id ? 600 : 400,
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <style>{`
        .page-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        .main-col {
          flex: 1;
          min-width: 0;
        }
        .sidebar-col {
          width: 280px;
          flex-shrink: 0;
        }
        .desktop-nav {
          display: flex !important;
        }
        .mobile-nav {
          display: none !important;
        }
        @media (max-width: 768px) {
          .sidebar-col { display: none; }
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
