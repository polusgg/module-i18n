# Polus.gg Translation Repository
 This is the official translations repository for Polus.gg, it houses translations under `./translations/{language}/{category}.json`

## How to translate
Language directories are structured in the following format
```
Translations
  Language Name
    Translation Category.json
    Translation Category.json
    Translation Category.json
    ...
```
The intention is that each "category" will represent a section of polus.gg, account, client, web, gamemodes (like town of polus), system, etc.

Inside each translation category json file, is a key value pair of the following type:
```ts
type TranslationCategory = Record<
  string,
  Record<string, string> | string,
>;
```
translations are indexed by "keys", which look like the following: "category.group.item", for example: "global.example.simple" (a simple example string)

The value of a translation key has 2 options "simple" and "interactive". A simple translation key will just be read and inserted with no more work done. Simple phrases like names of rooms, or buttons can be translated directly with no more information needed.

However, some sentences require context, In english talking about an item requires talking about it's quantity. `I have an apple` (Singular) vs `I have apples` (Plural).

Our solution is "Interactive" translation keys, these allow filtering based on JS methods. For example:

```json
{
  "global.example.apples": {
    "args.count == 1": "I have an apple",
    "args.count != 1": "I have apples"
  }
}
```
In this case, our translation algorithm will run (top-down) checking each key for it's "truthiness" ([mozilla truthy docs](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)) and return the first value which is "true".

However, this does not cover all cases. Sometimes you need to insert strings into your translation, for example when talking about a person.

```json
{
  "global.examples.user": "{args.name} is a user"
}
```

You can use `{}` to denote js code inside of a translation, in this case JS will evaluate the value of "args.name" and insert it into the string

## How to contribute

Please make a pull request with the language you want to add or the translations you wish to change. It will be reviewed by a Sr.Dev, and if approved will make it into the next server release.
