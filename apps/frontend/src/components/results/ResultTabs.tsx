"use client";

import { FileJson, Database, LayoutDashboard, ShieldCheck, DollarSign } from "lucide-react";

interface Props {
    active: string;
    setActive: (tab: string) => void;
}

const tabs = [

    {
        key: "intent",
        icon: FileJson,
        label: "Intent"
    },

    {
        key: "schema",
        icon: Database,
        label: "Schema"
    },

    {
        key: "appspec",
        icon: LayoutDashboard,
        label: "AppSpec"
    },

    {
        key: "validation",
        icon: ShieldCheck,
        label: "Validation"
    },

    {
        key: "cost",
        icon: DollarSign,
        label: "Cost"
    }

];

export default function ResultTabs({

    active,

    setActive

}: Props) {

    return (

        <div className="mb-6 flex flex-wrap gap-3">

            {

                tabs.map(tab => {

                    const Icon = tab.icon;

                    return (

                        <button

                            key={tab.key}

                            onClick={() => setActive(tab.key)}

                            className={`

flex
items-center
gap-2
rounded-xl
px-5
py-3
transition

${active === tab.key

                                    ?

                                    "bg-cyan-500 text-white"

                                    :

                                    "bg-white/5 text-slate-300 hover:bg-white/10"

                                }

`}

                        >

                            <Icon className="h-4 w-4" />

                            {tab.label}

                        </button>

                    );

                })

            }

        </div>

    );

}