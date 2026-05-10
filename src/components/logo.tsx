export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="12"
        fill="var(--surface)"
        stroke="var(--border)"
      />
      <path
        d="M12 32.5L19.4 17.5L25.1 28.8L29 21.6L36 32.5H12Z"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M14.2 18.5L9.5 24L14.2 29.5"
        stroke="var(--foreground)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.8 18.5L38.5 24L33.8 29.5"
        stroke="var(--foreground)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="15" r="2.6" fill="var(--accent)" />
      <path
        d="M20.4 35.5H27.6"
        stroke="var(--foreground)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
