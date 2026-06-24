"use client";

import { statusConfig, getStatus, StatusLevel } from "@/lib/mockData";

const badgeLabel: Record<StatusLevel, string> = {
  safe:      "Всё хорошо",
  attention: "Скоро оплата",
  warning:   "Оплатите сейчас",
  critical:  "Риск остановки",
};

interface Props {
  days: number;
}

const CX    = 120;
const CY    = 108;
const R     = 92;
const START = 140;   // lower-left = green/safe
const SPAN  = 260;   // 100° gap at bottom
const SW    = 16;
const SEGS  = 120;
const MAX   = 30;    // gauge covers 30 days total
const TICKS = 30;

function pt(deg: number, radius = R) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function arc(a1: number, a2: number) {
  const p1 = pt(a1);
  const p2 = pt(a2);
  const span = ((a2 - a1) + 360) % 360;
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${span > 180 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
}

// 3-stop gradient: green → bright yellow → red
function lerp(t: number): string {
  const stops: [number, number, number, number][] = [
    [0,   239, 68,  68 ],  // red   #EF4444
    [0.5, 253, 224, 71 ],  // yellow #FDE047
    [1,   16,  185, 129],  // green #10B981
  ];
  t = Math.max(0, Math.min(1, t));
  let a = stops[0], b = stops[1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i][0] && t <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  }
  const f = (t - a[0]) / (b[0] - a[0]);
  const m = (x: number, y: number) => Math.round(x + f * (y - x));
  return `rgb(${m(a[1], b[1])},${m(a[2], b[2])},${m(a[3], b[3])})`;
}

export default function StatusGauge({ days }: Props) {
  const status = getStatus(days);
  const cfg    = statusConfig[status];

  // pos: 0 = 0 days left (red/critical end), 1 = 30 days left (green/safe end)
  const pos         = Math.min(days, MAX) / MAX;
  const markerAngle = START + (1 - pos) * SPAN;   // 21 days → pos=0.7 → 9 ticks from green
  const marker      = pt(markerAngle);
  const markerColor = lerp(pos);                   // colour at current position

  const tickOuter    = R - SW / 2 - 2;
  const tickInner    = tickOuter - 8;

  // Day 21 = tick 9 from the green end (30−21=9 out of 30)
  const tick21Angle  = START + (1 - 21 / MAX) * SPAN;
  const tick21Label  = pt(tick21Angle, R - SW / 2 - 22);

  const endAngle = START + SPAN;
  const gapTopY  = CY + R * Math.sin((endAngle * Math.PI) / 180);
  const gapBotY  = CY + R;
  const gapH     = gapBotY - gapTopY;
  const badgeH   = gapH - 12;
  const badgeY   = gapTopY + 6;
  const badgeW   = 110;
  const badgeX   = CX - badgeW / 2;
  const SVG_H    = Math.ceil(gapBotY) + 14;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={240} height={SVG_H} viewBox={`0 0 240 ${SVG_H}`}>

        {/* Gradient arc: green (left) → yellow (top) → red (right) */}
        {Array.from({ length: SEGS }, (_, i) => {
          const t1 = i / SEGS;
          const t2 = (i + 1) / SEGS;
          return (
            <path key={i}
              d={arc(START + t1 * SPAN, START + t2 * SPAN)}
              fill="none" stroke={lerp(1 - t1)} strokeWidth={SW} strokeLinecap="butt"
            />
          );
        })}

        {/* Round end-caps */}
        <circle cx={pt(START).x}        cy={pt(START).y}        r={SW / 2} fill={lerp(1)} />
        <circle cx={pt(START + SPAN).x} cy={pt(START + SPAN).y} r={SW / 2} fill={lerp(0)} />

        {/* 30 tick marks */}
        {Array.from({ length: TICKS + 1 }, (_, i) => {
          const angle = START + (i / TICKS) * SPAN;
          const o     = pt(angle, tickOuter);
          const inn   = pt(angle, tickInner);
          const is21  = i === TICKS - 21;   // tick 9 from green = tick 21 from red
          if (is21) return null;
          return (
            <line key={i}
              x1={o.x} y1={o.y} x2={inn.x} y2={inn.y}
              stroke="white" strokeWidth={1.5} opacity={0.5}
            />
          );
        })}

        {/* Day-21 reference line (tick 9 from green end) */}
        {(() => {
          const o   = pt(tick21Angle, R + SW / 2 + 4);
          const inn = pt(tick21Angle, R - SW / 2 - 28);
          return (
            <line x1={o.x} y1={o.y} x2={inn.x} y2={inn.y}
              stroke="white" strokeWidth={2} strokeDasharray="3 2" />
          );
        })()}
        <text x={tick21Label.x} y={tick21Label.y + 4}
          textAnchor="middle" fontSize={10} fontWeight={700} fill="white"
          fontFamily="-apple-system, sans-serif">21</text>

        {/* Marker */}
        <circle cx={marker.x} cy={marker.y} r={13} fill="white"
          style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.15))" }} />
        <circle cx={marker.x} cy={marker.y} r={6} fill={markerColor} />

        {/* Center number — 3 fixed colours by status */}
        <text x={CX} y={CY + 8} textAnchor="middle" fontSize={48} fontWeight={800}
          fill={status === "safe" ? "#10B981" : status === "attention" ? "#FBBF24" : "#EF4444"}
          fontFamily="-apple-system, sans-serif">{days}</text>
        <text x={CX} y={CY + 28} textAnchor="middle" fontSize={12} fill="#9CA3AF"
          fontFamily="-apple-system, sans-serif">
          {days === 1 ? "день" : days < 5 ? "дня" : "дней"}
        </text>

        {/* Badge in gap */}
        <rect x={badgeX} y={badgeY} width={badgeW} height={badgeH} rx={6}
          fill={cfg.bgColor} stroke={cfg.borderColor} strokeWidth={1} />
        <text x={CX} y={badgeY + badgeH / 2 + 4}
          textAnchor="middle" fontSize={10} fontWeight={600} fill={cfg.color}
          fontFamily="-apple-system, sans-serif">{badgeLabel[status]}</text>

      </svg>
    </div>
  );
}
