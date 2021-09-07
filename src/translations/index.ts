import { InternalTranslationSource } from "./sources/internal";
import { TranslationSource } from "./translationSource";
import { Language } from "../types/languages";

export class Translations {
  /**
   * A list of translation sources to pull from.
   */
  private static readonly sources: TranslationSource[] = [
    new InternalTranslationSource(),
  ];

  /**
   * Get every language supported by all listed sources.
   *
   * WARN: The performance of this function call is non-trivial
   *
   * @returns A set of all supported languages
   */
  static getAllSupportedLanguages(): Set<Language> {
    const supportedLanguages: Set<Language> = new Set();

    for (let i = 0; i < this.sources.length; i++) {
      const sourceSupportedLanguages = this.sources[i].getAllLanguages();

      for (let j = 0; j < sourceSupportedLanguages.length; j++) {
        const sourceSupportedLanguage = sourceSupportedLanguages[j];

        supportedLanguages.add(sourceSupportedLanguage);
      }
    }

    return supportedLanguages;
  }

  /**
   * Get a translation for a specific key and language
   *
   * @param language - The language use when searching for the translation
   * @param translationKey - The translation key to use when searching for the translation
   */
  static getTranslation(language: Language, translationKey: string, args: Record<string, unknown>): string {
    const supportedSource = this.sources.find(source => source.containsKey(language, translationKey));

    if (supportedSource) {
      return supportedSource.getTranslation(language, translationKey, args)!;
    }

    throw new Error(`No source contained a translation for the requested key and language (${translationKey}) (${language})`);
  }
}
