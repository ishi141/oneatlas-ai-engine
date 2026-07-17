"use client";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  {
    id: "intent",
    label: "Intent",
  },
  {
    id: "schema",
    label: "Schema",
  },
  {
    id: "appspec",
    label: "App Spec",
  },
  {
    id: "validation",
    label: "Validated",
  },
];

export default function ResultTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="overflow-x-auto">

      <div
        className="
          inline-flex
          min-w-max
          gap-2
          rounded-2xl
          border
          border-white/5
          bg-[#111111]
          p-2
        "
      >

        {tabs.map((tab) => {

          const selected = active === tab.id;

          return (

            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  selected
                    ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-900/30"
                    : "text-zinc-400 hover:bg-[#1b1b1b] hover:text-white"
                }
              `}
            >

              {tab.label}

            </button>

          );

        })}

      </div>

    </div>
  );
}