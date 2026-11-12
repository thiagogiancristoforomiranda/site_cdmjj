"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterWordProps = {
  text: string;
  startDelay?: number;
  speed?: number;
  holdDelay?: number;
  deleteSpeed?: number;
};

export function TypewriterWord({
  text,
  startDelay = 650,
  speed = 115,
  holdDelay = 2200,
  deleteSpeed = 55,
}: TypewriterWordProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Em movimento reduzido, o fallback estático é exibido pelo CSS.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let index = 0;
    let deleting = false;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      if (!deleting) {
        index += 1;
        setVisibleChars(index);

        if (index >= text.length) {
          deleting = true;
          timerRef.current = window.setTimeout(tick, holdDelay);
        } else {
          timerRef.current = window.setTimeout(tick, speed);
        }

        return;
      }

      index -= 1;
      setVisibleChars(index);

      if (index <= 0) {
        deleting = false;
        timerRef.current = window.setTimeout(tick, startDelay);
      } else {
        timerRef.current = window.setTimeout(tick, deleteSpeed);
      }
    };

    timerRef.current = window.setTimeout(tick, startDelay);

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [deleteSpeed, holdDelay, speed, startDelay, text]);

  return (
    <>
      <span className="typewriter-wrap relative inline-grid align-baseline">
        <span className="invisible" aria-hidden="true">
          {text}
        </span>
        <span className="absolute inset-0 whitespace-nowrap">
          {text.slice(0, visibleChars)}
          <span
            aria-hidden="true"
            className="caret ml-1 inline-block h-[0.78em] w-[0.065em] translate-y-[0.05em] bg-red"
          />
        </span>
      </span>
      <span className="typewriter-fallback hidden">{text}</span>
    </>
  );
}
