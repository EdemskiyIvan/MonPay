"use client";

import { useState } from "react";
import { X, Download, Copy, Check, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Service } from "@/lib/mockData";

interface Props {
  service: Service;
  onClose: () => void;
}

export default function ServiceBottomSheet({ service, onClose }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  async function copy(label: string, value: string) {
    try { await navigator.clipboard.writeText(value); } catch {}
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  function toggleReveal(label: string) {
    setRevealed(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  const hasCredentials = service.credentials && service.credentials.length > 0;

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 200,
      }} />

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff",
        borderRadius: "20px 20px 0 0",
        zIndex: 201,
        maxHeight: "88vh",
        overflowY: "auto",
        paddingBottom: 48,
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E5E7EB" }} />
        </div>

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          width: 32, height: 32, borderRadius: "50%",
          border: "none", background: "#F3F4F6",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <X size={16} color="#6B7280" />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "16px 20px 24px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: service.providerColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            color: "#fff", fontWeight: 700, fontSize: 28,
            boxShadow: `0 8px 24px ${service.providerColor}44`,
          }}>
            {service.provider[0]}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{service.provider}</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>{service.name}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#111827", marginTop: 14, lineHeight: 1 }}>
            {service.price.toLocaleString("ru")} ₽
          </div>
          {service.currency === "usd" && (
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
              ≈ ${service.usdAmount} · по курсу на день оплаты
            </div>
          )}
        </div>

        {/* Documents */}
        <div style={{ padding: "0 16px 12px" }}>
          <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB" }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Документы</span>
            </div>
            {[
              { label: "Счёт на оплату", hint: "PDF · Июль 2026" },
              { label: "Квитанция", hint: "PDF · последний платёж" },
            ].map((doc, i, arr) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 16px",
                borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div>
                  <div style={{ fontSize: 14, color: "#111827" }}>{doc.label}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{doc.hint}</div>
                </div>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#EEF3FE", border: "none", borderRadius: 8,
                  padding: "8px 12px", cursor: "pointer",
                  color: "#4F7DF3", fontSize: 13, fontWeight: 500,
                }}>
                  <Download size={14} /> Скачать
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        {hasCredentials && (
          <div style={{ padding: "0 16px" }}>
            <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Доступы</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                  Только для вас — не передавайте третьим лицам
                </div>
              </div>

              {service.credentials!.map((cred, i, arr) => {
                const isPass = cred.type === "password";
                const isVisible = revealed.has(cred.label);
                const display = isPass && !isVisible ? "••••••••••••" : cred.value;
                const isCopied = copied === cred.label;

                return (
                  <div key={i} style={{
                    padding: "13px 16px",
                    borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
                  }}>
                    <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>
                      {cred.label}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{
                        fontSize: 14, color: "#111827", flex: 1, minWidth: 0,
                        wordBreak: "break-all",
                        fontFamily: isPass ? "monospace" : "inherit",
                        letterSpacing: isPass && !isVisible ? "0.1em" : "normal",
                      }}>
                        {display}
                      </span>
                      <div style={{ display: "flex", gap: 10, flexShrink: 0, alignItems: "center" }}>
                        {cred.type === "url" && (
                          <a href={`https://${cred.value}`} target="_blank" rel="noreferrer"
                            style={{ color: "#9CA3AF", display: "flex", alignItems: "center" }}>
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {isPass && (
                          <button onClick={() => toggleReveal(cred.label)} style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#9CA3AF", display: "flex", alignItems: "center", padding: 0,
                          }}>
                            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        )}
                        <button onClick={() => copy(cred.label, cred.value)} style={{
                          background: "none", border: "none", cursor: "pointer", padding: 0,
                          color: isCopied ? "#10B981" : "#9CA3AF",
                          display: "flex", alignItems: "center",
                        }}>
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
