import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "medium",
  ...rest
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
