"use client";

import { ProjectState, Screen, getStatus, statusConfig } from "@/lib/mockData";
import StatusGauge from "@/components/StatusGauge";
import { ChevronRight } from "lucide-react";

interface Props {
  project: ProjectState;
  onNavigate: (screen: Screen) => void;
  isPaid: boolean;
}

export default function DashboardScreen({ project, onNavigate, isPaid }: Props) {
  const status = getStatus(project.daysUntilPayment);
  const cfg = statusConfig[status];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Status card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 1. Текст */}
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", textAlign: "center" }}>
          {isPaid ? "Следующая оплата" : "До ближайшей оплаты"}{" "}
          <strong style={{ color: cfg.color }}>{project.daysUntilPayment} дней</strong>
        </p>

        {/* 2. График + плашка внутри */}
        <StatusGauge days={project.daysUntilPayment} />

        {/* Stats grid */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            width: "100%",
          }}
        >
          {/* К оплате */}
          <div style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>К оплате</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {project.totalRub.toLocaleString("ru")} ₽
            </span>
          </div>

          {/* Дата оплаты */}
          <div style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Дата оплаты</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>1 июля</span>
          </div>

          {/* Сервисов */}
          <div style={{ background: "#F7F9FC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Сервисов</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {project.services.length}
            </span>
          </div>

          {/* Уведомления */}
          <button
            onClick={() => onNavigate("notifications")}
            style={{
              background: "#F7F9FC",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              padding: "12px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Уведомления</div>
              <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>Не подключены</span>
            </div>
            <ChevronRight size={14} color="#D1D5DB" />
          </button>
        </div>
      </div>

      {/* CTA group — stacked on mobile, side-by-side on desktop */}
      <div className="cta-group">
        <button className="btn-primary">
          Пополнить
        </button>
        <button className="btn-secondary" onClick={() => onNavigate("details")}>
          Посмотреть детали <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .cta-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .btn-primary {
          flex: 1;
          background: #4F7DF3;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-secondary {
          flex: 1;
          background: #fff;
          color: #374151;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 14px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        @media (min-width: 769px) {
          .cta-group {
            flex-direction: row;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
