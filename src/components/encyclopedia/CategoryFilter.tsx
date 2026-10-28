import React from 'react';
import type { CategoryInfo } from '../../types';

export interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter encyclopedia articles by topic"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#9E4F66] ${
              isSelected
                ? 'bg-[#593744] text-white shadow-xs'
                : 'bg-white hover:bg-[#FBF1ED] text-[#74505F] border border-[#EED9D5] hover:border-[#D99B9F]'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[#FBF1ED] text-[#8C6775]'
              }`}
            >
              {cat.articleCount}
            </span>
          </button>
        );
      })}
    </div>
  );
};
