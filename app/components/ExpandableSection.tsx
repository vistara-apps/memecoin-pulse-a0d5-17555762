'use client';

import { ReactNode, useState } from 'react';
import { Icon } from './Icon';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  className = '',
  titleClassName = '',
  contentClassName = '',
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`border border-border rounded-lg overflow-hidden ${className}`}>
      <button
        className={`w-full flex items-center justify-between p-3 bg-surface text-left font-medium transition-colors duration-base hover:bg-primary/5 ${titleClassName}`}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        <Icon
          name={isExpanded ? 'arrow-up' : 'arrow-down'}
          size="sm"
          className="transition-transform duration-base"
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-base ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-3 border-t border-border ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

