export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...buttonProps
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles =
    "px-4 py-2 rounded focus:outline-none focus:ring-2 flex items-center justify-center transition-colors duration-200 [&>svg]:mx-1";

  const variantStyles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700",
    ghost:
      "bg-transparent text-blue-500 hover:bg-blue-100 border border-blue-500 hover:text-blue-600 transition-colors duration-200 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900 dark:hover:text-blue-300",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
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
