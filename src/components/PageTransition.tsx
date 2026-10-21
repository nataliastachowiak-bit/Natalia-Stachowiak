import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <div className={`animate-fade-in-subtle transition-opacity duration-300 ${className}`}>
      {children}
    </div>
  );
};
