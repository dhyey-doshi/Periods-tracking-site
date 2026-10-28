import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const getBadgeVariant = (cat: string) => {
    switch (cat) {
      case 'menstrual-phases':
        return 'berry';
      case 'hormones-and-physiology':
        return 'lavender';
      case 'wellness-and-care':
        return 'blush';
      case 'body-signals':
        return 'amber';
      default:
        return 'warm';
    }
  };

  return (
    <Card
      variant="elevated"
      padding={featured ? 'xl' : 'lg'}
      hoverable
      className={`flex flex-col justify-between h-full group ${
        featured ? 'bg-gradient-to-br from-white to-[#FBF1ED]' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={getBadgeVariant(article.category)} size="sm">
            {article.categoryLabel}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-[#8C6775]">
            <Clock className="w-3.5 h-3.5 text-[#9E4F66]" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h3
            className={`font-editorial font-bold text-[#593744] group-hover:text-[#9E4F66] transition-colors leading-tight ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl'
            }`}
          >
            <Link to={`/encyclopedia/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          <p className="text-sm text-[#74505F] leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#593744] leading-relaxed line-clamp-3">
          {article.summary}
        </p>
      </div>

      {/* Footer / Read Link */}
      <div className="pt-6 mt-6 border-t border-[#EED9D5] flex items-center justify-between text-xs text-[#8C6775]">
        <span className="truncate max-w-[200px]">Reviewed: {article.lastReviewed}</span>
        <Link
          to={`/encyclopedia/${article.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-[#9E4F66] group-hover:text-[#893F55] group-hover:translate-x-0.5 transition-all"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
