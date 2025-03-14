import languages, { type Language } from "~/utils/languages";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LanguageSlice = {
  language: Language;
  setLanguage: (newLanguage: Language) => void;
};

const frenchLanguageIndex = 0;

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  language: languages[frenchLanguageIndex],
  setLanguage: (newLanguage: Language) => set({ language: newLanguage }),
});
