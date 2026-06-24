export type Criticality = "high" | "medium" | "low";
export type StatusLevel = "safe" | "attention" | "warning" | "critical";
export type Screen = "dashboard" | "details" | "payment" | "success" | "notifications";

export interface Service {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  price: number;
  currency: "rub" | "usd";
  usdAmount?: number;
  criticality: Criticality;
  description: string;
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
      price: 8500,
      currency: "rub",
      criticality: "high",
      description: "Сервер, на котором работает платформа, база данных и личный кабинет дилеров.",
    },
    {
      id: "mail",
      name: "Корпоративная почта",
      provider: "Яндекс 360",
      providerColor: "#FF0000",
      price: 3240,
      currency: "rub",
      criticality: "medium",
      description: "Email-адреса сотрудников, общий диск и инструменты команды.",
    },
    {
      id: "api",
      name: "Платёжный API",
      provider: "Stripe",
      providerColor: "#635BFF",
      price: 7000,
      currency: "usd",
      usdAmount: 59,
      criticality: "high",
      description: "Приём онлайн-платежей от клиентов внутри платформы. Оплата в USD — сумма может меняться с курсом.",
    },
    {
      id: "mgmt",
      name: "Управление инфраструктурой",
      provider: "MonPay",
      providerColor: "#4F7DF3",
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
