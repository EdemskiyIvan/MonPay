"use client";

import { Service } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";

interface Props {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{service.provider}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{service.name}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", whiteSpace: "nowrap" }}>
          {service.price.toLocaleString("ru")} ₽
        </div>
        {service.currency === "usd" && (
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>≈ ${service.usdAmount}</div>
        )}
      </div>
      <ChevronRight size={14} color="#D1D5DB" style={{ flexShrink: 0 }} />
    </button>
  );
}
