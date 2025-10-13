import type Nzh from "nzh";
import type { AddressToEnglishJson } from "~/utils/get-address-data-json";

// Ref: https://seanacnet.com/js/js-full-shape-to-half-shape/
const fullShapeToHalfShape = (str: string) => {
  return str
    .replace(/[\uff01-\uff5e]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, " ");
};

function prettyAddress(address: string) {
  // replace 台 with 臺,
  // then convert full-width characters to half-width
  return fullShapeToHalfShape(address.replace(/台/g, "臺"));
}

function nth(d: number) {
  if (d > 3 && d < 21) return "th";

  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Ref: https://www.post.gov.tw/post/internet/Postal/sz_a_e_ta1.jsp
const numberMatchingPatterns: {
  regex: RegExp;
  render: (match: RegExpMatchArray) => string;
}[] = [
  {
    regex: /(\d+) *弄/,
    render: (match) => `Aly. ${match[1]}`,
  },
  {
    regex: /(\d+) *巷/,
    render: (match) => `Ln. ${match[1]}`,
  },
  {
    regex: /(\d+) *衖/,
    render: (match) => `Sub-Alley ${match[1]}`,
  },
  {
    // match the number part with only numbers or numbers with a dash (e.g. 11-1)
    regex: /((\d+)(-\d+)?) *號/,
    render: (match) => `No. ${match[1]}`,
  },
  {
    regex: /((\d+)(-(\d+))?) *[樓F]/,
    render(match) {
      // if extra number is found, format it to 1F.-2 (e.g. 1-1樓 => 1F.-1)
      if (match[4]) return `${match[2]}F.-${match[4]}`;

      return `${match[1]}F.`;
    },
  },
  {
    regex: /(\d+) *[室房]/,
    render: (match) => `Rm. ${match[1]}`,
  },
  {
    regex: /(\d+) *鄰/,
    render: (match) => `${match[1]}${nth(Number(match[1]))} Neighborhood`,
  },
];

type DataMatchingPattern<T extends keyof AddressToEnglishJson> = {
  key: T;
  render: (item: AddressToEnglishJson[T][number]) => string;
  chineseIndex: number;
};

const dataMatchingPatterns: DataMatchingPattern<keyof AddressToEnglishJson>[] =
  [
    {
      key: "county",
      render: ([zipCode, _, english]) => `${english} ${zipCode}`,
      chineseIndex: 1,
    },
    {
      key: "villages",
      render: ([_, english]) => english,
      chineseIndex: 0,
    },
    {
      key: "roads",
      render: ([_, english]) => english,
      chineseIndex: 0,
    },
  ];

export function translateAddressToEnglish(
  addressData: AddressToEnglishJson,
  value: string,
  // Manually pass in lazy loaded nzh instance to reduce bundle size
  nzhInstance: typeof Nzh.hk,
) {
  // the address parts in reverse order
  const parts = ["Taiwan (R.O.C.)"];

  let mutableAddress = prettyAddress(value);

  // if the address starts with a zip code or 臺灣, remove it
  const zipCodeMatch = mutableAddress.match(/^(\d{3,6})? *(臺灣)?/);

  if (zipCodeMatch && zipCodeMatch.length > 0) {
    mutableAddress = mutableAddress.replace(zipCodeMatch[0], "").trim();
  }

  // encode all numbers to chinese numbers, in order to match villages and roads
  mutableAddress = mutableAddress.replace(/\d+/g, (ch) =>
    nzhInstance.encodeS(ch),
  );

  for (const { key, chineseIndex, render } of dataMatchingPatterns) {
    // find the best match (longest) data matching pattern
    const bestMatch = addressData[key]
      .filter((arr) => mutableAddress.startsWith(arr[chineseIndex]))
      .toSorted((a, b) => b[chineseIndex].length - a[chineseIndex].length)[0];

    if (bestMatch) {
      parts.push(render(bestMatch));
      mutableAddress = mutableAddress
        .replace(bestMatch[chineseIndex], "")
        .trim();
    }
  }

  // decode all numbers back to arabic numbers
  mutableAddress = mutableAddress
    .replace(/[零一二三四五六七八九十百]+/g, (ch) =>
      nzhInstance.decodeS(ch, {
        tenMin: true,
      }),
    )
    // format ${number}之${extra} to ${number}-${extra}${type} (e.g. 11號之1 => 11-1號)
    .replace(
      /(\d+)(.)?[之-](\d+)/g,
      (_, number, type, extra) => `${number}-${extra}${type ?? ""}`,
    );

  let roundSuccess = false;

  // keep retry and iterate until no number matching patterns are found
  do {
    roundSuccess = false;

    // iterate through all number matching patterns, and render the matched part
    for (const { regex, render } of numberMatchingPatterns) {
      const matched = mutableAddress.match(regex);

      if (matched && matched.length > 0) {
        parts.push(render(matched));
        mutableAddress = mutableAddress.replace(matched[0], "").trim();
        roundSuccess = true;
      }
    }
  } while (roundSuccess);

  return {
    result: parts.toReversed().join(", "),
    // if the address is valid, parts will have at least 2 elements, and the address should be empty
    isValid: parts.length > 1 && !mutableAddress.trim(),
  };
}
