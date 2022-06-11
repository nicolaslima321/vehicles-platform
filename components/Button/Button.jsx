import * as React from 'react';

import styles from './Button.module.scss';

export default function Button({
  ariaLabel,
  className = '',
  children,
  color = 'primary',
  disabled = false,
  role,
  onClick,
  variant = '',
}) {

  function getCompleteClassName() {
    const colorClass = `button--${color}`;
    const variantClass = `button--${variant}`;
    const customClass = className;

    return `${styles.button} ${styles[colorClass]} ${styles[variantClass]} ${customClass}`;
  }

  return (
    <button
      className={getCompleteClassName()}
      aria-label={ariaLabel}
      role={role}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}