import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  onTagClick?: (tag: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  featured = false,
  onTagClick,
}) => {
  const getCategoryBadgeVariant = (cat: string) => {
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

  const getEvidenceTierConfig = (tier: string) => {
    switch (tier) {
      case 'established':
        return {
          variant: 'sage' as const,
          label: 'Established Finding',
          icon: ShieldCheck,
        };
      case 'emerging':
        return {
          variant: 'amber' as const,
          label: 'Emerging Research',
          icon: Sparkles,
        };
      case 'limited':
      default:
        return {
          variant: 'blush' as const,
          label: 'Limited Evidence',
          icon: HelpCircle,
        };
    }
  };

  const evidence = getEvidenceTierConfig(article.evidenceTier);
  const EvidenceIcon = evidence.icon;

  return (
    <Card
      variant="elevated"
      padding={featured ? 'xl' : 'lg'}
      hoverable
      className={`flex flex-col justify-between h-full group ${
        featured ? 'bg-gradient-to-br from-white to-[#FBF1ED] dark:from-[#2B222C] dark:to-[#211A22]' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Category, Evidence Tier & Read Time */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={getCategoryBadgeVariant(article.category)} size="sm">
              {article.categoryLabel}
            </Badge>
            <Badge variant={evidence.variant} size="sm">
              <span className="flex items-center gap-1">
                <EvidenceIcon className="w-3 h-3" aria-hidden="true" />
                <span>{evidence.label}</span>
              </span>
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#8C6775] dark:text-[#A3919D] shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h3
            className={`font-editorial font-bold text-[#593744] dark:text-[#F8F0F3] group-hover:text-[#9E4F66] dark:group-hover:text-[#E8A2B6] transition-colors leading-tight ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl'
            }`}
          >
            <Link
              to={`/encyclopedia/${article.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-[#9E4F66] rounded"
            >
              {article.title}
            </Link>
          </h3>
          <p className="text-sm text-[#74505F] dark:text-[#C7B8C2] leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#593744] dark:text-[#F8F0F3] leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Article tags">
            {article.tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#FBF1ED] dark:bg-[#33202B] text-[#74505F] dark:text-[#C7B8C2] hover:bg-[#F2DCD9] dark:hover:bg-[#473441] hover:text-[#593744] dark:hover:text-[#F8F0F3] transition-colors cursor-pointer border border-[#EED9D5]/60 dark:border-[#493744]"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Read Link */}
      <div className="pt-4 mt-6 border-t border-[#EED9D5] dark:border-[#493744] flex items-center justify-between text-xs text-[#8C6775] dark:text-[#A3919D]">
        <span className="truncate max-w-[180px]">Updated: {article.lastReviewed}</span>
        <Link
          to={`/encyclopedia/${article.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-[#9E4F66] dark:text-[#E8A2B6] group-hover:text-[#893F55] dark:group-hover:text-[#F2DCD9] group-hover:translate-x-0.5 transition-all"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
};
