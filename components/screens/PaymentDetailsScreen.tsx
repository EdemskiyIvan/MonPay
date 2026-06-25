"use client";

import { useState } from "react";
import { ProjectState, Screen, Service } from "@/lib/mockData";
import ServiceCard from "@/components/ServiceCard";
import ServiceBottomSheet from "@/components/ServiceBottomSheet";
import { ArrowLeft } from "lucide-react";

interface Props {
  project: ProjectState;
  onNavigate: (screen: Screen) => void;
}

export default function PaymentDetailsScreen({ project, onNavigate }: Props) {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Back */}
      <button
        onClick={() => onNavigate("dashboard")}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          color: "#4F7DF3", fontSize: 14, fontWeight: 500, padding: 0,
        }}
      >
        <ArrowLeft size={16} /> Назад к проекту
      </button>

      {/* Summary */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "20px" }}>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>К оплате</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
          {project.totalRub.toLocaleString("ru")} ₽
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "10px 0 0" }}>
          Оплата 1 июля. Мы продлим все сервисы самостоятельно.
        </p>
      </div>

      {/* Service list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: 2 }}>
          Сервисы · {project.services.length}
        </div>
        {project.services.map(service => (
          <ServiceCard key={service.id} service={service} onClick={() => setSelected(service)} />
        ))}
      </div>

      {/* Mobile pay button */}
      <div className="mobile-pay-wrap">
        <button
          onClick={() => onNavigate("payment")}
          style={{
            width: "100%", background: "#4F7DF3", color: "#fff",
            border: "none", borderRadius: 12, padding: "16px",
            fontSize: 15, fontWeight: 600, cursor: "pointer",
          }}
        >
          Оплатить {project.totalRub.toLocaleString("ru")} ₽
        </button>
      </div>

      <style>{`
        .mobile-pay-wrap { display: none; position: fixed; bottom: 64px; left: 0; right: 0;
          padding: 12px 16px; background: rgba(247,249,252,0.92);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 40; }
        @media (max-width: 768px) { .mobile-pay-wrap { display: block; } }
      `}</style>

      {/* Bottom sheet */}
      {selected && <ServiceBottomSheet service={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
