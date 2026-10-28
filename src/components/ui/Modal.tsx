import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E242E]/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-[#2B222C] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EED9D5] dark:border-[#493744] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8C6775] dark:text-[#A3919D] hover:text-[#593744] dark:hover:text-[#F8F0F3] hover:bg-[#FBF1ED] dark:hover:bg-[#382C3A] transition-colors focus-visible:outline-[#9E4F66] dark:focus-visible:outline-[#E8A2B6]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-8">
          <h3 id="modal-title" className="text-xl font-semibold text-[#593744] dark:text-[#F8F0F3]">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[#74505F] dark:text-[#C7B8C2] mt-1">{description}</p>
          )}
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
