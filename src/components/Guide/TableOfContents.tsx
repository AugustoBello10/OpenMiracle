import React, { useEffect, useState } from 'react';
import { ListTree, ChevronRight } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  language?: 'pt' | 'en';
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title,
  language = 'pt',
}) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  const defaultTitle = language === 'pt' ? 'Neste Guia' : 'In this Guide';

  return (
    <div className="bg-black/40 border border-medieval-gold/20 rounded-xl p-4 my-6 shadow-md">
      <div className="flex items-center gap-2 mb-3 text-medieval-gold pb-2 border-b border-medieval-gold/15">
        <ListTree className="w-4 h-4" />
        <h5 className="font-bold uppercase tracking-wider text-xs">
          {title || defaultTitle}
        </h5>
      </div>

      <nav className="flex flex-col gap-1.5 text-xs font-mono">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2 text-left py-1 px-2 rounded transition-colors cursor-pointer ${
                isActive
                  ? 'bg-medieval-gold/15 text-medieval-gold font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              <ChevronRight
                className={`w-3 h-3 transition-transform ${
                  isActive ? 'text-medieval-gold translate-x-0.5' : 'text-stone-600'
                }`}
              />
              <span className="truncate">
                {index + 1}. {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
