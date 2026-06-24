"use client";

import { useState } from "react";
import { Screen } from "@/lib/mockData";
import { ArrowLeft, CreditCard, Smartphone, FileText, Wallet } from "lucide-react";

interface Props {
  total: number;
  onNavigate: (screen: Screen) => void;
}

type Method = "card" | "sbp" | "invoice" | "balance";

const methods: { id: Method; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: "card",    label: "Карта компании",      desc: "Visa / Mastercard / МИР",  icon: <CreditCard size={18} /> },
  { id: "sbp",     label: "СБП",                 desc: "Система быстрых платежей", icon: <Smartphone size={18} /> },
  { id: "invoice", label: "Счёт для юрлица",     desc: "Оплата по реквизитам",     icon: <FileText size={18} /> },
  { id: "balance", label: "Баланс проекта",       desc: "Предоплаченные средства",  icon: <Wallet size={18} /> },
];

export default function PaymentScreen({ total, onNavigate }: Props) {
  const [selected, setSelected] = useState<Method>("card");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Back */}
      <button
        onClick={() => onNavigate("details")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#4F7DF3",
          fontSize: 14,
          fontWeight: 500,
          padding: 0,
        }}
      >
        <ArrowLeft size={16} /> Назад к деталям
      </button>

      {/* Total */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          padding: "20px",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 6 }}>Итого</div>
        <div style={{ fontSize: 38, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
          {total.toLocaleString("ru")} ₽
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "10px 0 0" }}>
          После оплаты мы продлим нужные сервисы и обновим статус проекта.
        </p>
      </div>

      {/* Payment methods */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #F3F4F6" }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Способ оплаты</span>
        </div>
        <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {methods.map(m => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                border: selected === m.id ? "1.5px solid #4F7DF3" : "1.5px solid transparent",
                background: selected === m.id ? "#EEF3FE" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              <span style={{ color: selected === m.id ? "#4F7DF3" : "#6B7280" }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>{m.desc}</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: selected === m.id ? "none" : "2px solid #D1D5DB",
                    background: selected === m.id ? "#4F7DF3" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected === m.id && (
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Confirm */}
      <button
        onClick={() => onNavigate("success")}
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
        Подтвердить оплату
      </button>

      <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
        Оплата будет учтена в истории проекта. Документы будут доступны в разделе «Документы».
      </p>
    </div>
  );
}
