"use client";

import {

    motion

}

    from "framer-motion";

export default function ScrollIndicator() {

    return (

        <motion.div

            animate={{

                y: [

                    0,

                    12,

                    0

                ]

            }}

            transition={{

                repeat: Infinity,

                duration: 1.8

            }}

            className="absolute bottom-10 left-1/2 -translate-x-1/2"

        >

            <div className="flex flex-col items-center gap-2 text-slate-500">

                <span className="text-xs tracking-[.4em]">

                    SCROLL

                </span>

                <div className="h-10 w-[2px] rounded-full bg-white/20" />

            </div>

        </motion.div>

    );

}