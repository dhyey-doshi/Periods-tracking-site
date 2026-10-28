import React from 'react';

export interface BadgeProps {
  variant?: 'berry' | 'rose' | 'blush' | 'plum' | 'lavender' | 'sage' | 'amber' | 'cyan' | 'warm' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'warm',
  size = 'md',
  className = '',
  children,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider uppercase font-semibold',
    md: 'text-xs px-3 py-1 font-medium',
  };

  const variantStyles = {
    berry: 'bg-[#F7EBF0] text-[#8E2235] border border-[#E8CCD5]',
    rose: 'bg-[#FDF1F3] text-[#8E2235] border border-[#F5CDD3]',
    blush: 'bg-[#F2DCD9] text-[#593744] border border-[#EED9D5]',
    plum: 'bg-[#593744] text-white border border-[#3E242E]',
    lavender: 'bg-[#F8F2FA] text-[#5B376E] border border-[#E4D5EB]',
    sage: 'bg-[#EFF6F1] text-[#2F5938] border border-[#C5DECA]',
    amber: 'bg-[#FEF5EE] text-[#874614] border border-[#F8D8BF]',
    cyan: 'bg-[#EDF7F9] text-[#2D5E66] border border-[#C5E1E6]',
    warm: 'bg-[#FBF1ED] text-[#593744] border border-[#EED9D5]',
    neutral: 'bg-white text-[#593744] border border-[#EED9D5] shadow-xs',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
