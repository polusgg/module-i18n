/**
 * The internal translation source. Pulls from community translations in the `@polusgg/module-i18n/translations` directory.
 */

import { TranslationSource } from "../translationSource";
import { Language, LANGUAGES } from "../../types/languages";
import path from "path";
import fs from "fs";

export class InternalTranslationSource implements TranslationSource {
  protected languageMap: Map<Language, Map<string, Record<string, string> | string>> = new Map();

  constructor() {
    const translationsPath = path.join(__dirname, "../../../translations");
    const directoryContents = fs.readdirSync(translationsPath);

    for (let index = 0; index < directoryContents.length; index++) {
      // LANGUAGES is typeof Language[], but because directoryContents is a string, typescript fails
      // to map string to Language in the includes call.
      // this is stupid.

      if (!LANGUAGES.includes(directoryContents[index] as Language)) {
        console.warn(`WARNING (module-i18n): ${directoryContents[index]} included in translations directory, though not a valid language.`);
        continue;
      }

      const strings = new Map<string, Record<string, string> | string>();
      const declarationFiles = fs.readdirSync(path.join(translationsPath, directoryContents[index]));

      for (let i = 0; i < declarationFiles.length; i++) {
        const declarationFile = declarationFiles[i];
        const contents = JSON.parse(fs.readFileSync(path.join(translationsPath, directoryContents[index], declarationFile), "utf-8")) as Record<string, Record<string, string> | string>;

        for (const [key, value] of Object.entries(contents)) {
          strings.set(key, value);
        }
      }

      this.languageMap.set(directoryContents[index] as Language, strings);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTranslation(language: Language, translationKey: string, args: Record<string, unknown>): string | undefined {
    if (!this.languageMap.has(language)) {
      return undefined;
    }

    if (!this.languageMap.get(language)!.has(translationKey)) {
      return undefined;
    }

    const val = this.languageMap.get(language)!.get(translationKey)!;

    if (typeof val === "string") {
      const matches = val.matchAll(/\{([^{}]+)\}/gmi);
      let computedValue: string = val;

      for (const match of matches) {
        computedValue = computedValue.replace(match[0], eval(match[1]));
      }

      return computedValue;
    }

    for (const [key, value] of Object.entries(val)) {
      /**
       * Yes, we're using eval here.
       * please show me your blog posts about why you should never ever ever use it,
       * i'm very interested.
       *
       * The use of eval is okay in this context, since input
       * is not arbitrary. A human will be verifying every
       * input passed in here, verifying is non-malicious status
       */
      if (eval(key)) {
        const matches = value.matchAll(/\{([^{}]+)\}/gmi);
        let computedValue: string = value;

        for (const match of matches) {
          computedValue = computedValue.replace(match[0], eval(match[1]));
        }

        return computedValue;
      }
    }
  }

  containsKey(language: Language, translationKey: string): boolean {
    if (!this.languageMap.has(language)) {
      return false;
    }

    return this.languageMap.get(language)!.has(translationKey);
  }

  containsLanguage(language: Language): boolean {
    return this.languageMap.has(language);
  }

  getLanguageCoverage(language: Language): number {
    return this.languageMap.get(language)?.size ?? 0;
  }

  getAllLanguages(): Language[] {
    return [...this.languageMap.keys()];
  }
}
