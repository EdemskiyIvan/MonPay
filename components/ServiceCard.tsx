"use client";

import { useState } from "react";
import { Service } from "@/lib/mockData";

interface Props {
  service: Service;
  onClick: () => void;
}

function ProviderLogo({ service, size }: { service: Service; size: number }) {
  const [failed, setFailed] = useState(false);

  if (service.logoUrl && !failed) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: "1px solid #E5E7EB",
        overflow: "hidden", flexShrink: 0,
        background: "#F9FAFB",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={service.logoUrl}
          alt={service.provider}
          onError={() => setFailed(true)}
          style={{ width: size * 0.6, height: size * 0.6, objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: service.providerColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.4,
    }}>
      {service.provider[0]}
    </div>
  );
}

export { ProviderLogo };

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: "13px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <ProviderLogo service={service} size={40} />

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
    </button>
  );
}
