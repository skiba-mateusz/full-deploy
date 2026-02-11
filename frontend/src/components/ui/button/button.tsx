import { Loader } from "lucide-react";
import React from "react";

type ButtonVariant = "default" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export const Button = ({
  className,
  onClick,
  disabled,
  isLoading,
  variant = "default",
  children,
  ...restProps
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;
    onClick?.(e);
  };

  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...restProps}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
