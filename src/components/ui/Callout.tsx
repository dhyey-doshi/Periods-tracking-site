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
      icon: <Sparkles className="w-5 h-5 text-[#A85F76]" />,
      bg: 'bg-[#F7EBF0]',
      border: 'border-[#E8CCD5]',
      text: 'text-[#763246]',
      defaultTitle: 'Biological Insight',
    },
    'myth-buster': {
      icon: <Lightbulb className="w-5 h-5 text-[#B85C27]" />,
      bg: 'bg-[#FEF5EE]',
      border: 'border-[#F8D8BF]',
      text: 'text-[#874614]',
      defaultTitle: 'Cycle Myth vs Reality',
    },
    'body-check': {
      icon: <BookOpen className="w-5 h-5 text-[#4A7853]" />,
      bg: 'bg-[#EFF6F1]',
      border: 'border-[#C5DECA]',
      text: 'text-[#2F5938]',
      defaultTitle: 'Body Awareness Cue',
    },
    'clinical-note': {
      icon: <AlertCircle className="w-5 h-5 text-[#B83A52]" />,
      bg: 'bg-[#FDF1F3]',
      border: 'border-[#F5CDD3]',
      text: 'text-[#8E2235]',
      defaultTitle: 'Clinical Context',
    },
    disclaimer: {
      icon: <ShieldCheck className="w-5 h-5 text-[#74505F]" />,
      bg: 'bg-[#FBF1ED]',
      border: 'border-[#EED9D5]',
      text: 'text-[#593744]',
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
          <div className="text-sm text-[#593744] leading-relaxed">
            {text && <p>{text}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
