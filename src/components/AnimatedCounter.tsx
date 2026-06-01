import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  const numValue = parseInt(value, 10);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numValue, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        const int = Math.round(latest);
        if (value.length > 1 && value.startsWith("0")) {
          setDisplay(String(int).padStart(value.length, "0"));
        } else {
          setDisplay(String(int));
        }
      },
    });
    return () => controls.stop();
  }, [isInView, numValue, value]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : value}
    </span>
  );
}
