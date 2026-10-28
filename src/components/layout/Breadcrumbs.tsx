import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#8C6775] ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#593744] transition-colors"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[#D99B9F]" />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="hover:text-[#9E4F66] transition-colors max-w-[200px] truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-medium text-[#593744] max-w-[240px] truncate"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
