'use client';

import { Icon } from './Icon';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'light';
  text?: string;
  className?: string;
}

export function LoadingIndicator({
  size = 'md',
  variant = 'primary',
  text,
  className = '',
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const variantClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    light: 'text-white',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {text && <span className="ml-3 text-sm font-medium">{text}</span>}
    </div>
  );
}

