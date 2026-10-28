import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  external = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#9E4F66] hover:bg-[#893F55] active:bg-[#763246] text-white shadow-xs hover:shadow focus-visible:outline-[#9E4F66] dark:focus-visible:outline-[#E8A2B6]',
    secondary:
      'bg-[#593744] hover:bg-[#3E242E] active:bg-[#2A161E] text-white dark:bg-[#4D333E] dark:hover:bg-[#5C3D4A] dark:text-[#F8F0F3] shadow-xs hover:shadow focus-visible:outline-[#593744] dark:focus-visible:outline-[#E8A2B6]',
    outline:
      'border border-[#EED9D5] hover:border-[#D99B9F] bg-white/80 hover:bg-white text-[#593744] dark:border-[#493744] dark:hover:border-[#E8A2B6] dark:bg-[#2B222C] dark:hover:bg-[#382C3A] dark:text-[#F8F0F3] focus-visible:outline-[#9E4F66] dark:focus-visible:outline-[#E8A2B6]',
    subtle:
      'bg-[#F2DCD9] hover:bg-[#EAD5D7] active:bg-[#E2C7CA] text-[#593744] dark:bg-[#3B2A35] dark:hover:bg-[#473441] dark:text-[#F8F0F3] focus-visible:outline-[#593744] dark:focus-visible:outline-[#E8A2B6]',
    ghost:
      'hover:bg-[#FBF1ED] text-[#74505F] hover:text-[#593744] dark:hover:bg-[#382C3A] dark:text-[#C7B8C2] dark:hover:text-[#F8F0F3] focus-visible:outline-[#9E4F66] dark:focus-visible:outline-[#E8A2B6]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
