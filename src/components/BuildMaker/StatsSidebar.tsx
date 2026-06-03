import React, { useState, useEffect } from 'react';
import { CalculatedStats } from '../../utils/formulas';
import { cn } from '../../lib/utils';
import { 
  VitalsCard, SkillsCard, CombatCard, RegenCard, ProtectionsCard, SpecialsCard, RunesCard
} from './ModularStatsCards';
import { VocationType } from '../../types/build';
import { 
  Shield, Sword, Heart, Zap, Weight, Move, Flame, Snowflake, 
  Zap as Energy, Mountain, User, Sparkles, Activity, ShieldAlert, Award,
  ChevronDown, ChevronUp, Sliders, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';

interface StatsSidebarProps {
  title?: string;
  stats: CalculatedStats;
  compareStats: CalculatedStats | null;
  showCompare: boolean;
  vocation: VocationType;
  language: Language;
}

export interface SidebarLiveSettings {
  preset: string; // 'all' | 'knight-sword' | 'knight-axe' | 'knight-club' | 'paladin' | 'mage' | 'essential' | 'custom'
  collapsedSections: Record<string, boolean>;

  // Vital Attributes
  showHp: boolean;
  showMp: boolean;
  showCap: boolean;
  showSpeed: boolean;

  // Weapons and Skills Training
  showMagic: boolean;
  showSword: boolean;
  showAxe: boolean;
  showClub: boolean;
  showDistance: boolean;
  showShielding: boolean;

  // Combat Attributes
  showWeaponAtk: boolean;
  showMaxMelee: boolean;
  showMaxDist: boolean;
  showMaxDef: boolean;
  showArmor: boolean;
  showPhysReduction: boolean;

  // Resistances and Elements %
  showPhysProt: boolean;
  showFireProt: boolean;
  showIceProt: boolean;
  showEnergyProt: boolean;
  showEarthProt: boolean;
  showManaDrainProt: boolean;
  showAllElementsProt: boolean;
  showArrowGuard: boolean;
  showMitigation: boolean;

  // Special Stats Modifiers
  showCrit: boolean;
  showLifeLeech: boolean;
  showBurning: boolean;
  showManaLeech: boolean;
  showDodge: boolean;
  showVibrancy: boolean;
  showAbsorbMana: boolean;
  showReflectFire: boolean;
  showReflectEnergy: boolean;
  showReflectPhys: boolean;
  showReflectElements: boolean;
  showAbsorbHealth: boolean;
  showDestruction: boolean;

  // Runes
  showRunes: boolean;
}

export const DEFAULT_SETTINGS: SidebarLiveSettings = {
  preset: 'all',
  collapsedSections: {},
  showHp: true,
  showMp: true,
  showCap: true,
  showSpeed: true,
  showMagic: true,
  showSword: true,
  showAxe: true,
  showClub: true,
  showDistance: true,
  showShielding: true,
  showWeaponAtk: true,
  showMaxMelee: true,
  showMaxDist: true,
  showMaxDef: true,
  showArmor: true,
  showPhysReduction: true,
  showPhysProt: true,
  showFireProt: true,
  showIceProt: true,
  showEnergyProt: true,
  showEarthProt: true,
  showManaDrainProt: true,
  showAllElementsProt: true,
  showArrowGuard: true,
  showMitigation: true,
  showCrit: true,
  showLifeLeech: true,
  showBurning: true,
  showManaLeech: true,
  showDodge: true,
  showVibrancy: true,
  showAbsorbMana: true,
  showReflectFire: true,
  showReflectEnergy: true,
  showReflectPhys: true,
  showReflectElements: true,
  showAbsorbHealth: true,
  showDestruction: true,
  showRunes: true,
};

const getPresetSettings = (presetName: string): SidebarLiveSettings => {
  const base = { ...DEFAULT_SETTINGS, preset: presetName };
  switch (presetName) {
    case 'knight-sword':
      return {
        ...base,
        showMagic: false,
        showAxe: false,
        showClub: false,
        showDistance: false,
        showMaxDist: false,
        showRunes: true,
      };
    case 'knight-axe':
      return {
        ...base,
        showMagic: false,
        showSword: false,
        showClub: false,
        showDistance: false,
        showMaxDist: false,
        showRunes: true,
      };
    case 'knight-club':
      return {
        ...base,
        showMagic: false,
        showSword: false,
        showAxe: false,
        showDistance: false,
        showMaxDist: false,
        showRunes: true,
      };
    case 'paladin':
      return {
        ...base,
        showMagic: false,
        showSword: false,
        showAxe: false,
        showClub: false,
        showMaxMelee: false,
        showRunes: true,
      };
    case 'mage':
      return {
        ...base,
        showSword: false,
        showAxe: false,
        showClub: false,
        showDistance: false,
        showMaxMelee: false,
        showMaxDist: false,
        showRunes: true,
      };
    case 'essential':
      return {
        ...base,
        showCap: false,
        showSpeed: false,
        showArrowGuard: false,
        showMitigation: false,
        showDodge: false,
        showVibrancy: false,
        showAbsorbMana: false,
        showReflectFire: false,
        showReflectEnergy: false,
        showReflectPhys: false,
        showReflectElements: false,
        showAbsorbHealth: false,
        showRunes: true,
      };
    case 'all':
    default:
      return base;
  }
};

const getPresetsForVocation = (vocation: VocationType, language: Language) => {
  const normVoc = vocation ? vocation.toLowerCase() : '';
  const todosLabel = language === 'pt' ? 'Todos' : 'All';
  const essentialLabel = language === 'pt' ? 'Filtro Essencial' : 'Essential Filter';

  if (normVoc === 'knight') {
    return [
      { id: 'all', label: todosLabel },
      { id: 'knight-sword', label: 'Kn.Sword' },
      { id: 'knight-axe', label: 'Kn.Axe' },
      { id: 'knight-club', label: 'Kn.Club' },
      { id: 'essential', label: essentialLabel }
    ];
  } else if (normVoc === 'paladin') {
    return [
      { id: 'all', label: todosLabel },
      { id: 'paladin', label: 'Paladin' },
      { id: 'essential', label: essentialLabel }
    ];
  } else if (normVoc === 'sorcerer' || normVoc === 'druid') {
    return [
      { id: 'all', label: todosLabel },
      { id: 'mage', label: 'Mage' },
      { id: 'essential', label: essentialLabel }
    ];
  }
  return [
    { id: 'all', label: todosLabel },
    { id: 'knight-sword', label: 'Kn.Sword' },
    { id: 'knight-axe', label: 'Kn.Axe' },
    { id: 'knight-club', label: 'Kn.Club' },
    { id: 'paladin', label: 'Paladin' },
    { id: 'mage', label: 'Mage' },
    { id: 'essential', label: essentialLabel }
  ];
};

const LOCAL_STORAGE_KEY = 'miracle_wiki_buildmaker_sidebar_v1';

export const StatRow: React.FC<{ 
  label: string; 
  value: number | string; 
  delta?: number | string; 
  unit?: string; 
  icon?: any;
  showDelta: boolean;
  deltaType?: 'positive' | 'negative' | 'neutral';
}> = ({ label, value, delta, unit = '', icon: Icon, showDelta, deltaType }) => {
  const isNumericDelta = typeof delta === 'number';
  const hasDelta = delta !== undefined && delta !== 0 && delta !== '0' && delta !== '0%';
  const isPositive = deltaType ? deltaType === 'positive' : (isNumericDelta ? (delta as number) > 0 : false);

  return (
    <div className="flex items-center justify-between py-1.5 border-b border-medieval-gold/5 last:border-0 group">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-medieval-gold/50 group-hover:text-medieval-gold transition-colors" />}
        <span className="text-xs text-medieval-muted/80">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-medieval-gold">{value}{unit}</span>
        {showDelta && hasDelta && (
          <span className={cn(
            "text-[10px] font-bold px-1 rounded-sm font-mono",
            isPositive ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
          )}>
            {isNumericDelta ? ((delta as number) > 0 ? `+${delta}` : delta) : delta}{unit}
          </span>
        )}
      </div>
    </div>
  );
};

export const SkillRow: React.FC<{
  label: string;
  base: number;
  gear: number;
  total: number;
  compareTotal?: number;
  showCompare: boolean;
  icon?: any;
}> = ({ label, base, gear, total, compareTotal, showCompare, icon: Icon }) => {
  const delta = showCompare && compareTotal !== undefined ? total - compareTotal : 0;
  return (
    <div className="py-2 border-b border-medieval-gold/5 last:border-0 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={13} className="text-medieval-gold/40 group-hover:text-medieval-gold/80 transition-colors" />}
          <span className="text-xs font-semibold text-medieval-muted">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-medieval-muted/40">Base: {base}</span>
          {gear > 0 ? (
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/5 px-1 rounded">+{gear} Equip</span>
          ) : gear < 0 ? (
            <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/5 px-1 rounded">{gear} Equip</span>
          ) : null}
          <span className="text-sm font-mono text-medieval-gold font-bold">{total}</span>
          {showCompare && delta !== 0 && (
            <span className={cn(
              "text-[10px] font-bold px-1 rounded-sm font-mono",
              delta > 0 ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
            )}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const StatsSidebar: React.FC<StatsSidebarProps> = ({ title, stats, compareStats, showCompare, vocation, language }) => {
  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  const [settings, setSettings] = useState<SidebarLiveSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error("Error loading sidebar personalization settings", e);
    }
    return DEFAULT_SETTINGS;
  });

  const [panelOpen, setPanelOpen] = useState(false);

  // Save on state change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving sidebar settings", e);
    }
  }, [settings]);

  // Synchronise preset with vocation switches
  useEffect(() => {
    if (!vocation) return;
    const norm = vocation.toLowerCase();
    const allowed = getPresetsForVocation(vocation, language);
    const isCurrentPresetAllowed = allowed.some(p => p.id === settings.preset);
    
    if (!isCurrentPresetAllowed) {
      let defaultPreset = 'all';
      if (norm === 'knight') defaultPreset = 'knight-sword';
      else if (norm === 'paladin') defaultPreset = 'paladin';
      else if (norm === 'sorcerer' || norm === 'druid') defaultPreset = 'mage';
      
      const presetData = getPresetSettings(defaultPreset);
      setSettings(prev => ({
        ...presetData,
        collapsedSections: prev.collapsedSections
      }));
    }
  }, [vocation, settings.preset]);

  // Collapsible sections helper
  const isCollapsed = (sectionId: string) => !!settings.collapsedSections[sectionId];
  const toggleCollapse = (sectionId: string) => {
    setSettings(prev => ({
      ...prev,
      collapsedSections: {
        ...prev.collapsedSections,
        [sectionId]: !prev.collapsedSections[sectionId]
      }
    }));
  };

  const updateSettingFlag = (key: keyof SidebarLiveSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
      preset: 'custom' // mark as customized
    }));
  };

  const [blockLayout, setBlockLayout] = useState<{ id: string; span: 1 | 2 | 3 | 4 }[]>(() => {
    try {
      const saved = localStorage.getItem('miracle_wiki_buildmaker_layout_order_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validIds = ['vitals', 'skills', 'combat', 'regen', 'protections', 'specials', 'runes'];
          const filtered = parsed.filter((item: any) => validIds.includes(item.id));
          const missing = validIds.filter(id => !filtered.some((item: any) => item.id === id));
          return [...filtered, ...missing.map(id => ({ id, span: 1 as 1 | 2 | 3 | 4 }))];
        }
      }
    } catch (e) {
      console.error("Error loading layout", e);
    }
    return [
      { id: 'vitals', span: 1 },
      { id: 'skills', span: 1 },
      { id: 'combat', span: 1 },
      { id: 'runes', span: 1 },
      { id: 'regen', span: 1 },
      { id: 'protections', span: 1 },
      { id: 'specials', span: 1 }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('miracle_wiki_buildmaker_layout_order_v1', JSON.stringify(blockLayout));
    } catch (e) {}
  }, [blockLayout]);

  const moveBlock = (index: number, direction: number) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= blockLayout.length) return;
    const nextList = [...blockLayout];
    const item = nextList[index];
    nextList[index] = nextList[nextIndex];
    nextList[nextIndex] = item;
    setBlockLayout(nextList);
  };

  const toggleBlockSpan = (blockId: string) => {
    setBlockLayout(prev => {
      return prev.map(block => {
        if (block.id === blockId) {
          const nextSpan = block.span === 1 ? 2 : (block.span === 2 ? 3 : (block.span === 3 ? 4 : 1));
          return { ...block, span: nextSpan as 1 | 2 | 3 | 4 };
        }
        return block;
      });
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('blockIndex', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('blockIndex'), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      const nextList = [...blockLayout];
      const [removed] = nextList.splice(sourceIndex, 1);
      nextList.splice(targetIndex, 0, removed);
      setBlockLayout(nextList);
    }
  };

  const getBlockLabel = (blockId: string) => {
    switch (blockId) {
      case 'vitals': return title || (language === 'pt' ? 'Atributos Vitais' : 'Vital Attributes');
      case 'skills': return language === 'pt' ? 'Treinamentos e Skills' : 'Trainings & Skills';
      case 'combat': return language === 'pt' ? 'Atributos de Combate' : 'Combat Attributes';
      case 'regen': return t('bm_regenSystem') || (language === 'pt' ? 'Sistema de Regeneração' : 'Regen System');
      case 'protections': return language === 'pt' ? 'Resistências & Proteções' : 'Resistances & Protections';
      case 'specials': return t('bm_specialAttributes') || (language === 'pt' ? 'Atributos Especiais' : 'Special Attributes');
      case 'runes': return language === 'pt' ? 'Danos & Curas de Runas' : 'Rune Damage & Healing';
      default: return blockId;
    }
  };

  const handleApplyPreset = (presetName: string) => {
    const presetData = getPresetSettings(presetName);
    setSettings(prev => ({
      ...presetData,
      collapsedSections: prev.collapsedSections
    }));
  };

  // Visibility heuristics
  const hasVisibleVitals = settings.showHp || settings.showMp || settings.showCap || settings.showSpeed;
  const hasVisibleSkills = settings.showMagic || settings.showSword || settings.showAxe || settings.showClub || settings.showDistance || settings.showShielding;
  const hasVisibleCombat = settings.showWeaponAtk || settings.showMaxMelee || settings.showMaxDist || settings.showMaxDef || settings.showArmor || settings.showPhysReduction;
  const hasVisibleProtections = settings.showPhysProt || settings.showFireProt || settings.showIceProt || settings.showEnergyProt || settings.showEarthProt || settings.showManaDrainProt || settings.showAllElementsProt || (settings.showArrowGuard && stats.arrowGuard > 0) || (settings.showMitigation && stats.mitigation > 0);
  const hasVisibleSpecials = settings.showCrit || settings.showLifeLeech || settings.showBurning || settings.showManaLeech || settings.showDodge || settings.showVibrancy || settings.showAbsorbMana || (settings.showReflectFire && stats.reflectFire > 0) || (settings.showReflectEnergy && stats.reflectEnergy > 0) || (settings.showReflectPhys && stats.reflectPhys > 0) || (settings.showReflectElements && stats.reflectElements > 0) || (settings.showAbsorbHealth && stats.absorbHealth > 0) || (settings.showDestruction && (stats.destructionChance || 0) > 0);

  return (
    <div className="medieval-card p-4 h-full flex flex-col gap-3 relative overflow-hidden">
      
      {/* Mini Personalization Trigger Panel Header */}
      <div className="flex items-center justify-between border-b border-medieval-gold/15 pb-2">
        <div className="flex items-center gap-1.5">
          <Sliders className="text-medieval-gold animate-pulse" size={15} />
          <span className="text-[11px] font-mono tracking-wider font-extrabold text-medieval-gold uppercase">{t('bm_attributeFilter')}</span>
        </div>
        <button 
          onClick={() => setPanelOpen(!panelOpen)}
          className={cn(
            "text-[10px] uppercase font-mono px-2 py-1 rounded border transition-all cursor-pointer flex items-center gap-1 font-bold",
            panelOpen 
              ? "bg-medieval-gold/25 border-medieval-gold/70 text-medieval-gold" 
              : "bg-black/40 border-medieval-gold/10 text-medieval-muted hover:border-medieval-gold/40 hover:text-medieval-gold"
          )}
          title="Clique para customizar e esconder atributos que você não quer analisar"
        >
          <Settings size={12} className={cn("transition-transform", panelOpen && "rotate-45")} />
          {panelOpen ? t('bm_closeConfigs') : t('bm_customize')}
        </button>
      </div>

      {/* Customize Drawer */}
      {panelOpen && (
        <div className="bg-black/60 p-3 border border-medieval-gold/20 rounded-md text-xs space-y-3.5 mb-2 animate-fadeIn relative">
          <div>
            <span className="text-[10px] text-medieval-muted uppercase font-bold tracking-wider block mb-1.5">{t('bm_quickVocationPresets')}:</span>
            <div className="flex flex-wrap gap-1">
              {getPresetsForVocation(vocation, language).map(p => (
                <button
                  key={p.id}
                  onClick={() => handleApplyPreset(p.id)}
                  className={cn(
                    "text-[9px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer font-semibold",
                    settings.preset === p.id 
                      ? "bg-medieval-gold/20 border-medieval-gold text-medieval-gold"
                      : "bg-neutral-900 border-neutral-850 text-medieval-muted hover:border-medieval-gold/40 hover:text-medieval-gold"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-medieval-gold/10 pt-2.5">
            <span className="text-[10px] text-medieval-muted uppercase font-bold tracking-wider block mb-2">{t('bm_attributeVisibility')}:</span>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 bg-black/30 p-2 rounded max-h-48 overflow-y-auto border border-medieval-gold/5 font-mono text-[9px]">
              {/* Group Vitals */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{t('bm_vitalAttributes')}</span>
                <button 
                  onClick={() => {
                    const nextVal = !settings.showHp;
                    setSettings(prev => ({ ...prev, showHp: nextVal, showMp: nextVal, showCap: nextVal, showSpeed: nextVal, preset: 'custom' }));
                  }}
                  className="text-[8px] underline text-medieval-muted/60 hover:text-medieval-gold"
                >{t('bm_invertAll')}</button>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showHp} onChange={e => updateSettingFlag('showHp', e.target.checked)} className="accent-medieval-gold" />
                <span>{t('bm_maximumHealth')}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMp} onChange={e => updateSettingFlag('showMp', e.target.checked)} className="accent-medieval-gold" />
                <span>{t('bm_maximumMana')}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showCap} onChange={e => updateSettingFlag('showCap', e.target.checked)} className="accent-medieval-gold" />
                <span>{t('bm_capacity')}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showSpeed} onChange={e => updateSettingFlag('showSpeed', e.target.checked)} className="accent-medieval-gold" />
                <span>{t('bm_speed')}</span>
              </label>

              {/* Group Skills */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mt-2 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{t('bm_weaponsAndSkills')}</span>
                <button 
                  onClick={() => {
                    const nextVal = !settings.showSword;
                    setSettings(prev => ({ ...prev, showMagic: nextVal, showSword: nextVal, showAxe: nextVal, showClub: nextVal, showDistance: nextVal, showShielding: nextVal, preset: 'custom' }));
                  }}
                  className="text-[8px] underline text-medieval-muted/60 hover:text-medieval-gold"
                >{t('bm_invertAll')}</button>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMagic} onChange={e => updateSettingFlag('showMagic', e.target.checked)} className="accent-medieval-gold" />
                <span>Magic Level</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showSword} onChange={e => updateSettingFlag('showSword', e.target.checked)} className="accent-medieval-gold" />
                <span>Sword Fighting</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showAxe} onChange={e => updateSettingFlag('showAxe', e.target.checked)} className="accent-medieval-gold" />
                <span>Axe Fighting</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showClub} onChange={e => updateSettingFlag('showClub', e.target.checked)} className="accent-medieval-gold" />
                <span>Club Fighting</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showDistance} onChange={e => updateSettingFlag('showDistance', e.target.checked)} className="accent-medieval-gold" />
                <span>Distance</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showShielding} onChange={e => updateSettingFlag('showShielding', e.target.checked)} className="accent-medieval-gold" />
                <span>Shielding</span>
              </label>

              {/* Group Combat Attrs */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mt-2 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{language === 'pt' ? "Atributos de Combate" : "Combat Attributes"}</span>
                <button 
                  onClick={() => {
                    const nextVal = !settings.showWeaponAtk;
                    setSettings(prev => ({ 
                      ...prev, 
                      showWeaponAtk: nextVal, showMaxMelee: nextVal, showMaxDist: nextVal, 
                      showMaxDef: nextVal, showArmor: nextVal, showPhysReduction: nextVal, preset: 'custom' 
                    }));
                  }}
                  className="text-[8px] underline text-medieval-muted/60 hover:text-medieval-gold"
                >{t('bm_invertAll')}</button>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showWeaponAtk} onChange={e => updateSettingFlag('showWeaponAtk', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Ataque Arma' : 'Weapon Atk'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMaxMelee} onChange={e => updateSettingFlag('showMaxMelee', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Máx Melee Atk' : 'Max Melee Atk'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMaxDist} onChange={e => updateSettingFlag('showMaxDist', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Máx Dist Atk' : 'Max Dist Atk'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMaxDef} onChange={e => updateSettingFlag('showMaxDef', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Defesa Máxima' : 'Max Defense'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showArmor} onChange={e => updateSettingFlag('showArmor', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Armadura Total' : 'Total Armor'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showPhysReduction} onChange={e => updateSettingFlag('showPhysReduction', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Físico Redução' : 'Phys Reduction'}</span>
              </label>

              {/* Group Protections */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mt-2 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{language === 'pt' ? 'Resistências' : 'Resistances'}</span>
                <button 
                  onClick={() => {
                    const nextVal = !settings.showPhysProt;
                    setSettings(prev => ({ 
                      ...prev, 
                      showPhysProt: nextVal, showFireProt: nextVal, showIceProt: nextVal, showEnergyProt: nextVal, 
                      showEarthProt: nextVal, showManaDrainProt: nextVal, showAllElementsProt: nextVal, 
                      showArrowGuard: nextVal, showMitigation: nextVal, preset: 'custom' 
                    }));
                  }}
                  className="text-[8px] underline text-medieval-muted/60 hover:text-medieval-gold"
                >{t('bm_invertAll')}</button>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showPhysProt} onChange={e => updateSettingFlag('showPhysProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Física %' : 'Physical %'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showFireProt} onChange={e => updateSettingFlag('showFireProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Fogo %' : 'Fire %'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showIceProt} onChange={e => updateSettingFlag('showIceProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Gelo %' : 'Ice %'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showEnergyProt} onChange={e => updateSettingFlag('showEnergyProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Energia %' : 'Energy %'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showEarthProt} onChange={e => updateSettingFlag('showEarthProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Terra/Poison' : 'Earth/Poison'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showManaDrainProt} onChange={e => updateSettingFlag('showManaDrainProt', e.target.checked)} className="accent-medieval-gold" />
                <span>Mana Drain %</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showAllElementsProt} onChange={e => updateSettingFlag('showAllElementsProt', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Tds Elementos' : 'All Elements'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showArrowGuard} onChange={e => updateSettingFlag('showArrowGuard', e.target.checked)} className="accent-medieval-gold" />
                <span>Arrow Guard %</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showMitigation} onChange={e => updateSettingFlag('showMitigation', e.target.checked)} className="accent-medieval-gold" />
                <span>Mitigation %</span>
              </label>

              {/* Group Specials */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mt-2 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{t('bm_specialAttributes')}</span>
                <button 
                  onClick={() => {
                    const nextVal = !settings.showCrit;
                    setSettings(prev => ({ 
                      ...prev, 
                      showCrit: nextVal, showLifeLeech: nextVal, showBurning: nextVal, showManaLeech: nextVal, 
                      showDodge: nextVal, showVibrancy: nextVal, showAbsorbMana: nextVal, 
                      showReflectFire: nextVal, showReflectEnergy: nextVal, showReflectPhys: nextVal, 
                      showReflectElements: nextVal, showAbsorbHealth: nextVal, showDestruction: nextVal, preset: 'custom' 
                    }));
                  }}
                  className="text-[8px] underline text-medieval-muted/60 hover:text-medieval-gold"
                >{t('bm_invertAll')}</button>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showCrit} onChange={e => updateSettingFlag('showCrit', e.target.checked)} className="accent-medieval-gold" />
                <span>Critical Hit</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showLifeLeech} onChange={e => updateSettingFlag('showLifeLeech', e.target.checked)} className="accent-medieval-gold" />
                <span>Life Leech</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showBurning} onChange={e => updateSettingFlag('showBurning', e.target.checked)} className="accent-medieval-gold" />
                <span>Burning</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showManaLeech} onChange={e => updateSettingFlag('showManaLeech', e.target.checked)} className="accent-medieval-gold" />
                <span>Mana Leech</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showDodge} onChange={e => updateSettingFlag('showDodge', e.target.checked)} className="accent-medieval-gold" />
                <span>Dodge Chance</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showVibrancy} onChange={e => updateSettingFlag('showVibrancy', e.target.checked)} className="accent-medieval-gold" />
                <span>Vibrancy</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showAbsorbMana} onChange={e => updateSettingFlag('showAbsorbMana', e.target.checked)} className="accent-medieval-gold" />
                <span>Absorb Mana</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showReflectFire} onChange={e => updateSettingFlag('showReflectFire', e.target.checked)} className="accent-medieval-gold" />
                <span>Reflect Fire</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showReflectEnergy} onChange={e => updateSettingFlag('showReflectEnergy', e.target.checked)} className="accent-medieval-gold" />
                <span>Reflect Energy</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showReflectPhys} onChange={e => updateSettingFlag('showReflectPhys', e.target.checked)} className="accent-medieval-gold" />
                <span>Reflect Phys</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showReflectElements} onChange={e => updateSettingFlag('showReflectElements', e.target.checked)} className="accent-medieval-gold" />
                <span>Reflect Elem.</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showAbsorbHealth} onChange={e => updateSettingFlag('showAbsorbHealth', e.target.checked)} className="accent-medieval-gold" />
                <span>Absorb Health</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showDestruction} onChange={e => updateSettingFlag('showDestruction', e.target.checked)} className="accent-medieval-gold" />
                <span>Destruction</span>
              </label>

              {/* Group Runes */}
              <div className="col-span-2 border-b border-medieval-gold/10 pb-0.5 mt-2 mb-1 flex items-center justify-between">
                <span className="text-medieval-gold font-bold">{language === 'pt' ? 'Runas & Magias' : 'Runes & Spells'}</span>
              </div>
              <label className="flex items-center gap-1 cursor-pointer hover:text-medieval-gold">
                <input type="checkbox" checked={settings.showRunes} onChange={e => updateSettingFlag('showRunes', e.target.checked)} className="accent-medieval-gold" />
                <span>{language === 'pt' ? 'Cálculos de Runas' : 'Rune Calculations'}</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-[10px] border-t border-medieval-gold/10 pt-2 text-medieval-muted/70">
            <span>{language === 'pt' ? 'Dica: Use Presets Rápidos!' : 'Tip: Use Quick Presets!'}</span>
            <button 
              onClick={() => {
                setSettings(DEFAULT_SETTINGS);
              }}
              className="text-red-400 font-bold hover:underline cursor-pointer"
            >
              {language === 'pt' ? 'Resetar Tudo' : 'Reset All'}
            </button>
          </div>
        </div>
      )}

      {/* Grid container with customizable block ordering & column spanning */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-medieval grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 items-start align-top content-start p-0.5">
        {blockLayout.map((block, idx) => {
          let isVisible = false;
          if (block.id === 'vitals') isVisible = hasVisibleVitals;
          else if (block.id === 'skills') isVisible = hasVisibleSkills;
          else if (block.id === 'combat') isVisible = hasVisibleCombat;
          else if (block.id === 'regen') isVisible = true;
          else if (block.id === 'protections') isVisible = hasVisibleProtections;
          else if (block.id === 'specials') isVisible = hasVisibleSpecials;
          else if (block.id === 'runes') isVisible = settings.showRunes;

          if (!isVisible) return null;

          let spanClass = "col-span-1 border border-medieval-gold/5 bg-black/10 p-2.5 rounded hover:border-medieval-gold/35 transition-all duration-300 relative group/block shadow-md hover:shadow-medieval-gold/5";
          if (block.span === 2) {
            spanClass = "col-span-1 md:col-span-2 border border-medieval-gold/5 bg-black/10 p-2.5 rounded hover:border-medieval-gold/35 transition-all duration-300 relative group/block shadow-md hover:shadow-medieval-gold/5";
          } else if (block.span === 3) {
            spanClass = "col-span-1 md:col-span-2 xl:col-span-3 border border-medieval-gold/5 bg-black/10 p-2.5 rounded hover:border-medieval-gold/35 transition-all duration-300 relative group/block shadow-md hover:shadow-medieval-gold/5";
          } else if (block.span === 4) {
            spanClass = "col-span-1 md:col-span-2 xl:col-span-3 2xl:col-span-4 border border-medieval-gold/5 bg-black/10 p-2.5 rounded hover:border-medieval-gold/35 transition-all duration-300 relative group/block shadow-md hover:shadow-medieval-gold/5";
          }

          return (
            <div 
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx)}
              className={spanClass}
            >
              <div 
                onClick={() => toggleCollapse(block.id)}
                className="flex items-center justify-between cursor-pointer pb-2 mb-2 border-b border-medieval-gold/10 select-none group/title"
              >
                <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-medieval-gold/50" onClick={e => e.stopPropagation()}>
                  <span className="text-[11px] text-medieval-gold/30 hover:text-medieval-gold font-mono mr-0.5" title={language === 'pt' ? "Arraste para organizar" : "Drag to organize"}>☰</span>
                  <h3 className="text-xs font-bold text-medieval-gold uppercase tracking-wider flex items-center gap-1.5">
                    {block.id === 'vitals' && <User size={13} />}
                    {block.id === 'skills' && <Award size={13} />}
                    {block.id === 'combat' && <Sword size={13} />}
                    {block.id === 'regen' && <Activity size={13} className="text-emerald-500 animate-pulse" />}
                    {block.id === 'protections' && <Flame size={13} />}
                    {block.id === 'specials' && <Sparkles size={13} />}
                    {block.id === 'runes' && <Sparkles size={13} className="text-medieval-gold" />}
                    {getBlockLabel(block.id)}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-medieval-muted/50 transition-colors" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => moveBlock(idx, -1)}
                    disabled={idx === 0}
                    className="p-0.5 rounded text-medieval-muted hover:text-medieval-gold hover:bg-white/5 opacity-0 group-hover/block:opacity-100 disabled:opacity-0 cursor-pointer transition-all duration-200"
                    title={language === 'pt' ? "Mover para trás" : "Move backwards"}
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button 
                    onClick={() => moveBlock(idx, 1)}
                    disabled={idx === blockLayout.length - 1}
                    className="p-0.5 rounded text-medieval-muted hover:text-medieval-gold hover:bg-white/5 opacity-0 group-hover/block:opacity-100 disabled:opacity-0 cursor-pointer transition-all duration-200"
                    title={language === 'pt' ? "Mover para frente" : "Move forwards"}
                  >
                    <ChevronRight size={13} />
                  </button>
                  <button 
                    onClick={() => toggleBlockSpan(block.id)}
                    className="px-1 py-0.5 rounded border border-medieval-gold/20 text-[9px] font-mono font-bold text-medieval-gold hover:text-white hover:bg-medieval-gold/10 opacity-0 group-hover/block:opacity-100 cursor-pointer transition-all duration-200 mr-1"
                    title={language === 'pt' ? `Largura: ${block.span} col. Clique para ajustar.` : `Width: ${block.span} col. Click to adjust.`}
                  >
                    {block.span}col
                  </button>

                  <span className="text-[10px] font-mono group-hover/title:text-medieval-gold mr-1">
                    {isCollapsed(block.id) 
                      ? (language === 'pt' ? 'Mostrar' : 'Show') 
                      : (language === 'pt' ? 'Esconder' : 'Hide')}
                  </span>
                  {isCollapsed(block.id) ? <ChevronDown size={14} className="group-hover/title:text-medieval-gold" /> : <ChevronUp size={14} className="group-hover/title:text-medieval-gold" />}
                </div>
              </div>

              {!isCollapsed(block.id) && (
                <div className="animate-fadeIn">
                  {block.id === 'vitals' && (
                    <VitalsCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                  {block.id === 'skills' && (
                    <SkillsCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                    />
                  )}
                  {block.id === 'combat' && (
                    <CombatCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                  {block.id === 'regen' && (
                    <RegenCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                  {block.id === 'protections' && (
                    <ProtectionsCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                  {block.id === 'specials' && (
                    <SpecialsCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                  {block.id === 'runes' && (
                    <RunesCard 
                      stats={stats} 
                      compareStats={compareStats || undefined} 
                      settings={settings} 
                      showCompare={showCompare} 
                      language={language} 
                      t={t} 
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
