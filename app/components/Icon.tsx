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
  Settings,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Filter,
  Search,
  ExternalLink,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
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
  'info': Info,
  'help': HelpCircle,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'close': X,
  'refresh': RefreshCw,
  'filter': Filter,
  'search': Search,
  'external-link': ExternalLink,
  'calendar': Calendar,
  'clock': Clock,
  'star': Star,
  'heart': Heart,
  'share': Share2,
};

export function Icon({ name, size = 'md', className = '', onClick }: IconProps) {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    return null;
  }
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${className} ${onClick ? 'cursor-pointer' : ''}`} 
      onClick={onClick}
      aria-hidden={!onClick}
      role={onClick ? 'button' : undefined}
    />
  );
}
