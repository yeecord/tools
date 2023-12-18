const defaultLanguage = "zh-tw";

export const languages = {
  "zh-tw": {
    code: "zh-tw",
    name: "中文（台灣）",
    "href-lang": "zh-Hant-TW",
    "global.title": "Yeecord 小工具",
    "global.description":
      "實用的數學小工具，包含進位計算機等簡便小工具，以及乾淨的操作介面",
    "home.base-converter.title": "{0}進位轉{1}進位",
    "home.recommended": "為你推薦",
    "home.base-converter": "進制轉換",
    "global.header.title": "小工具",
    "base-converter.dec": "十進位",
    "base-converter.bin": "二進位",
    "base-converter.oct": "八進位",
    "base-converter.hex": "十六進位",
    "base-converter.title": "即時{0}進制轉{1}進位轉換器",
    "base-converter.description": "在你的瀏覽器就能使用的{0}的計算機",
    "base-converter.hero.title": "即時進制轉換器",
    "base-converter.hero.description":
      "寫作業需要的時候很好用，讓你在不同進位快速轉換，考試老師不會查你就用就這個",
    "two-complement.title": "二補數計算機",
    "two-complement.description": "簡易的八位元、十六位元、等二補數計算機",
    "global.from": "從",
    "global.to": "到",
    "global.reverse": "反轉",
    "qrcode.title": "完全免費的線上 QR Code 產生器",
    "qrcode.description": "簡單的 QR Code 產生器，完全免費",
  },
  "zh-cn": {
    code: "zh-cn",
    name: "中文（简体）",
    "href-lang": "zh-Hans-CN",
    "global.title": "Yeecord 小工具",
    "global.description":
      "实用的数学小工具，包含进位计算机等简便小工具，以及干净的操作界面",
    "home.base-converter.title": "{0}进制转{1}进制",
    "home.recommended": "为你推荐",
    "home.base-converter": "进制转换",
    "global.header.title": "小工具",
    "base-converter.dec": "十进制",
    "base-converter.bin": "二进制",
    "base-converter.oct": "八进制",
    "base-converter.hex": "十六进制",
    "base-converter.title": "即时{0}进制转{1}进制转换器",
    "base-converter.description": "在你的浏览器就能使用的{0}的计算机",
    "base-converter.hero.title": "即时进制转换器",
    "base-converter.hero.description":
      "写作业需要的时候很好用，让你在不同进位快速转换，考试老师不会查你就用就这个",
    "two-complement.title": "二补数计算机",
    "two-complement.description": "简易的八位元、十六位元、等二补数计算机",
    "global.from": "从",
    "global.to": "到",
    "global.reverse": "反转",
    "qrcode.title": "完全免费的在线 QR Code 产生器",
    "qrcode.description": "简单的 QR Code 产生器，完全免费",
  },
  en: {
    code: "en",
    name: "English",
    "href-lang": "en",
    "global.title": "Yeecord Tools",
    "global.description":
      "Useful math utils, including base converter and other simple tools, with clean UI",
    "home.base-converter.title": "{0} to {1} Converter",
    "home.recommended": "Recommended for you",
    "home.base-converter": "Base Converter",
    "global.header.title": "Tools",
    "base-converter.dec": "Decimal",
    "base-converter.bin": "Binary",
    "base-converter.oct": "Octal",
    "base-converter.hex": "Hexadecimal",
    "base-converter.title": "Realtime {0} to {1} Converter",
    "base-converter.description": "A {0} calculator that works in your browser",
    "base-converter.hero.title": "Realtime Base Converter",
    "base-converter.hero.description":
      "It's useful when you need to do your homework, it allows you to convert between different bases quickly, and the teacher won't check if you use it.",
    "two-complement.title": "Two's Complement Calculator",
    "two-complement.description":
      "Simple 8-bit, 16-bit, etc. two's complement calculator",
    "global.from": "From",
    "global.to": "To",
    "global.reverse": "Reverse",
    "qrcode.title": "Free online QR Code generator",
    "qrcode.description": "Simple QR Code generator, completely free",
  },
  jp: {
    code: "jp",
    name: "日本語",
    "href-lang": "ja",
    "global.title": "Yeecord ツール",
    "global.description":
      "便利な数学ツール、進数変換機などのシンプルなツール、クリーンなUI",
    "home.base-converter.title": "{0}から{1}への変換",
    "home.recommended": "おすすめ",
    "home.base-converter": "進数変換機",
    "global.header.title": "ツール",
    "base-converter.dec": "十進数",
    "base-converter.bin": "二進数",
    "base-converter.oct": "八進数",
    "base-converter.hex": "十六進数",
    "base-converter.title": "リアルタイム{0}から{1}への変換",
    "base-converter.description": "ブラウザで動作する{0}の計算機",
    "base-converter.hero.title": "リアルタイム進数変換機",
    "base-converter.hero.description":
      "宿題をするときに便利です。異なる基数間を素早く変換でき、先生はそれを使用しているかどうかを確認しません。",
    "two-complement.title": "2の補数計算機",
    "two-complement.description":
      "シンプルな8ビット、16ビットなどの2の補数計算機",
    "global.from": "から",
    "global.to": "へ",
    "global.reverse": "逆",
    "qrcode.title": "完全無料のオンラインQRコードジェネレーター",
    "qrcode.description": "シンプルなQRコードジェネレーター、完全無料",
  },
} as const;

export type TranslateFunction = ReturnType<typeof createTranslation>;

export type LanguageCode = keyof typeof languages;

export type LanguageKey = keyof (typeof languages)[typeof defaultLanguage];

export function createTranslation(code: string) {
  const lang = languages[code as LanguageCode];

  if (!lang) throw new Error(`Language ${lang} not found`);

  const t = function t(key: LanguageKey, ...args: string[]) {
    let resolved = lang[key] ?? languages[defaultLanguage][key];

    if (!(key in lang))
      throw new Error(`Key ${key} not found in ${code} or ${defaultLanguage}.`);

    // interesting typescript hack here, or it will be string type not string literal
    for (const [i, arg] of args.entries())
      resolved = resolved.replace(`{${i}}`, arg) as typeof resolved;

    return resolved;
  };

  t.language = code;

  return t;
}

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: {
      lang,
    },
  }));
}
