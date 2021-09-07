import { Language } from "../types/languages";

export interface TranslationSource {
  /**
   * Request a translation from this translation source.
   *
   * @param language - The requested language to translate into
   * @param translationKey - The translation key used to find the translation
   * @returns The translated string, or undefined if the translation does not exist in this source
   */
  getTranslation(language: Language, translationKey: string, args: Record<string, unknown>): string | undefined;

  /**
   * Checks to see if this translation controller contains the requested key.
   *
   * @param language - The language to check
   * @param translationKey - The translation key to check
   * @returns A boolean, true if this source contains the desired key
   */
  containsKey(language: Language, translationKey: string): boolean;

  /**
   * Checks to see if this source contains the requested language.
   *
   * @param language - The language to check
   * @returns A boolean, true if this source contains the desired language
   */
  containsLanguage(language: Language): boolean;

  /**
   * Checks the coverage of a certain language.
   *
   * @param language - The language to check
   * @returns The number of keys this language has in this source. Returns 0 if this source has no keys for this language
   */
  getLanguageCoverage(language: Language): number;

  /**
   * Get all supported languages (including partially) by this source.
   *
   * @returns The supported languages
   */
  getAllLanguages(): Language[];
}
