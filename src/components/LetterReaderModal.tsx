import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  RefreshCw, 
  Search, 
  ArrowRight,
  ClipboardPaste,
  Trash2,
  ChevronDown,
  ChevronUp,
  Edit3
} from 'lucide-react';
import { 
  fetchWhoIsOnline, 
  getCachedWhoIsOnline,
  parseLetterQueue, 
  generateAuditProof, 
  getBrasiliaTime, 
  getTimeUntilServerSave,
  OnlineCharacter, 
  LetterParseResult,
  WhoIsOnlineResult
} from '../services/whoIsOnlineService';
import { 
  saveRemoteBackup, 
  getLocalBackups, 
  searchLetterByNick, 
  LetterBackup 
} from '../services/letterBackupService';

interface LetterReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'pt' | 'en';
}

export const LetterReaderModal: React.FC<LetterReaderModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [letterText, setLetterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onlineData, setOnlineData] = useState<WhoIsOnlineResult | null>(() => getCachedWhoIsOnline());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [parseResult, setParseResult] = useState<LetterParseResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [proofCopied, setProofCopied] = useState(false);
  const [viewFilter, setViewFilter] = useState<'all' | 'online'>('all');
  const [isInputExpanded, setIsInputExpanded] = useState(true);

  // Recovery & History Tab
  const [showHistory, setShowHistory] = useState(false);
  const [localBackups, setLocalBackups] = useState<LetterBackup[]>([]);
  const [searchNickQuery, setSearchNickQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LetterBackup[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Live Server Clock
  const [serverTime, setServerTime] = useState(getBrasiliaTime());
  const [saveCountdown, setSaveCountdown] = useState(getTimeUntilServerSave().text);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Live timer for server clock
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setServerTime(getBrasiliaTime());
      setSaveCountdown(getTimeUntilServerSave().text);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Load online data on modal open (instant from cache, refresh in background)
  useEffect(() => {
    if (isOpen) {
      const cached = getCachedWhoIsOnline();
      if (cached) {
        setOnlineData(cached);
      }
      loadOnlinePlayers(false);
      setLocalBackups(getLocalBackups());
    }
  }, [isOpen]);

  const loadOnlinePlayers = async (force = false) => {
    const cached = getCachedWhoIsOnline();
    if (!cached || force) {
      setIsLoading(true);
    }
    setErrorMsg(null);

    try {
      const res = await fetchWhoIsOnline(force);
      setOnlineData(res);
      if (letterText.trim() && res.characters.length > 0) {
        const result = parseLetterQueue(letterText, res.characters);
        setParseResult(result);
      }
    } catch (err: any) {
      console.error(err);
      if (!onlineData && !cached) {
        setErrorMsg(err.message || 'Erro ao consultar Who is Online');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessQueue = async () => {
    if (!letterText.trim()) return;

    try {
      setErrorMsg(null);

      let currentOnline = onlineData || getCachedWhoIsOnline();
      if (!currentOnline || currentOnline.characters.length === 0) {
        setIsLoading(true);
        currentOnline = await fetchWhoIsOnline(true);
        setOnlineData(currentOnline);
        setIsLoading(false);
      }

      // Synchronous instant queue parsing
      const result = parseLetterQueue(letterText, currentOnline.characters);
      setParseResult(result);
      setIsInputExpanded(false); // Collapse input to give full focus to results

      // Save backup in background (Local + Firestore)
      const allNames = result.allItems.flatMap(it => [it.primaryName, it.makerName].filter(Boolean) as string[]);
      if (result.allItems[0]?.primaryName) {
        saveRemoteBackup(
          letterText,
          result.headerNote,
          result.allItems[0]?.primaryName,
          result.totalParsed,
          result.onlineCount,
          currentOnline.serverTimeBRT,
          allNames
        ).then(() => {
          setLocalBackups(getLocalBackups());
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Falha ao processar lista');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyName = (name: string, id: string) => {
    navigator.clipboard.writeText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyProof = () => {
    if (!parseResult) return;
    const proof = generateAuditProof(parseResult, serverTime, letterText);
    navigator.clipboard.writeText(proof);
    setProofCopied(true);
    setTimeout(() => setProofCopied(false), 2500);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLetterText(text);
        if (textareaRef.current) textareaRef.current.focus();
      }
    } catch (e) {
      if (textareaRef.current) textareaRef.current.focus();
    }
  };

  const handleRestoreBackup = (b: LetterBackup) => {
    setLetterText(b.rawText);
    setShowHistory(false);
    setIsInputExpanded(false);
    if (onlineData?.characters?.length) {
      const result = parseLetterQueue(b.rawText, onlineData.characters);
      setParseResult(result);
    }
  };

  const handleSearchNick = async () => {
    if (!searchNickQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await searchLetterByNick(searchNickQuery);
      setSearchResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleModalClose = () => {
    setLetterText('');
    setParseResult(null);
    setErrorMsg(null);
    setShowHistory(false);
    setIsInputExpanded(true);
    setCopiedId(null);
    setProofCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  const firstOnline = parseResult?.onlineList[0];
  const itemsToDisplay = parseResult
    ? (viewFilter === 'online' ? parseResult.onlineList : parseResult.allItems)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[94vh] flex flex-col bg-[#111214] border border-medieval-gold/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_15px_rgba(197,160,89,0.12)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar - Clean and Compact */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/60 border border-medieval-gold/30 flex items-center justify-center shrink-0">
              <img 
                src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1792224845/Letter.gif" 
                alt="Carta" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                {language === 'pt' ? 'Poupa Tempo Carta Online' : 'Online Letter Time Saver'}
              </h2>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {language === 'pt' ? 'Ao Vivo' : 'Live'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                showHistory 
                  ? 'bg-medieval-gold text-black border-medieval-gold' 
                  : 'bg-black/60 text-stone-300 border-white/10 hover:border-medieval-gold/50 hover:text-white'
              }`}
              title={language === 'pt' ? 'Consultar histórico de cartas anteriores' : 'Check past letters history'}
            >
              <span>{language === 'pt' ? 'Histórico' : 'History'}</span>
            </button>
            <button
              onClick={handleModalClose}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Server Clock & Status Bar - Ultra Compact */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5 bg-black/60 border-b border-white/5 text-[11px] font-mono">
          <div className="flex items-center gap-3 text-stone-400">
            <span>
              Server Time: <strong className="text-stone-200">{serverTime}</strong>
            </span>
            <span>
              SS (05:00): <strong className="text-amber-300">{saveCountdown}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <strong className="text-stone-200">{onlineData?.total ?? '...'}</strong> online
            </span>
            <button
              onClick={() => loadOnlinePlayers(true)}
              disabled={isLoading}
              title={language === 'pt' ? 'Atualizar lista de quem está online agora' : 'Refresh online players list'}
              className="p-1 text-stone-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-medieval-gold' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Collapsible History Section */}
          {showHistory ? (
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-medieval-gold font-bold text-xs uppercase tracking-wider">
                  {language === 'pt' ? 'Histórico de Consultas & Backups' : 'Query History & Backups'}
                </span>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-xs text-stone-400 hover:text-white"
                >
                  {language === 'pt' ? 'Voltar para Leitor' : 'Back to Reader'}
                </button>
              </div>

              {/* Search by Nickname */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={searchNickQuery}
                    onChange={e => setSearchNickQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearchNick()}
                    placeholder={language === 'pt' ? 'Digite um nick (Ex: Chic, Matheusttk)...' : 'Type a nick (e.g.: Chic, Matheusttk)...'}
                    className="w-full pl-8 pr-3 py-1.5 bg-black/80 border border-white/15 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-medieval-gold"
                  />
                </div>
                <button
                  onClick={handleSearchNick}
                  disabled={isSearching || !searchNickQuery.trim()}
                  className="px-3 py-1.5 bg-medieval-gold text-black rounded-lg text-xs font-bold hover:brightness-110 disabled:opacity-50"
                >
                  {isSearching ? '...' : (language === 'pt' ? 'Buscar' : 'Search')}
                </button>
              </div>

              {/* Search Results */}
              {searchResults !== null && (
                <div className="space-y-1.5 border-t border-white/10 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    {language === 'pt' ? `Cartas encontradas (${searchResults.length}):` : `Letters found (${searchResults.length}):`}
                  </span>
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">
                      {language === 'pt' ? 'Nenhuma carta registrada com este jogador.' : 'No recorded letters found containing this player.'}
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {searchResults.map(b => (
                        <div key={b.id} className="p-2 bg-black/40 border border-white/10 rounded-lg flex items-center justify-between gap-2 text-xs">
                          <div className="truncate">
                            <span className="font-bold text-white mr-1.5">{b.firstQueueName || 'Carta'}</span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {b.totalParsed} nomes • {b.onlineCount} on
                            </span>
                          </div>
                          <button
                            onClick={() => handleRestoreBackup(b)}
                            className="px-2 py-0.5 bg-medieval-gold/20 hover:bg-medieval-gold text-medieval-gold hover:text-black rounded text-[11px] font-bold"
                          >
                            {language === 'pt' ? 'Carregar' : 'Load'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Local Recent Backups */}
              <div className="space-y-1.5 border-t border-white/10 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {language === 'pt' ? 'Últimas cartas consultadas neste navegador:' : 'Recent letters queried on this browser:'}
                </span>
                {localBackups.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    {language === 'pt' ? 'Nenhuma consulta recente.' : 'No recent queries.'}
                  </p>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {localBackups.map(b => (
                      <div key={b.id} className="p-2 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between gap-2 text-xs">
                        <div className="truncate">
                          <span className="font-bold text-white mr-1.5">{b.firstQueueName || 'Carta'}</span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {b.totalParsed} nomes
                          </span>
                        </div>
                        <button
                          onClick={() => handleRestoreBackup(b)}
                          className="px-2 py-0.5 bg-medieval-gold/15 hover:bg-medieval-gold text-medieval-gold hover:text-black rounded text-[11px] font-bold shrink-0"
                        >
                          {language === 'pt' ? 'Restaurar' : 'Restore'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Input Section - Compact & Collapsible */
            <div className="space-y-2">
              {parseResult && !isInputExpanded ? (
                /* Collapsed Toolbar when result is shown to save maximum space */
                <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-stone-300 font-mono">
                    <span className="font-bold text-white">{parseResult.totalParsed} linhas verificadas</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-emerald-400 font-bold">{parseResult.onlineCount} online</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-stone-400">{parseResult.offlineCount} offline</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsInputExpanded(true)}
                      className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-medieval-gold/20 text-medieval-gold border border-medieval-gold/30 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{language === 'pt' ? 'Editar Carta' : 'Edit Letter'}</span>
                    </button>
                    <button
                      onClick={() => { setLetterText(''); setParseResult(null); setIsInputExpanded(true); }}
                      className="px-2 py-1 rounded-lg bg-black/60 hover:bg-red-500/20 text-stone-400 hover:text-red-300 border border-white/10 text-[11px]"
                    >
                      {language === 'pt' ? 'Limpar' : 'Clear'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Expanded Textarea */
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-300">
                      <span>{language === 'pt' ? 'TEXTO DA CARTA DO JOGO:' : 'IN-GAME LETTER TEXT:'}</span>
                    </label>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handlePasteFromClipboard}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 hover:bg-medieval-gold/20 text-stone-300 hover:text-medieval-gold border border-white/10 text-[11px]"
                      >
                        <ClipboardPaste className="w-3 h-3" />
                        <span>{language === 'pt' ? 'Colar' : 'Paste'}</span>
                      </button>
                      {letterText && (
                        <button
                          onClick={() => { setLetterText(''); setParseResult(null); }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 hover:bg-red-500/20 text-stone-400 hover:text-red-300 border border-white/10 text-[11px]"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{language === 'pt' ? 'Limpar' : 'Clear'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={letterText}
                      onChange={e => setLetterText(e.target.value)}
                      onKeyDown={e => {
                        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                          handleProcessQueue();
                        }
                      }}
                      rows={parseResult ? 6 : 10}
                      placeholder={language === 'pt' 
                        ? "Cole aqui a carta copiada do jogo...\n\nExemplo:\nSir'Cbastian\nWinters:\nN: Czolowy Denser\nlarry kapinga\nharlom third (Santiago God abascal)\nKravorn ( Print\nPacstor\nchic"
                        : "Paste here the letter text from game...\n\nExample:\nSir'Cbastian\nWinters:\nN: Czolowy Denser\nlarry kapinga\nharlom third (Santiago God abascal)\nKravorn ( Print\nPacstor\nchic"
                      }
                      className="w-full min-h-[220px] sm:min-h-[260px] p-3.5 bg-black/70 border border-white/15 rounded-xl text-sm font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-medieval-gold resize-y shadow-inner leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-stone-500 font-mono">
                      {language === 'pt' ? 'Ctrl+Enter para filtrar' : 'Ctrl+Enter to filter'}
                    </span>

                    <button
                      onClick={handleProcessQueue}
                      disabled={isLoading || !letterText.trim()}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-medieval-gold to-amber-500 text-black font-black uppercase tracking-wider text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <span>
                        {isLoading 
                          ? (language === 'pt' ? 'Verificando...' : 'Checking...') 
                          : (language === 'pt' ? 'Filtrar Fila Online' : 'Filter Online Queue')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Section - Discord Style Embed */}
          {parseResult && (
            <div className="space-y-2.5 animate-fadeIn">
              {/* Discord Top Banner: Primeiro online: Ratao • posição 11 */}
              <div className="p-3 rounded-xl bg-black/70 border-l-4 border-emerald-500 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0 animate-pulse"></span>
                  {firstOnline ? (
                    <div className="text-xs sm:text-sm text-stone-200 font-mono">
                      {language === 'pt' ? 'Primeiro online:' : 'First online:'}{' '}
                      <strong className="text-white font-black text-sm sm:text-base">
                        {firstOnline.copyName}
                      </strong>
                      <span className="text-stone-400 mx-1.5">•</span>
                      <span className="text-emerald-400 font-bold">
                        {language === 'pt' ? `posição ${firstOnline.originalIndex}` : `position ${firstOnline.originalIndex}`}
                      </span>
                      {firstOnline.onlineCharType === 'maker' && (
                        <span className="text-[11px] text-amber-300 ml-1.5">
                          (via maker)
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm text-amber-300 font-bold font-mono">
                      {language === 'pt' ? 'Nenhum jogador online no momento' : 'No players online right now'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {firstOnline && (
                    <button
                      onClick={() => handleCopyName(firstOnline.copyName, `top_${firstOnline.originalIndex}`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
                      title={language === 'pt' ? 'Copiar nome do 1º da fila' : 'Copy 1st in line name'}
                    >
                      {copiedId === `top_${firstOnline.originalIndex}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === `top_${firstOnline.originalIndex}` ? 'Copiado!' : `Copiar ${firstOnline.copyName}`}</span>
                    </button>
                  )}

                  <button
                    onClick={handleCopyProof}
                    className="px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-medieval-gold/20 text-stone-300 hover:text-medieval-gold border border-white/10 text-xs font-bold transition-all"
                    title={language === 'pt' ? 'Copiar relatório completo para Discord/WhatsApp' : 'Copy audit proof text for Discord'}
                  >
                    {proofCopied ? (language === 'pt' ? 'Copiado!' : 'Copied!') : (language === 'pt' ? 'Copiar Comprovante' : 'Copy Proof')}
                  </button>
                </div>
              </div>

              {/* Discord-style Embed Container */}
              <div className="rounded-xl bg-[#141518] border-l-4 border-medieval-gold border border-white/5 overflow-hidden shadow-md">
                {/* Embed Header Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/5 bg-black/30">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-white">
                      {language === 'pt' ? 'Carta online' : 'Online Letter'}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      ({parseResult.onlineCount} on • {parseResult.offlineCount} off)
                    </span>
                  </div>

                  {/* Filter Pills: Todas vs Apenas Online */}
                  <div className="flex items-center bg-black/60 p-0.5 rounded-lg border border-white/5 text-[11px]">
                    <button
                      onClick={() => setViewFilter('all')}
                      className={`px-2.5 py-0.5 rounded-md font-bold transition-all ${
                        viewFilter === 'all' 
                          ? 'bg-medieval-gold text-black shadow-sm' 
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {language === 'pt' ? `Todas (${parseResult.allItems.length})` : `All (${parseResult.allItems.length})`}
                    </button>
                    <button
                      onClick={() => setViewFilter('online')}
                      className={`px-2.5 py-0.5 rounded-md font-bold transition-all ${
                        viewFilter === 'online' 
                          ? 'bg-emerald-500 text-black shadow-sm' 
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {language === 'pt' ? `Apenas Online (${parseResult.onlineCount})` : `Only Online (${parseResult.onlineCount})`}
                    </button>
                  </div>
                </div>

                {/* Embed Rows - Ultra Clean & Compact line-by-line list */}
                <div className="p-2 space-y-0.5 max-h-[50vh] overflow-y-auto">
                  {itemsToDisplay.length === 0 ? (
                    <div className="p-4 text-center text-xs text-stone-500 italic">
                      {language === 'pt' ? 'Nenhum jogador online encontrado.' : 'No online players found.'}
                    </div>
                  ) : (
                    itemsToDisplay.map(item => {
                      const isFirst = item.isOnline && item.originalIndex === firstOnline?.originalIndex;
                      const copyKey = `row_${item.originalIndex}`;
                      const isCopied = copiedId === copyKey;

                      return (
                        <div
                          key={item.originalIndex}
                          className={`flex items-center justify-between py-1 px-2.5 rounded-lg text-xs font-mono transition-colors group ${
                            item.isOnline
                              ? isFirst
                                ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 shadow-sm'
                                : 'bg-emerald-950/20 border border-emerald-500/20 text-emerald-300'
                              : 'text-stone-400 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            {/* Line Number */}
                            <span className="w-5 text-right text-stone-500 text-[11px] shrink-0 font-mono">
                              {item.originalIndex}.
                            </span>

                            {/* Status Dot */}
                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                              item.isOnline
                                ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                                : 'bg-stone-600'
                            }`}></span>

                            {/* Player Name and Status Text */}
                            <div className="flex items-center gap-1.5 truncate">
                              <span className={`font-bold truncate ${
                                item.isOnline ? 'text-white' : 'text-stone-300'
                              }`}>
                                {item.primaryName}
                              </span>

                              {/* Maker in parentheses */}
                              {item.makerName && (
                                <span className={`text-[11px] truncate ${
                                  item.makerOnline ? 'text-emerald-400 font-bold' : 'text-stone-500'
                                }`}>
                                  ({item.makerName})
                                </span>
                              )}

                              {item.note && (
                                <span className="text-[10px] text-stone-500">
                                  [{item.note}]
                                </span>
                              )}

                              <span className="text-stone-600 font-sans">—</span>

                              <span className={`text-[11px] font-semibold shrink-0 ${
                                item.isOnline ? 'text-emerald-400' : 'text-stone-500'
                              }`}>
                                {item.isOnline ? 'Online' : 'Offline'}
                              </span>

                              {/* Small details */}
                              {item.isOnline && item.onlineCharType === 'maker' && (
                                <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/30 shrink-0">
                                  via maker
                                </span>
                              )}

                              {isFirst && (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-black px-1.5 py-0.2 rounded shrink-0">
                                  {language === 'pt' ? '1º da Vez' : '1st in line'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Copy Button */}
                          {item.isOnline && (
                            <button
                              onClick={() => handleCopyName(item.copyName, copyKey)}
                              className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-all"
                              title={`Copiar ${item.copyName}`}
                            >
                              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? (language === 'pt' ? 'Copiado' : 'Copied') : (language === 'pt' ? 'Copiar' : 'Copy')}</span>
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer - Ultra Compact */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/50 flex items-center justify-between text-[11px] text-stone-500 font-mono">
          <span>Miracle 7.4 • Who is Online</span>
          <button 
            onClick={handleModalClose}
            className="px-3 py-1 rounded-lg bg-black/80 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 transition-colors"
          >
            {language === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
