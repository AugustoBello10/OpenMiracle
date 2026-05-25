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
