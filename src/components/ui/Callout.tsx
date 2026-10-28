import React from 'react';
import { AlertCircle, BookOpen, Lightbulb, Sparkles, ShieldCheck } from 'lucide-react';

export interface CalloutProps {
  type?: 'insight' | 'myth-buster' | 'body-check' | 'clinical-note' | 'disclaimer';
  title?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'insight',
  title,
  text,
  className = '',
  children,
}) => {
  const config = {
    insight: {
      icon: <Sparkles className="w-5 h-5 text-[#A85F76] dark:text-[#E8A2B6]" />,
      bg: 'bg-[#F7EBF0] dark:bg-[#33202B]',
      border: 'border-[#E8CCD5] dark:border-[#4D212B]',
      text: 'text-[#763246] dark:text-[#F5A3B2]',
      defaultTitle: 'Biological Insight',
    },
    'myth-buster': {
      icon: <Lightbulb className="w-5 h-5 text-[#B85C27] dark:text-[#F3BF90]" />,
      bg: 'bg-[#FEF5EE] dark:bg-[#2A1D13]',
      border: 'border-[#F8D8BF] dark:border-[#4D321F]',
      text: 'text-[#874614] dark:text-[#F3BF90]',
      defaultTitle: 'Cycle Myth vs Reality',
    },
    'body-check': {
      icon: <BookOpen className="w-5 h-5 text-[#4A7853] dark:text-[#A8DEB3]" />,
      bg: 'bg-[#EFF6F1] dark:bg-[#1A261E]',
      border: 'border-[#C5DECA] dark:border-[#2D4C34]',
      text: 'text-[#2F5938] dark:text-[#A8DEB3]',
      defaultTitle: 'Body Awareness Cue',
    },
    'clinical-note': {
      icon: <AlertCircle className="w-5 h-5 text-[#B83A52] dark:text-[#F5A3B2]" />,
      bg: 'bg-[#FDF1F3] dark:bg-[#2B151C]',
      border: 'border-[#F5CDD3] dark:border-[#4D212B]',
      text: 'text-[#8E2235] dark:text-[#F5A3B2]',
      defaultTitle: 'Clinical Context',
    },
    disclaimer: {
      icon: <ShieldCheck className="w-5 h-5 text-[#74505F] dark:text-[#C7B8C2]" />,
      bg: 'bg-[#FBF1ED] dark:bg-[#211A22]',
      border: 'border-[#EED9D5] dark:border-[#493744]',
      text: 'text-[#593744] dark:text-[#F8F0F3]',
      defaultTitle: 'Educational Boundary',
    },
  }[type];

  return (
    <div
      role="region"
      aria-label={title || config.defaultTitle}
      className={`rounded-2xl border p-5 ${config.bg} ${config.border} ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 mt-0.5">{config.icon}</div>
        <div className="space-y-1">
          <h4 className={`text-sm font-semibold tracking-wide ${config.text}`}>
            {title || config.defaultTitle}
          </h4>
          <div className="text-sm text-[#593744] dark:text-[#F8F0F3] leading-relaxed">
            {text && <p>{text}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
