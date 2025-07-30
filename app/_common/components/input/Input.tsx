import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type = "text", placeholder, error, disabled, name, ...rest },
    ref
  ) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "phone") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
    };

    return (
      <div className={styles.inputGroup}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          type={name === "phone" ? "tel" : type}
          placeholder={placeholder}
          className={styles.input}
          disabled={disabled}
          name={name}
          pattern={name === "phone" ? "[0-9]*" : undefined}
          inputMode={name === "phone" ? "numeric" : undefined}
          onInput={handleInput}
          {...rest}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
