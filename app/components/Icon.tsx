'use client';

import { 
  TrendingUp, 
  Bell, 
  BarChart3, 
  Plus, 
  Check, 
  ArrowUp, 
  ArrowDown,
  AlertTriangle,
  Zap,
  Eye,
  Settings
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const icons = {
  'trending-up': TrendingUp,
  'bell': Bell,
  'bar-chart': BarChart3,
  'plus': Plus,
  'check': Check,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'alert': AlertTriangle,
  'zap': Zap,
  'eye': Eye,
  'settings': Settings,
};

export function Icon({ name, size = 'md', className = '' }: IconProps) {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    return null;
  }
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
}
