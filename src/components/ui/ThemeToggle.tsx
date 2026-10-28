import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 p-2 rounded-full border border-[#EED9D5] dark:border-[#493744] bg-white dark:bg-[#2B222C] text-[#593744] dark:text-[#F8F0F3] hover:bg-[#FBF1ED] dark:hover:bg-[#382C3A] hover:border-[#D99B9F] dark:hover:border-[#E8A2B6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E4F66] dark:focus-visible:outline-[#E8A2B6] focus-visible:outline-offset-2 ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-[#E8A2B6] shrink-0" aria-hidden="true" />
      ) : (
        <Sun className="w-4 h-4 text-[#A85F76] shrink-0" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-xs font-medium pr-1 text-[#593744] dark:text-[#F8F0F3]">
          {isDark ? 'Light mode' : 'Dark mode'}
        </span>
      )}
    </button>
  );
};
