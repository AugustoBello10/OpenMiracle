
import React, { useState, useMemo } from 'react';
import { BuildState, VocationType, StanceType, Skills, SlotId, GameItem, EnchantmentValue } from '../types/build';
import { calculateStats, getRarityStyles } from '../utils/formulas';
import { StatsSidebar } from './BuildMaker/StatsSidebar';
import { InventorySlot } from './BuildMaker/InventorySlot';
import { Modal } from './Modal';
import { ItemSelector } from './BuildMaker/ItemSelector';
import { AttributeEncoder, getAttributeValueAndDescription } from './BuildMaker/AttributeEncoder';
import { cn } from '../lib/utils';
import { ATTRIBUTE_TYPES } from '../data/constants';
import { 
  Shield, Crown, Gem, Shirt, Sword, Shield as ShieldIcon, 
  RotateCcw, ArrowRightLeft, Sparkles, 
  Backpack, Utensils, Zap, Layers, Trash2
} from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface BuildMakerViewProps {
  language: Language;
}

const DEFAULT_BUILD: BuildState = {
  vocation: 'Knight',
  level: 100,
  skills: { melee: 80, distance: 80, magic: 5, shielding: 80 },
  stance: 'Balanced',
  equipment: {},
  selectedAttributes: {}
};

export const BuildMakerView: React.FC<BuildMakerViewProps> = ({ language }) => {
  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  const [build1, setBuild1] = useState<BuildState>(JSON.parse(JSON.stringify(DEFAULT_BUILD)));
  const [build2, setBuild2] = useState<BuildState>(JSON.parse(JSON.stringify(DEFAULT_BUILD)));
  const [activeBuild, setActiveBuild] = useState<1 | 2>(1);
  const [isComparing, setIsComparing] = useState(false);
  
  const [modalState, setModalState] = useState<{
    type: 'item' | 'attribute' | 'item-options' | null;
    slotId: SlotId | null;
  }>({ type: null, slotId: null });

  const currentBuild = activeBuild === 1 ? build1 : build2;
  const setBuildLocal = (updater: (prev: BuildState) => BuildState) => {
    if (activeBuild === 1) setBuild1(updater);
    else setBuild2(updater);
  };

  const getAttrCount = (build: BuildState, slotId: SlotId) => {
    return build.selectedAttributes[slotId]?.filter(e => e.type && e.type !== '').length || 0;
  };

  const stats1 = useMemo(() => calculateStats(build1), [build1]);
  const stats2 = useMemo(() => calculateStats(build2), [build2]);
  const currentStats = activeBuild === 1 ? stats1 : stats2;

  const createSlotClickHandler = (buildIdx: 1 | 2) => (slotId: SlotId) => {
    setActiveBuild(buildIdx);
    const targetBuild = buildIdx === 1 ? build1 : build2;
    const item = targetBuild.equipment[slotId];
    setModalState({ type: item ? 'item-options' : 'item', slotId });
  };

  const createSlotRightClickHandler = (buildIdx: 1 | 2) => (e: React.MouseEvent, slotId: SlotId) => {
    e.preventDefault();
    setActiveBuild(buildIdx);
    const targetBuild = buildIdx === 1 ? build1 : build2;
    const item = targetBuild.equipment[slotId];
    if (item && item.attributeClass > 0) {
      setModalState({ type: 'attribute', slotId });
    }
  };

  const handleSelectItem = (item: GameItem) => {
    const slotId = modalState.slotId!;
    setBuildLocal(prev => ({
      ...prev,
      equipment: { ...prev.equipment, [slotId]: item },
      selectedAttributes: { ...prev.selectedAttributes, [slotId]: [] }
    }));
    
    // Auto-transition to attribute selection if the item has slots
    if (item.attributeClass > 0) {
      setModalState({ type: 'attribute', slotId });
    } else {
      setModalState({ type: null, slotId: null });
    }
  };

  const handleRemoveItem = () => {
    const slotId = modalState.slotId!;
    setBuildLocal(prev => {
      const newEquip = { ...prev.equipment };
      const newAttrs = { ...prev.selectedAttributes };
      delete newEquip[slotId];
      delete newAttrs[slotId];
      return { ...prev, equipment: newEquip, selectedAttributes: newAttrs };
    });
    setModalState({ type: null, slotId: null });
  };

  const handleSaveAttributes = (enchants: EnchantmentValue[]) => {
    const slotId = modalState.slotId!;
    setBuildLocal(prev => ({
      ...prev,
      selectedAttributes: { ...prev.selectedAttributes, [slotId]: enchants }
    }));
    setModalState({ type: null, slotId: null });
  };

  const copyBuild = () => {
    if (activeBuild === 1) setBuild2(JSON.parse(JSON.stringify(build1)));
    else setBuild1(JSON.parse(JSON.stringify(build2)));
  };

  const resetBuild = () => {
    setBuildLocal(prev => JSON.parse(JSON.stringify(DEFAULT_BUILD)));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Build Maker Top Bar */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-medieval-gold/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hidden sm:flex">
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />
            <span className="text-sm font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">Build Maker</span>
          </div>

          <div className="flex bg-black/40 p-1 rounded-sm border border-medieval-gold/20">
            <button 
              onClick={() => setActiveBuild(1)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase transition-all rounded-sm",
                activeBuild === 1 ? "bg-medieval-gold text-black shadow-lg" : "text-medieval-muted hover:text-medieval-gold"
              )}
            >
              Build 1
            </button>
            <button 
              onClick={() => setActiveBuild(2)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase transition-all rounded-sm",
                activeBuild === 2 ? "bg-medieval-gold text-black shadow-lg" : "text-medieval-muted hover:text-medieval-gold"
              )}
            >
              Build 2
            </button>
          </div>
          <button 
            onClick={() => setIsComparing(!isComparing)}
            className={cn(
              "medieval-button-outline px-3 py-1 text-[10px] uppercase font-bold flex items-center gap-1.5",
              isComparing && "bg-medieval-gold/20 border-medieval-gold"
            )}
          >
            <ArrowRightLeft size={12} />
            <span>{t('bm_compare')}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={resetBuild} className="text-[10px] text-medieval-muted hover:text-red-500 flex items-center gap-1 uppercase tracking-wider transition-colors">
            <RotateCcw size={12} /> {t('bm_reset')}
          </button>
          <button onClick={copyBuild} className="text-[10px] text-medieval-muted hover:text-medieval-gold flex items-center gap-1 uppercase tracking-wider transition-colors">
            <Layers size={12} /> {t('bm_copyToBuild')}{activeBuild === 1 ? 2 : 1}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden gap-4 min-h-0">
        
        {/* Unified Equipment & Character Setup Sheet */}
        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 flex flex-col gap-3 bg-black/35 p-3 rounded-lg border border-medieval-gold/15 h-full overflow-y-auto scrollbar-medieval">
          
          <div className="flex items-center justify-between border-b border-medieval-gold/20 pb-2">
            <h3 className="text-xs font-bold text-medieval-gold uppercase tracking-widest flex items-center gap-1.5">
              <Crown size={14} className="text-medieval-gold" />
              {language === 'pt' ? 'Ficha do Personagem' : 'Character Sheet'}
            </h3>
            <span className="text-[9px] font-mono text-medieval-muted bg-medieval-gold/10 px-2 py-0.5 rounded border border-medieval-gold/20">
              Build {activeBuild}
            </span>
          </div>

          {/* Vocation, Level, Stance config */}
          <div className="grid grid-cols-3 gap-1.5 bg-black/50 p-2 rounded border border-medieval-gold/5 shrink-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-medieval-muted/60 font-bold uppercase tracking-wider">{t('bm_vocationLabel')}</span>
              <select
                value={currentBuild.vocation}
                onChange={(e) => {
                  setBuildLocal(prev => ({ ...prev, vocation: e.target.value as VocationType }));
                }}
                className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded px-1.5 py-1 text-[11px] text-medieval-gold font-bold focus:outline-none focus:border-medieval-gold cursor-pointer"
              >
                <option value="Knight">Knight</option>
                <option value="Paladin">Paladin</option>
                <option value="Druid">Druid</option>
                <option value="Sorcerer">Sorcerer</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-medieval-muted/60 font-bold uppercase tracking-wider">{t('bm_levelLabel')}</span>
              <input
                type="number"
                min="1"
                max="2000"
                value={currentBuild.level}
                onChange={(e) => {
                  setBuildLocal(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }));
                }}
                className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded px-1.5 py-1 text-xs text-medieval-gold font-mono font-bold text-center focus:outline-none focus:border-medieval-gold"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-medieval-muted/60 font-bold uppercase tracking-wider">{t('bm_stanceLabel')}</span>
              <select
                value={currentBuild.stance}
                onChange={(e) => {
                  setBuildLocal(prev => ({ ...prev, stance: e.target.value as StanceType }));
                }}
                className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded px-1 py-1 text-[10px] text-medieval-gold font-bold focus:outline-none focus:border-medieval-gold cursor-pointer"
              >
                <option value="Balanced">{t('bm_balanced')}</option>
                <option value="Full Attack">{t('bm_fullAttack')}</option>
                <option value="Full Defense">{t('bm_fullDefense')}</option>
              </select>
            </div>
          </div>

          {/* Core Skills Config values */}
          <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 shrink-0">
            <div className="grid grid-cols-2 gap-1.5">
              {(['melee', 'distance', 'magic', 'shielding'] as (keyof Skills)[]).map((sk) => {
                const skillName = sk === 'melee' ? t('bm_melee') : sk === 'distance' ? t('bm_distance') : sk === 'magic' ? t('bm_magic') : t('bm_shielding');
                return (
                  <div key={sk} className="flex justify-between items-center bg-black/45 px-2 py-0.5 rounded border border-medieval-gold/5 hover:border-medieval-gold/15 transition-all">
                    <span className="text-[8px] uppercase font-bold text-medieval-muted/70 tracking-wider">
                      {skillName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setBuildLocal(prev => ({
                            ...prev,
                            skills: { ...prev.skills, [sk]: Math.max(0, prev.skills[sk] - 1) }
                          }));
                        }}
                        className="w-4 h-4 rounded bg-medieval-gold/10 hover:bg-medieval-gold/25 text-medieval-gold font-bold text-xs flex items-center justify-center transition-colors border border-medieval-gold/20 select-none pb-0.5"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={currentBuild.skills[sk]}
                        onChange={(e) => {
                          const val = Math.min(200, Math.max(0, parseInt(e.target.value) || 0));
                          setBuildLocal(prev => ({ ...prev, skills: { ...prev.skills, [sk]: val } }));
                        }}
                        className="bg-transparent text-center font-mono font-bold text-xs text-medieval-gold w-8 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          setBuildLocal(prev => ({
                            ...prev,
                            skills: { ...prev.skills, [sk]: Math.min(200, prev.skills[sk] + 1) }
                          }));
                        }}
                        className="w-4 h-4 rounded bg-medieval-gold/10 hover:bg-medieval-gold/25 text-medieval-gold font-bold text-xs flex items-center justify-center transition-colors border border-medieval-gold/20 select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Equipments 3x3 Grid of InventorySlot */}
          <div className="flex-1 flex flex-col justify-center py-2 shrink-0">
            <div className="w-full max-w-[210px] mx-auto grid grid-cols-3 gap-1.5">
              {/* Row 1 */}
              <InventorySlot id="necklace" label={t('bm_slotAmulet')} icon={Gem} item={currentBuild.equipment.necklace} activeAttributesCount={getAttrCount(currentBuild, 'necklace')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="head" label={t('bm_slotHelmet')} icon={Crown} item={currentBuild.equipment.head} activeAttributesCount={getAttrCount(currentBuild, 'head')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="backpack" label={t('bm_slotBackpack')} icon={Backpack} item={currentBuild.equipment.backpack} activeAttributesCount={getAttrCount(currentBuild, 'backpack')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              
              {/* Row 2 */}
              <InventorySlot id="right-hand" label={t('bm_slotWeapon')} icon={Sword} item={currentBuild.equipment['right-hand']} activeAttributesCount={getAttrCount(currentBuild, 'right-hand')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="armor" label={t('bm_slotArmor')} icon={Shirt} item={currentBuild.equipment.armor} activeAttributesCount={getAttrCount(currentBuild, 'armor')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="left-hand" label={t('bm_slotShield')} icon={Shield} item={currentBuild.equipment['left-hand']} activeAttributesCount={getAttrCount(currentBuild, 'left-hand')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />

              {/* Row 3 */}
              <InventorySlot id="ring" label={t('bm_slotRing')} icon={Zap} item={currentBuild.equipment.ring} activeAttributesCount={getAttrCount(currentBuild, 'ring')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="legs" label={t('bm_slotLegs')} icon={Layers} item={currentBuild.equipment.legs} activeAttributesCount={getAttrCount(currentBuild, 'legs')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <InventorySlot id="ammo" label={t('bm_slotAmmo')} icon={Shield} item={currentBuild.equipment.ammo} activeAttributesCount={getAttrCount(currentBuild, 'ammo')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />

              {/* Row 4 */}
              <div /> {/* Empty */}
              <InventorySlot id="feet" label={t('bm_slotBoots')} icon={ArrowRightLeft} item={currentBuild.equipment.feet} activeAttributesCount={getAttrCount(currentBuild, 'feet')} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
              <div /> {/* Empty */}
            </div>
          </div>

          {/* Actionbar-Style Relics row */}
          <div className="border-t border-medieval-gold/10 pt-2 shrink-0">
            <span className="text-[8px] uppercase font-bold text-medieval-gold/50 mb-1 block tracking-wider text-center">{t('bm_relics')}</span>
            <div className="flex gap-1.5 justify-center">
              {[1, 2, 3, 4].map(idx => {
                const relicId = `relic-${idx}` as SlotId;
                return (
                  <InventorySlot key={idx} id={relicId} label={t('bm_slotRelic')} icon={Sparkles} item={currentBuild.equipment[relicId]} activeAttributesCount={getAttrCount(currentBuild, relicId)} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
                );
              })}
            </div>
          </div>

          {/* Actionbar-Style Foods row */}
          <div className="border-t border-medieval-gold/10 pt-2 shrink-0">
            <span className="text-[8px] uppercase font-bold text-medieval-gold/50 mb-1 block tracking-wider text-center">{t('bm_foods')}</span>
            <div className="flex gap-1.5 justify-center">
              {[1, 2, 3, 4].map(idx => {
                const foodId = `food-${idx}` as SlotId;
                return (
                  <InventorySlot key={idx} id={foodId} label={t('bm_slotFood')} icon={Utensils} item={currentBuild.equipment[foodId]} activeAttributesCount={getAttrCount(currentBuild, foodId)} onClick={createSlotClickHandler(activeBuild)} onRightClick={createSlotRightClickHandler(activeBuild)} />
                );
              })}
            </div>
          </div>

        </div>

        {/* Dynamic Horizontal Stats Dashboard (Uses all remaining space) */}
        <div className="flex-1 h-full min-w-0">
          <StatsSidebar 
            title={language === 'pt' ? `Atributos Calculados (Build ${activeBuild})` : `Calculated Attributes (Build ${activeBuild})`}
            stats={currentStats}
            compareStats={isComparing ? (activeBuild === 1 ? stats2 : stats1) : undefined}
            showCompare={isComparing}
            vocation={currentBuild.vocation}
            language={language}
          />
        </div>

      </div>

      {/* Modals */}
      <Modal 
        isOpen={modalState.type === 'item'} 
        onClose={() => setModalState({ type: null, slotId: null })}
        title={t('bm_selectItem')}
      >
        {modalState.slotId && (
          <ItemSelector 
            slotId={modalState.slotId} 
            onSelectItem={handleSelectItem} 
            onRemoveItem={handleRemoveItem}
            language={language}
          />
        )}
      </Modal>

      <Modal 
        isOpen={modalState.type === 'attribute'} 
        onClose={() => setModalState({ type: null, slotId: null })}
        title={t('bm_customiseAttributes')}
      >
        {modalState.slotId && currentBuild.equipment[modalState.slotId] && (
          <AttributeEncoder 
            item={currentBuild.equipment[modalState.slotId]!} 
            currentEnchants={currentBuild.selectedAttributes[modalState.slotId] || []}
            onSave={handleSaveAttributes}
            language={language}
          />
        )}
      </Modal>

      <Modal 
        isOpen={modalState.type === 'item-options'} 
        onClose={() => setModalState({ type: null, slotId: null })}
        title={t('bm_equipmentOptions')}
      >
        {modalState.slotId && currentBuild.equipment[modalState.slotId] && (
          (() => {
            const item = currentBuild.equipment[modalState.slotId]!;
            const enchants = currentBuild.selectedAttributes[modalState.slotId] || [];
            const attrCount = enchants.filter(e => e.type && e.type !== '').length;
            const rarity = getRarityStyles(attrCount);

            return (
              <div className="flex flex-col gap-5">
                {/* Item Summary Card */}
                <div className={cn(
                  "medieval-card p-4 flex gap-4 items-center border transition-all duration-300 bg-black/40",
                  rarity.borderClassName
                )}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-contain select-none" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded bg-medieval-gold/10 border border-medieval-gold/20 text-medieval-gold font-bold text-xs text-center p-1">
                      {item.name.substring(0, 3).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 font-mono">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-medieval-gold uppercase tracking-widest leading-tight">{item.name}</h3>
                      {attrCount > 0 && (
                        <span className={cn("text-[9px] uppercase px-1.5 py-0.5 rounded border border-medieval-gold/20 tracking-wider font-mono bg-black/60 shrink-0", rarity.textClassName)}>
                          {rarity.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-medieval-muted mt-2">
                      {item.armor !== undefined && (<span>Def: {item.armor}</span>)}
                      {item.attack !== undefined && (<span>Atk: {item.attack}</span>)}
                      {item.defense !== undefined && (<span>Def: {item.defense}</span>)}
                      <span>Peso: {item.weight} oz</span>
                      <span className="text-medieval-gold/70">Slot: {item.category.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Show current enchants */}
                {item.attributeClass > 0 && (
                  <div className={cn("p-3.5 rounded border transition-all duration-300 bg-black/40", rarity.borderClassName)}>
                    <h4 className="text-[9px] uppercase font-bold text-medieval-gold/60 tracking-wider mb-2">{t('bm_activeAttributes')} ({attrCount}/{item.attributeClass}):</h4>
                    {attrCount > 0 ? (
                      <div className="space-y-1.5 font-mono text-xs">
                        {enchants.filter(e => e.type && e.type !== '').map((ench, i) => {
                          const info = getAttributeValueAndDescription(ench.type, ench.level + 1, item);
                          return (
                            <div key={i} className="flex justify-between items-center bg-black/30 px-2.5 py-1.5 rounded border border-medieval-gold/5">
                              <span className="text-medieval-muted text-[10px]">{info.text}</span>
                              <span className="text-medieval-gold font-bold text-[10px]">
                                Lvl +{ench.level + 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-[10px] text-medieval-muted/60 italic">{t('bm_noAttributesApplied')}</p>
                    )}
                  </div>
                )}

                {/* Choices list */}
                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {item.attributeClass > 0 && (
                    <button 
                      onClick={() => setModalState({ type: 'attribute', slotId: modalState.slotId })}
                      className="medieval-button flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wider"
                    >
                      <Sparkles size={14} />
                      {t('bm_customiseAttributes')}
                    </button>
                  )}
                  <button 
                    onClick={() => setModalState({ type: 'item', slotId: modalState.slotId })}
                    className="medieval-button-outline flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wider"
                  >
                    <ArrowRightLeft size={14} />
                    {t('bm_changeEquipment')}
                  </button>
                  <button 
                    onClick={handleRemoveItem}
                    className="medieval-button-outline border-red-900/45 text-red-500 hover:bg-red-500/10 hover:border-red-500 flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wider"
                  >
                    <Trash2 size={14} />
                    {t('bm_removeEquipment')}
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </Modal>
    </div>
  );
};
