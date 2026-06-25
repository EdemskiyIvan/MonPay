export type Criticality = "high" | "medium" | "low";
export type StatusLevel = "safe" | "attention" | "warning" | "critical";
export type Screen = "dashboard" | "details" | "payment" | "success" | "notifications";

export interface ServiceCredential {
  label: string;
  value: string;
  type: "url" | "email" | "password" | "text";
}

export interface Service {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  logoUrl?: string;
  price: number;
  currency: "rub" | "usd";
  usdAmount?: number;
  criticality: Criticality;
  description: string;
  credentials?: ServiceCredential[];
}

export interface ProjectState {
  name: string;
  daysUntilPayment: number;
  totalRub: number;
  services: Service[];
}

export const statusConfig: Record<StatusLevel, { color: string; label: string; gaugeColor: string; bgColor: string; borderColor: string }> = {
  safe:      { color: "#10B981", label: "Всё хорошо",                         gaugeColor: "#10B981", bgColor: "#ECFDF5", borderColor: "#A7F3D0" },
  attention: { color: "#F59E0B", label: "Скоро потребуется оплата",           gaugeColor: "#F59E0B", bgColor: "#FFFBEB", borderColor: "#FDE68A" },
  warning:   { color: "#F97316", label: "Лучше оплатить в ближайшее время",   gaugeColor: "#F97316", bgColor: "#FFF7ED", borderColor: "#FED7AA" },
  critical:  { color: "#EF4444", label: "Есть риск остановки проекта",        gaugeColor: "#EF4444", bgColor: "#FEF2F2", borderColor: "#FECACA" },
};

export function getStatus(days: number): StatusLevel {
  if (days >= 21) return "safe";
  if (days >= 7)  return "attention";
  if (days >= 3)  return "warning";
  return "critical";
}

export const criticalityLabel: Record<Criticality, string> = {
  high:   "Высокая",
  medium: "Средняя",
  low:    "Низкая",
};

export const criticalityColor: Record<Criticality, string> = {
  high:   "#EF4444",
  medium: "#F59E0B",
  low:    "#10B981",
};

export const initialProject: ProjectState = {
  name: "Платформа для дилеров",
  daysUntilPayment: 21,
  totalRub: 18740,
  services: [
    {
      id: "server",
      name: "Хостинг",
      provider: "Hetzner Cloud",
      providerColor: "#D72B2B",
      logoUrl: "https://www.google.com/s2/favicons?domain=hetzner.com&sz=64",
      price: 8500,
      currency: "rub",
      criticality: "high",
      description: "Сервер, на котором работает платформа, база данных и личный кабинет дилеров.",
      credentials: [
        { label: "Консоль", value: "console.hetzner.cloud", type: "url" },
        { label: "Email", value: "admin@dealerplatform.ru", type: "email" },
        { label: "Пароль", value: "Htz#Dlr2024!", type: "password" },
      ],
    },
    {
      id: "mail",
      name: "Корпоративная почта",
      provider: "Яндекс 360",
      providerColor: "#FF0000",
      logoUrl: "https://www.google.com/s2/favicons?domain=360.yandex.ru&sz=64",
      price: 3240,
      currency: "rub",
      criticality: "medium",
      description: "Email-адреса сотрудников, общий диск и инструменты команды.",
      credentials: [
        { label: "Панель управления", value: "admin.yandex.ru", type: "url" },
        { label: "Email", value: "admin@dealerplatform.ru", type: "email" },
        { label: "Пароль", value: "Yndx360!Dlr", type: "password" },
      ],
    },
    {
      id: "api",
      name: "Платёжный API",
      provider: "Stripe",
      providerColor: "#635BFF",
      logoUrl: "https://www.google.com/s2/favicons?domain=stripe.com&sz=64",
      price: 7000,
      currency: "usd",
      usdAmount: 59,
      criticality: "high",
      description: "Приём онлайн-платежей от клиентов внутри платформы. Оплата в USD — сумма может меняться с курсом.",
      credentials: [
        { label: "Dashboard", value: "dashboard.stripe.com", type: "url" },
        { label: "Email", value: "billing@dealerplatform.ru", type: "email" },
        { label: "API ключ", value: "sk_live_4xKRn8mQpTzW2vBd", type: "password" },
      ],
    },
    {
      id: "mgmt",
      name: "Управление инфраструктурой",
      provider: "MonPay",
      providerColor: "#4F7DF3",
      logoUrl: "/favicon.svg",
      price: 3000,
      currency: "rub",
      criticality: "low",
      description: "Контроль сроков, оплат и рисков — чтобы проект не остановился из-за пропущенного счёта.",
    },
  ],
};

export const paidProject: ProjectState = {
  ...initialProject,
  daysUntilPayment: 45,
};
