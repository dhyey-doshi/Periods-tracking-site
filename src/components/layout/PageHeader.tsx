import React from 'react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

export interface PageHeaderProps {
  kicker?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  description,
  breadcrumbs,
  actions,
  centered = false,
  className = '',
}) => {
  return (
    <div
      className={`pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-[#EED9D5] ${
        centered ? 'text-center' : ''
      } ${className}`}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className={`mb-6 ${centered ? 'flex justify-center' : ''}`}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {kicker && (
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9E4F66] mb-2.5">
          {kicker}
        </span>
      )}

      <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#593744] leading-[1.15]">
        {title}
      </h1>

      <p
        className={`mt-4 text-base sm:text-lg text-[#74505F] leading-relaxed max-w-3xl ${
          centered ? 'mx-auto' : ''
        }`}
      >
        {description}
      </p>

      {actions && (
        <div
          className={`mt-6 flex flex-wrap gap-3 ${
            centered ? 'justify-center' : 'items-center'
          }`}
        >
          {actions}
        </div>
      )}
    </div>
  );
};
