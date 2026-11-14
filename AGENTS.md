# Agent Rules & Code Protection Guidelines

Please adhere strictly to these rules to preserve the stable and working modules of the **Miracle Wiki Tools** project:

## 📚 Mandatory Context References
Whenever starting a new session or after context compaction, ALWAYS consult:
1. `PROJECT_RULES.md` — Engineering & UI/UX Standards (No icons in headers, rarity colors, 100% bilingual, 3-step defense pipeline).
2. `MIRACLE_GAME_KNOWLEDGE.md` — Complete Official Lore & Mechanics of Miracle 7.4 (Relic Box 6 slots, Melchior quest, Training Weapons, Bed Maker cycle, Player Shop rules, Exaltation Forge Class 1-5).

## 🛡️ Protected Modules (DO NOT ALTER UNLESS EXPLICITLY REQUESTED)
The following files and features are fully functional and stable. Do not modify, refactor, or optimize them unless the user explicitly asks for changes in these features:
- **Calculators**: 
  - `src/components/AlchemyCalculator.tsx`
  - `src/components/FarmingCalculator.tsx`
  - `src/components/CraftingCalculator.tsx`
  - `src/components/MiningCalculator.tsx`
- **Translations & Core logic**:
  - `src/lib/translations.ts`
  - `src/lib/formulas.ts`
- **Data Collections**:
  - `src/data/patchNotes.ts`
  - `src/data/library.ts`
  - All existing data tables inside `src/data/items.ts` that support the calculators.

## 🎯 Active Development Area (The Build Maker)
All interactive enhancements, state refinements, and UI optimizations should be restricted to:
- `src/components/BuildMaker/` (modals, slots, sidebars, grids)
- `src/components/BuildMakerView.tsx` (the Build Maker tab view)
- `src/types/build.ts`
- `src/utils/formulas.ts`

## 📜 Standard Operating Guidelines for Wiki & Guides (STRICT & MANDATORY)
1. **Zero Hallucination & Zero Invented Mechanics:**
   - NEVER assume or invent mechanics from global Tibia or other OTServers (e.g., NO exercise dummies, NO auto-striking on dummies, "praças" are NOT PZ, etc.).
   - If an in-game mechanic, step, or quest spoiler is not explicitly known or verified in Miracle 7.4 files/Discord, DO NOT invent it. State clearly what is known and request verification from the user.
2. **100% Bilingual Completeness (PT & EN):**
   - Every single guide, narrative paragraph, step, notice card, table, and item description MUST have full, complete translations for both Portuguese (`language === 'pt'`) and English (`language === 'en'`). Never leave Portuguese body text rendered when the user selects English.
3. **Clean Editorial Typography (STRICT NO HEADER ICONS / EMOJIS):**
   - NEVER put Lucide icons, emojis, or decorative symbols inside ANY title, subtitle, card header, system button header, or section label — regardless of whether the HTML tag is `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<span>`, `<div>`, or `<button>`.
   - Titles, card headers, section names, and action buttons MUST remain 100% PURE TEXT, clean, and professional.
   - Decorative icons in titles look amateur and give an "AI generated" feel. Zero icons in headers across the entire website.
   - Icons are only permitted as tiny utility indicators inside data rows (e.g. mini health icon next to `Vida (HP):`).
4. **Item Rarity Colors (Build Maker):**
   - 0 attributes: Neutral / Sem cor (`border-medieval-gold/15 bg-black/30`)
   - 1 attribute: White (`border-white/80`)
   - 2 attributes: Green (`border-emerald-500`)
   - 3 attributes: Blue (`border-sky-500`)
   - 4 attributes: Purple (`border-purple-500`)
   - 5 attributes: Gold (`border-amber-400`)
5. **Exact Game Formulas & Limits:**
   - Classification range is strictly Class 1 to Class 5 (Class 5 is the maximum).
   - Training Weapons work via **Reduced Attack Interval** (Normal: 0%, Spark: -10%, Lightning: -15%, Inferno: -20%, Shadow: -20%) and finite charges (from 3,600 to 43,200), equipped and used in normal combat training against creatures.
   - Bed Maker cycle: Premium Account required, max 2 sleepers/account, full food of 39m59s (5x multiplier = 200 min = 3h20m), regenerating max 200 mana (1 MP/min). Cycle: log in every 3h20m, cast runes, eat to 39m59s, sleep again.
   - Relic Box: 6 slots. Slots 1 & 2 via Melchior in Ankrahmun (talk about "notes"). Slots 3 & 4 via Relic Quest. Slot 5 costs 30.000 gold. Slot 6 costs 60.000 gold.
