"use client";

import { MessageCircle } from "lucide-react";
import { ProjectState, Screen, getStatus, statusConfig } from "@/lib/mockData";

interface Props {
  project: ProjectState;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function DesktopSummaryPanel({ project, currentScreen, onNavigate }: Props) {
  const status = getStatus(project.daysUntilPayment);
  const cfg = statusConfig[status];

  const isOnPaymentFlow = currentScreen === "details" || currentScreen === "payment" || currentScreen === "success";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "sticky",
        top: 24,
      }}
    >
      <div>
        <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
          Ваш проект
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{project.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          {
            label: "Статус",
            value: cfg.label,
            valueStyle: { color: cfg.color, fontWeight: 600 },
          },
          {
            label: "Оплата",
            value: "1 июля",
          },
          {
            label: "Сервисов",
            value: `${project.services.length}`,
          },
          {
            label: "К оплате",
            value: `${project.totalRub.toLocaleString("ru")} ₽`,
            valueStyle: { fontWeight: 700 },
          },
        ].map((row, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
              borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <span style={{ fontSize: 13, color: "#6B7280" }}>{row.label}</span>
            <span style={{ fontSize: 13, color: "#111827", ...(row.valueStyle || {}) }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={() => onNavigate(isOnPaymentFlow ? "payment" : "details")}
          style={{
            width: "100%",
            background: "#4F7DF3",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "13px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {isOnPaymentFlow ? `Оплатить ${project.totalRub.toLocaleString("ru")} ₽` : "Посмотреть детали"}
        </button>

        {isOnPaymentFlow && (
          <button style={{
            width: "100%",
            background: "transparent",
            color: "#6B7280",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
            padding: "11px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}>
            <MessageCircle size={14} /> Задать вопрос менеджеру
          </button>
        )}
      </div>
    </div>
  );
}
