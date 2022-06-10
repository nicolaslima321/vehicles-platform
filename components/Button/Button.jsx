import * as React from 'react';

import './Button.module.scss';

export default function Button({
  ariaLabel,
  className = '',
  children,
  color = 'primary',
  role,
  onClick,
  variant = '',
}) {

  function getCompleteClassName() {
    const colorClass = `button--${color}`;
    console.log(colorClass);

    return `button ${colorClass} ${className} ${variant}`.trim();
  }

  return (
    <button
      className={getCompleteClassName()}
      aria-label={ariaLabel}
      role={role}
      onClick={onClick}
    >
      {children}
    </button>
  )
}