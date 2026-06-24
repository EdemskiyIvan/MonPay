"use client";

import { Screen } from "@/lib/mockData";
import { CheckCircle } from "lucide-react";

interface Props {
  total: number;
  onNavigate: (screen: Screen) => void;
}

const paidServices = ["Сервер платформы", "Корпоративная почта", "Иностранный API-сервис"];

export default function SuccessScreen({ total, onNavigate }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Success hero */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          padding: "32px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle size={32} color="#10B981" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>
          Оплата принята
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
          {total.toLocaleString("ru")} ₽ поступили на обслуживание проекта. Мы продлим необходимые сервисы и обновим статус после проведения оплат.
        </p>
      </div>

      {/* What was paid */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #F3F4F6" }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Что будет оплачено</span>
        </div>
        <div style={{ padding: "8px 18px 16px" }}>
          {paidServices.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingTop: 10,
                paddingBottom: i < paidServices.length - 1 ? 10 : 0,
                borderBottom: i < paidServices.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <CheckCircle size={16} color="#10B981" />
              <span style={{ fontSize: 14, color: "#374151" }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          background: "#EEF3FE",
          border: "1px solid #C7D7FB",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 13,
          color: "#3B5FD4",
          lineHeight: 1.5,
        }}
      >
        Статус проекта обновится в течение 1–2 рабочих дней после проведения всех оплат.
      </div>

      <button
        onClick={() => onNavigate("dashboard")}
        style={{
          width: "100%",
          background: "#4F7DF3",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "16px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Вернуться к проекту
      </button>
    </div>
  );
}
