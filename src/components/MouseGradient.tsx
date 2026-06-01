import { useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export default function MouseGradient({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  /* spring-smooth the mouse position for a lazy follow feel */
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 30 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 30 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(50);
    rawY.set(50);
  }, [rawX, rawY]);

  const gradient = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, var(--color-signal) 0%, var(--color-cobalt) 18%, var(--color-paper) 100%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onChange = (v: string) => el.style.setProperty("--g", v);
    onChange(gradient.get());
    const unsub = gradient.on("change", onChange);
    return () => {
      unsub?.();
    };
  }, [gradient]);

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        backgroundImage: "var(--g)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}
