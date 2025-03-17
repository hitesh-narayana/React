
import React from 'react';
import { cn } from '../lib/utils';

interface LoadingStateProps {
  variant?: 'default' | 'spinner' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

// It renders a loading state with different variants and sizes

const LoadingState = ({ 
  variant = 'default',  // default variant is 'default' wh1ich shows a simple loading animation
  size = 'md',  // default size is 'md' medium
  text = 'Loading...',  // default text is 'Loading...'
  className 
}: LoadingStateProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  // Different loading variants 
  // Spninner shows a spinning circle
  if (variant === 'spinner') {
    return (
      <div className={cn("flex flex-col items-center justify-center", className)}>
        <div className={cn("border-t-2 border-primary rounded-full animate-spin", sizeClasses[size])} />
        {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  // Dots shows a loading animation with dots
  if (variant === 'dots') {
    return (
      <div className={cn("flex flex-col items-center justify-center", className)}>
        <div className="flex space-x-2">
          <div className={cn("bg-primary rounded-full animate-pulse", size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4')} style={{ animationDelay: '0ms' }}></div>
          <div className={cn("bg-primary rounded-full animate-pulse", size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4')} style={{ animationDelay: '300ms' }}></div>
          <div className={cn("bg-primary rounded-full animate-pulse", size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4')} style={{ animationDelay: '600ms' }}></div>
        </div>
        {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  // Default loading state
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-4", className)}>
      <div className="relative">
        <div className={cn("rounded-full border-2 border-muted", sizeClasses[size])}></div>
        <div className={cn("absolute top-0 left-0 rounded-full border-t-2 border-l-2 border-primary animate-spin", sizeClasses[size])}></div>
      </div>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingState;
