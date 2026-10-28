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
    berry: 'bg-[#F7EBF0] text-[#8E2235] border border-[#E8CCD5] dark:bg-[#33202B] dark:text-[#F5A3B2] dark:border-[#4D212B]',
    rose: 'bg-[#FDF1F3] text-[#8E2235] border border-[#F5CDD3] dark:bg-[#2B151C] dark:text-[#F5A3B2] dark:border-[#4D212B]',
    blush: 'bg-[#F2DCD9] text-[#593744] border border-[#EED9D5] dark:bg-[#3B2A35] dark:text-[#F8F0F3] dark:border-[#493744]',
    plum: 'bg-[#593744] text-white border border-[#3E242E] dark:bg-[#4D333E] dark:border-[#5C3D4A]',
    lavender: 'bg-[#F8F2FA] text-[#5B376E] border border-[#E4D5EB] dark:bg-[#241A29] dark:text-[#DABCE6] dark:border-[#473252]',
    sage: 'bg-[#EFF6F1] text-[#2F5938] border border-[#C5DECA] dark:bg-[#1A261E] dark:text-[#A8DEB3] dark:border-[#2D4C34]',
    amber: 'bg-[#FEF5EE] text-[#874614] border border-[#F8D8BF] dark:bg-[#2A1D13] dark:text-[#F3BF90] dark:border-[#4D321F]',
    cyan: 'bg-[#EDF7F9] text-[#2D5E66] border border-[#C5E1E6] dark:bg-[#152326] dark:text-[#90D1DE] dark:border-[#25454C]',
    warm: 'bg-[#FBF1ED] text-[#593744] border border-[#EED9D5] dark:bg-[#211A22] dark:text-[#F8F0F3] dark:border-[#493744]',
    neutral: 'bg-white text-[#593744] border border-[#EED9D5] shadow-xs dark:bg-[#2B222C] dark:text-[#F8F0F3] dark:border-[#493744]',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
