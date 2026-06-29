"use client";

interface Props {
  cost: {
    totalCost: number;
    totalInputTokens: number;
    totalOutputTokens: number;
    totalLatency: number;
  };
}

export default function CostCards({ cost }: Props) {
  const cards = [
    {
      title: "Total Cost",
      value: `$${cost.totalCost.toFixed(5)}`,
      color: "text-green-400",
    },
    {
      title: "Input Tokens",
      value: cost.totalInputTokens.toLocaleString(),
      color: "text-cyan-400",
    },
    {
      title: "Output Tokens",
      value: cost.totalOutputTokens.toLocaleString(),
      color: "text-violet-400",
    },
    {
      title: "Latency",
      value: `${cost.totalLatency} ms`,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}