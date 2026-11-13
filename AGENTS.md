# Agent Rules & Code Protection Guidelines

Please adhere strictly to these rules to preserve the stable and working modules of the **Miracle Wiki Tools** project:

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

## 🧩 Coordination rules
- Do not remove or alter existing tabs in the main navigation bar.
- Do not perform wide-reaching refactoring or formatting across the entire codebase that might break the existing styling of components.

## 📜 Standard Operating Guidelines for Wiki & Guides (STRICT & MANDATORY)
1. **Zero Hallucination & Zero Invented Mechanics:**
   - NEVER assume or invent mechanics from global Tibia or other OTServers (e.g., NO exercise dummies, NO auto-striking on dummies, "praças" are NOT PZ, etc.).
   - If an in-game mechanic, step, or quest spoiler is not explicitly known or verified in Miracle 7.4 files/Discord, DO NOT invent it. State clearly what is known and request verification from the user.
2. **100% Bilingual Completeness (PT & EN):**
   - Every single guide, narrative paragraph, step, notice card, table, and item description MUST have full, complete translations for both Portuguese (`language === 'pt'`) and English (`language === 'en'`). Never leave Portuguese body text rendered when the user selects English.
3. **Clean Editorial Typography (No Header Icons/Emojis):**
   - NEVER put Lucide icons or emojis inside `<h1>`, `<h2>`, `<h3>`, `<h4>` titles, subtitles, or system button headers. Keep titles purely textual, clean, and professional.
4. **Ultra-Pedagogical Step-by-Step ("Take by the Hand"):**
   - Write clear, continuous narrative explanations assuming the reader is a complete beginner. Explain where to click, what opens on screen, and what mistakes to avoid.
   - Accompany steps with real in-game screenshots and official sprites for all cited items.
5. **Exact Game Formulas & Limits:**
   - Classification range is strictly Class 1 to Class 5 (Class 5 is the maximum).
   - Training Weapons work via **Reduced Attack Interval** (Normal: 0%, Spark: -10%, Lightning: -15%, Inferno: -20%, Shadow: -20%) and finite charges (from 3,600 to 43,200), equipped and used in normal combat training against creatures.
   - Bed Maker cycle: Premium Account required, max 2 sleepers/account, full food of 39m59s (5x multiplier = 200 min = 3h20m), regenerating max 200 mana (1 MP/min). Cycle: log in every 3h20m, cast runes, eat to 39m59s, sleep again.
