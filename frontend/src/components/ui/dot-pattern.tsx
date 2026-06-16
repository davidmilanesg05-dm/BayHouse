import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} className="fill-foreground/20" />
          {glow && (
            <circle
              cx={cx}
              cy={cy}
              r={cr * 3}
              className="fill-foreground/5 blur-[2px]"
            />
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#dot-pattern)" />
    </svg>
  );
}