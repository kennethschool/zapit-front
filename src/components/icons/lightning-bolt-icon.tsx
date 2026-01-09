import { cn } from "@/lib/utils";

interface LightningBoltIconProps {
  className?: string;
}

export function LightningBoltIcon({ className }: LightningBoltIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="yellow"
      stroke="yellow"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 ${className}`}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
