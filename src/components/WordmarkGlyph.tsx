export default function WordmarkGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 960 420"
      role="img"
      aria-label="XLclub wordmark"
      className={className}
      style={{
        background: "var(--color-ink)",
        border: "1px solid color-mix(in srgb, var(--color-paper) 10%, transparent)",
      }}
    >
      {/* 网格线 */}
      <g
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2"
        opacity=".18"
      >
        <path d="M72 70h816M72 140h816M72 210h816M72 280h816M72 350h816" />
        <path d="M120 40v340M240 40v340M360 40v340M480 40v340M600 40v340M720 40v340M840 40v340" />
      </g>

      {/* XL 字母标记 */}
      <path
        d="M158 104h56l78 92 78-92h56L319 226l111 132h-58l-82-98-82 98h-58l111-132L158 104Z"
        fill="var(--color-paper)"
      />
      <path
        d="M493 104h50v210h140v44H493V104Z"
        fill="var(--color-paper)"
      />

      {/* 强调色块 */}
      <path d="M739 104h52v254h-52z" fill="var(--color-signal)" />
      <path d="M806 104h43v254h-43z" fill="var(--color-coral)" />
      <path d="M92 92h42v42H92zM826 286h42v42h-42z" fill="var(--color-cobalt)" />

      {/* 强调线条 */}
      <path d="M94 328h184" stroke="var(--color-signal)" strokeWidth="10" />
      <path d="M682 86h184" stroke="var(--color-coral)" strokeWidth="10" />
    </svg>
  );
}
