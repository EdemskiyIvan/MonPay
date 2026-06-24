"use client";

import { Service } from "@/lib/mockData";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: 12,
      padding: "14px 16px",
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
    }}>
      {/* Info + price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{service.provider}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{service.name}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", whiteSpace: "nowrap" }}>
              {service.price.toLocaleString("ru")} ₽
            </div>
            {service.currency === "usd" && (
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, whiteSpace: "nowrap" }}>
                ≈ ${service.usdAmount} по курсу
              </div>
            )}
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 8, lineHeight: 1.5 }}>
          {service.description}
        </div>
      </div>
    </div>
  );
}
