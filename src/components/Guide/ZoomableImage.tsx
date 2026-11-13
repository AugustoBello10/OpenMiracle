import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, Maximize2 } from 'lucide-react';

export interface ZoomableImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  containerClassName?: string;
  language?: 'pt' | 'en';
}

export function ZoomableImage({
  src,
  alt,
  caption,
  className = '',
  containerClassName = '',
  language = 'pt',
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key and prevent background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md cursor-zoom-out select-none"
      >
        {/* Top bar with hint and close button */}
        <div 
          className="w-full max-w-5xl flex items-center justify-between mb-3 text-stone-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-medieval-gold/80">
            <Maximize2 className="w-4 h-4 text-medieval-gold" />
            <span>{caption || alt}</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close image zoom"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 border border-medieval-gold/40 text-medieval-gold hover:bg-medieval-gold hover:text-black transition-all cursor-pointer text-xs font-bold uppercase tracking-wider"
          >
            <X className="w-4 h-4" />
            <span>{language === 'pt' ? 'Fechar (ESC)' : 'Close (ESC)'}</span>
          </button>
        </div>

        {/* Zoomed Image Container */}
        <motion.div
          key="lightbox-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[95vw] max-h-[85vh] flex flex-col items-center justify-center"
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[95vw] max-h-[80vh] object-contain rounded-lg border-2 border-medieval-gold/50 shadow-[0_0_35px_rgba(0,0,0,0.9)] bg-black/80"
          />

          {(caption || alt) && (
            <p className="mt-3 text-center text-xs sm:text-sm font-sans text-stone-300 bg-black/80 px-4 py-1.5 rounded-full border border-medieval-gold/20 max-w-xl">
              {caption || alt}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-zoom-in inline-block overflow-hidden transition-transform duration-200 hover:scale-[1.01] ${containerClassName}`}
        title={language === 'pt' ? 'Clique para ampliar' : 'Click to enlarge'}
      >
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-200 group-hover:opacity-95`}
        />
        
        {/* Hover zoom overlay indicator */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none rounded">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 text-medieval-gold text-[11px] font-bold tracking-wider border border-medieval-gold/50 shadow-lg backdrop-blur-sm">
            <ZoomIn className="w-3.5 h-3.5" />
            {language === 'pt' ? 'Ampliar' : 'Zoom'}
          </span>
        </div>
      </div>

      {typeof document !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
