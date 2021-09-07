/**
 * Just a scratchpad for testing methods.
 * Tests will be written soon (tm)
 */

import { Translations } from "..";

console.log("Translations#getAllSupportedLanguages", Translations.getAllSupportedLanguages());
console.log("Basic Translation |", Translations.getTranslation("fr", "global.example.basic", {}));
console.log("Plural Translation (1) |", Translations.getTranslation("fr", "global.example.plural", { count: 1 }));
console.log("Plural Translation (2) |", Translations.getTranslation("fr", "global.example.plural", { count: 2 }));
console.log("Gender (She/Her/Hers) |", Translations.getTranslation("fr", "global.example.gender", { gender: "F" }));
console.log("Gender (He/Him/His) |", Translations.getTranslation("fr", "global.example.gender", { gender: "M" }));
console.log("Gender (They/Them/Theirs) |", Translations.getTranslation("fr", "global.example.gender", { gender: "X" }));
console.log("Named (UserX) (She/Her/Hers) |", Translations.getTranslation("fr", "global.example.named", { gender: "F", name: "UserX" }));
console.log("Named (UserX) (He/Him/His) |", Translations.getTranslation("fr", "global.example.named", { gender: "M", name: "UserX" }));
console.log("Named (UserX) (They/Them/Theirs) |", Translations.getTranslation("fr", "global.example.named", { gender: "X", name: "UserX" }));
