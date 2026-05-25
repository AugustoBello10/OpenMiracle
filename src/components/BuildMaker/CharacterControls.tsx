
import React from 'react';
import { VocationType, StanceType, Skills } from '../../types/build';
import { VOCATIONS_DATA, STANCES_MULTIPLIERS } from '../../data/constants';
import { cn } from '../../lib/utils';
import { User, Swords, Shield, Target } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface CharacterControlsProps {
  vocation: VocationType;
  level: number;
  skills: Skills;
  stance: StanceType;
  onVocationChange: (v: VocationType) => void;
  onLevelChange: (l: number) => void;
  onSkillChange: (skill: keyof Skills, val: number) => void;
  onStanceChange: (s: StanceType) => void;
  language: Language;
}

export const CharacterControls: React.FC<CharacterControlsProps> = ({
  vocation, level, skills, stance, onVocationChange, onLevelChange, onSkillChange, onStanceChange, language
}) => {
  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  const getStanceTranslation = (s: StanceType) => {
    if (s === 'Full Attack') return t('bm_fullAttack');
    if (s === 'Balanced') return t('bm_balanced');
    if (s === 'Full Defense') return t('bm_fullDefense');
    return s;
  };

  const getSkillTranslation = (sk: string) => {
    if (sk === 'melee') return t('bm_melee');
    if (sk === 'distance') return t('bm_distance');
    if (sk === 'magic') return t('bm_magic');
    if (sk === 'shielding') return t('bm_shielding');
    return sk;
  };

  return (
    <div className="medieval-card p-4 h-full flex flex-col gap-6 overflow-y-auto scrollbar-medieval">
      <div>
        <label className="text-[10px] uppercase tracking-widest text-medieval-muted font-bold mb-2 block">{t('bm_vocationLabel')}</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(VOCATIONS_DATA) as VocationType[]).map((voc) => (
            <button
              key={voc}
              onClick={() => onVocationChange(voc)}
              className={cn(
                "py-2 px-1 text-[10px] font-bold rounded border uppercase transition-all tracking-tighter",
                vocation === voc 
                  ? "bg-medieval-gold text-black border-medieval-gold shadow-[0_0_8px_rgba(197,160,89,0.3)]" 
                  : "bg-black/40 text-medieval-muted/60 border-medieval-gold/10 hover:border-medieval-gold/40"
              )}
            >
              {voc}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-widest text-medieval-muted font-bold mb-2 block">{t('bm_levelLabel')}</label>
        <input 
          type="number" 
          value={level} 
          onChange={(e) => onLevelChange(parseInt(e.target.value) || 1)}
          className="medieval-input text-center text-lg font-mono"
        />
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-widest text-medieval-muted font-bold mb-4 block">{t('bm_skillsLabel')}</label>
        <div className="space-y-4">
          {(['melee', 'distance', 'magic', 'shielding'] as (keyof Skills)[]).map((skill) => (
            <div key={skill} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] uppercase tracking-wider text-medieval-muted/60">{getSkillTranslation(skill)}</span>
                <span className="text-xs font-mono text-medieval-gold">{skills[skill]}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="150" 
                value={skills[skill]} 
                onChange={(e) => onSkillChange(skill, parseInt(e.target.value))}
                className="w-full accent-medieval-gold h-1 rounded-full bg-black/40 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-widest text-medieval-muted font-bold mb-2 block">{t('bm_stanceLabel')}</label>
        <div className="flex flex-col gap-2">
          {(Object.keys(STANCES_MULTIPLIERS) as StanceType[]).map((s) => (
            <button
              key={s}
              onClick={() => onStanceChange(s)}
              className={cn(
                "py-3 px-4 text-xs font-bold rounded border uppercase transition-all flex items-center justify-between",
                stance === s 
                  ? "bg-medieval-gold/20 text-medieval-gold border-medieval-gold shadow-inner" 
                  : "bg-black/40 text-medieval-muted/60 border-medieval-gold/10 hover:bg-black/60"
              )}
            >
              <span>{getStanceTranslation(s)}</span>
              {s === 'Full Attack' && <Swords size={14} />}
              {s === 'Balanced' && <Target size={14} />}
              {s === 'Full Defense' && <Shield size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
