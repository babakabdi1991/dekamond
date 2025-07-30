import React from "react";
import styles from "./Loading.module.scss";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = "medium", 
  text = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loading; 