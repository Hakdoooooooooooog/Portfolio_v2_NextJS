type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...buttonProps
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent [&>svg]:size-4";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline:
      "border border-border text-foreground hover:border-accent hover:text-accent",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-small",
    md: "px-4 py-2 text-small",
    lg: "px-4 py-2 text-body",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
