"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {

  const [position, setPosition] = useState({

    x: 0,

    y: 0

  });

  useEffect(() => {

    const move = (e: MouseEvent) => {

      setPosition({

        x: e.clientX,

        y: e.clientY

      });

    };

    window.addEventListener(

      "mousemove",

      move

    );

    return () =>

      window.removeEventListener(

        "mousemove",

        move

      );

  }, []);

  return (

    <div

      className="pointer-events-none fixed inset-0 z-0"

    >

      <div

        className="absolute h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px] transition-all duration-300"

        style={{

          left: position.x - 250,

          top: position.y - 250

        }}

      />

    </div>

  );

}