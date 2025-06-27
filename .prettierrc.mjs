// @ts-check
/**
 * @type {import("prettier").Config}
 */
export default {
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    objectWrap: "preserve",
    bracketSameLine: false,
    rangeStart: 0,
    rangeEnd: Number.POSITIVE_INFINITY,
    //   parser: LiteralUnion<BuiltInParserName>;
    //   filepath: string;
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    arrowParens: "always",
    plugins: ["prettier-plugin-tailwindcss"],
    htmlWhitespaceSensitivity: "strict",
    endOfLine: "lf",
    quoteProps: "consistent",
    vueIndentScriptAndStyle: true,
    embeddedLanguageFormatting: "auto",
    singleAttributePerLine: true,
    experimentalOperatorPosition: "end",
    experimentalTernaries: true,
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
};
