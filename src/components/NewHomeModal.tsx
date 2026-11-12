import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export const NewHomeModal: React.FC = () => {
  const [isOldDomain, setIsOldDomain] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const targetUrl = 'https://openmiracle.com.br';

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    // Detecta se está acessando pelo workers.dev ou pages.dev
    if (host.includes('workers.dev') || host.includes('pages.dev')) {
      setIsOldDomain(true);
    }
  }, []);

  useEffect(() => {
    if (!isOldDomain) return;

    if (countdown <= 0) {
      window.location.href = `${targetUrl}${window.location.pathname}${window.location.search}`;
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOldDomain, countdown]);

  if (!isOldDomain) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative max-w-lg w-full bg-[#121110] border-2 border-medieval-gold rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
        <div className="inline-flex items-center gap-2 bg-medieval-gold/15 border border-medieval-gold/40 text-medieval-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
          <Sparkles className="w-4 h-4 text-medieval-gold" />
          Aviso Importante
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
          Estamos de Casa Nova! 🏰
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
          A <strong className="text-medieval-gold">Miracle Wiki Tools</strong> foi transferida para o seu novo servidor dedicado e agora possui domínio próprio oficial!
        </p>

        <div className="bg-black/50 border border-medieval-gold/30 rounded-xl p-4 mb-6">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
            Novo Endereço Oficial:
          </span>
          <a
            href={targetUrl}
            className="text-lg sm:text-xl font-mono font-bold text-medieval-gold hover:text-white transition-colors underline flex items-center justify-center gap-2"
          >
            openmiracle.com.br
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <a
          href={targetUrl}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-medieval-gold via-[#e6ca85] to-medieval-gold hover:brightness-110 text-black font-black uppercase tracking-wider py-3.5 px-6 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4"
        >
          <ShieldCheck className="w-5 h-5 text-black" />
          Acessar Novo Site Agora
        </a>

        <div className="text-xs font-mono text-gray-400">
          Redirecionando você automaticamente em{' '}
          <span className="text-medieval-gold font-bold text-sm">{countdown}</span> segundos...
        </div>
      </div>
    </div>
  );
};
export default NewHomeModal;
