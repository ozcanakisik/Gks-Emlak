import Link from "next/link";

type Variant = "primary" | "ghost" | "dark" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand/40",
  dark: "bg-ink text-white hover:bg-steel focus-visible:ring-ink/40",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-ink/30",
  ghost:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/40",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
