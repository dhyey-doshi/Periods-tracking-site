import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outline' | 'flat' | 'warm';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'lg',
  hoverable = false,
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    elevated:
      'bg-white border border-[#EED9D5] shadow-[0_4px_24px_-4px_rgba(89,55,68,0.06)]',
    outline:
      'bg-transparent border border-[#EED9D5]',
    flat:
      'bg-[#FBF1ED] border border-[#F2DDD9]',
    warm:
      'bg-[#FAF0ED] border border-[#EED9D5]',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(89,55,68,0.1)] hover:border-[#D99B9F]'
    : '';

  return (
    <div
      className={`rounded-3xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
