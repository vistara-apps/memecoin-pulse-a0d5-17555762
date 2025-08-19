
"use client";

import { Bell, BellOff } from 'lucide-react';

interface AlertToggleProps {
  isActive: boolean;
  onToggle: () => void;
  coinName: string;
  variant?: 'default' | 'active';
}

export function AlertToggle({ 
  isActive, 
  onToggle, 
  coinName, 
  variant = 'default' 
}: AlertToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-xs px-md py-sm rounded-md transition-all duration-base ${
        isActive
          ? 'bg-accent text-white shadow-card'
          : 'bg-surface border border-border hover:bg-border/50'
      }`}
    >
      {isActive ? <Bell size={16} /> : <BellOff size={16} />}
      <span className="text-caption font-medium">
        {isActive ? `Alert ON for ${coinName}` : `Set Alert for ${coinName}`}
      </span>
    </button>
  );
}
