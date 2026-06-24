"use client";

import { useState } from "react";
import { ArrowLeft, Mail, MessageCircle, Smartphone, Check, ChevronRight } from "lucide-react";
import { Screen } from "@/lib/mockData";

interface Props {
  onNavigate: (screen: Screen) => void;
}

type Channel = "email" | "telegram" | "sms";

interface ChannelState {
  enabled: boolean;
  connected: boolean;
  value: string;
}

// Email pre-connected for preview
const defaultState: Record<Channel, ChannelState> = {
  email:    { enabled: true,  connected: true,  value: "admin@dealerplatform.ru" },
  telegram: { enabled: false, connected: false, value: "" },
  sms:      { enabled: false, connected: false, value: "" },
};

const channels: {
  id: Channel;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  hint: string;
  inputLabel: string;
  connectLabel: string;
  disabled?: boolean;
}[] = [
  {
    id: "email",
    label: "Email",
    icon: <Mail size={20} />,
    placeholder: "you@company.ru",
    inputLabel: "Email-адрес",
    hint: "Получайте напоминания об оплате за 21, 7 и 1 день до даты.",
    connectLabel: "Подключить Email",
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: <MessageCircle size={20} />,
    placeholder: "@username или номер телефона",
    inputLabel: "Telegram-аккаунт",
    hint: "Бот MonPay напишет вам в Telegram. Начните диалог с ботом, чтобы подтвердить подключение.",
    connectLabel: "Открыть бота в Telegram",
  },
  {
    id: "sms",
    label: "SMS",
    icon: <Smartphone size={20} />,
    placeholder: "+7 900 000 00 00",
    inputLabel: "Номер телефона",
    hint: "SMS-уведомления приходят на российские номера. Стоимость включена в тариф управления.",
    connectLabel: "Подключить SMS",
    disabled: true,
  },
];

export default function NotificationsScreen({ onNavigate }: Props) {
  const [state, setState] = useState(defaultState);
  const [expanded, setExpanded] = useState<Channel | null>(null);
  const [saved, setSaved] = useState<Channel | null>(null);

  function toggle(id: Channel) {
    const next = !state[id].enabled;
    setState(prev => ({ ...prev, [id]: { ...prev[id], enabled: next } }));
    if (next && !state[id].connected) setExpanded(id);
  }

  function handleConnect(id: Channel) {
    if (!state[id].value.trim()) return;
    setState(prev => ({ ...prev, [id]: { ...prev[id], connected: true } }));
    setSaved(id);
    setExpanded(null);
    setTimeout(() => setSaved(null), 2000);
  }

  const connectedChannels = channels.filter(ch => state[ch.id].connected);
  const anyConnected = connectedChannels.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <button
        onClick={() => onNavigate("dashboard")}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          cursor: "pointer", color: "#4F7DF3", fontSize: 14, fontWeight: 500, padding: 0 }}
      >
        <ArrowLeft size={16} /> Назад к проекту
      </button>

      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Уведомления</h2>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
          Мы напомним об оплате заранее — выберите удобный способ.
        </p>
      </div>

      {channels.map(ch => {
        const s = state[ch.id];
        const isOpen = expanded === ch.id;
        const isConnected = s.connected;

        return (
          <div key={ch.id} style={{
            background: "#fff",
            border: `1px solid ${isConnected ? "#A7F3D0" : s.enabled ? "#4F7DF3" : "#E5E7EB"}`,
            borderRadius: 14,
            overflow: "hidden",
            opacity: ch.disabled ? 0.55 : 1,
            transition: "border-color 0.2s",
          }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                cursor: ch.disabled ? "default" : "pointer" }}
              onClick={() => !ch.disabled && !isConnected && setExpanded(isOpen ? null : ch.id)}
            >
              {/* Icon — green check when connected */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: isConnected ? "#D1FAE5" : s.enabled ? "#EEF3FE" : "#F3F4F6",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isConnected ? "#10B981" : s.enabled ? "#4F7DF3" : "#9CA3AF",
                transition: "background 0.2s, color 0.2s",
              }}>
                {isConnected ? <Check size={20} strokeWidth={2.5} /> : ch.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{ch.label}</span>
                {isConnected ? (
                  <div style={{ fontSize: 12, color: "#10B981", marginTop: 2 }}>
                    {s.value}
                  </div>
                ) : ch.disabled ? (
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Скоро</div>
                ) : null}
              </div>

              {!ch.disabled && !isConnected ? (
                <button
                  onClick={e => { e.stopPropagation(); toggle(ch.id); }}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: "none", flexShrink: 0,
                    background: s.enabled ? "#4F7DF3" : "#E5E7EB", cursor: "pointer", position: "relative",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 3,
                    left: s.enabled ? 23 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }} />
                </button>
              ) : isConnected ? (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setState(prev => ({ ...prev, [ch.id]: { ...prev[ch.id], connected: false, enabled: false, value: "" } }));
                  }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 12, color: "#9CA3AF", padding: "4px 8px",
                  }}
                >
                  Изменить
                </button>
              ) : (
                <ChevronRight size={16} color="#D1D5DB" />
              )}
            </div>

            {isOpen && s.enabled && !ch.disabled && !isConnected && (
              <div style={{ padding: "16px 18px 18px", borderTop: "1px solid #F3F4F6",
                display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{ch.hint}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{ch.inputLabel}</label>
                  <input
                    type="text"
                    placeholder={ch.placeholder}
                    value={s.value}
                    onChange={e => setState(prev => ({ ...prev, [ch.id]: { ...prev[ch.id], value: e.target.value } }))}
                    style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: "10px 12px",
                      fontSize: 14, color: "#111827", outline: "none", background: "#F9FAFB",
                      width: "100%", boxSizing: "border-box" }}
                  />
                </div>
                <button
                  onClick={() => handleConnect(ch.id)}
                  disabled={!s.value.trim()}
                  style={{
                    background: s.value.trim() ? "#4F7DF3" : "#E5E7EB",
                    color: s.value.trim() ? "#fff" : "#9CA3AF",
                    border: "none", borderRadius: 9, padding: "11px", fontSize: 14,
                    fontWeight: 600, cursor: s.value.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  {saved === ch.id ? <><Check size={15} /> Сохранено</> : ch.connectLabel}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
