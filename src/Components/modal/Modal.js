import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      return window.removeEventListener("keydown", onKeyDown);
    };
  });

  const onKeyDown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const onBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={onBackDropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
};

export default Modal;
