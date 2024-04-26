import type { AddressToEnglishJson } from "@/utils/get-address-data-json";
import type Nzh from "nzh";

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
  // and remove 臺灣,
  // then convert full-width characters to half-width
  address = fullShapeToHalfShape(
    address.replace(/台/g, "臺").replace(/^臺灣/, ""),
  );

  return address;
}

export function translateAddressToEnglish(
  addressData: AddressToEnglishJson,
  value: string,
  nzhInstance: typeof Nzh.hk,
) {
  // the address parts in reverse order
  const parts = ["Taiwan (R.O.C.)"];

  let mutableAddress = prettyAddress(value);

  // encode all numbers to chinese numbers, in order to match villages and roads
  mutableAddress = mutableAddress.replace(/\d+/g, (ch) =>
    nzhInstance.encodeS(ch),
  );

  for (const [zipCode, chinese, english] of addressData.county) {
    if (mutableAddress.startsWith(chinese)) {
      parts.push(`${english} ${zipCode}`);
      mutableAddress = mutableAddress.replace(chinese, "");

      break;
    }
  }

  for (const [chinese, english] of addressData.villages) {
    if (mutableAddress.startsWith(chinese)) {
      parts.push(english);
      mutableAddress = mutableAddress.replace(chinese, "");

      break;
    }
  }

  // find the best match (longest) road name
  const bestMatchRoad = addressData.roads
    .filter(([chinese]) => mutableAddress.startsWith(chinese))
    .toSorted((a, b) => b[0].length - a[0].length)[0];

  if (bestMatchRoad) {
    parts.push(bestMatchRoad[1]);
    mutableAddress = mutableAddress.replace(bestMatchRoad[0], "");
  }

  // decode all numbers back to arabic numbers,
  // format ${number}之${extra} to ${number}-${extra}${type} (e.g. 11號之1 => 11-1號)
  mutableAddress = mutableAddress
    .replace(/[零一二三四五六七八九十百]+/g, (ch) =>
      nzhInstance.decodeS(ch, {
        tenMin: true,
      }),
    )
    .replace(/(\d+)(.)?之(\d+)/g, (ch, number, type = "", extra) =>
      ch.replace(`${number}${type}之${extra}`, `${number}-${extra}${type}`),
    );

  const laneMatch = mutableAddress.match(/(\d+) *巷/);

  if (laneMatch?.length) {
    parts.push(`Ln. ${laneMatch[1]}`);
    mutableAddress = mutableAddress.replace(laneMatch[0], "");
  }

  const alleyMatch = mutableAddress.match(/(\d+) *弄/);

  if (alleyMatch?.length) {
    parts.push(`Aly. ${alleyMatch[1]}`);
    mutableAddress = mutableAddress.replace(alleyMatch[0], "");
  }

  // match the number part with only numbers or numbers with a dash (e.g. 11-1)
  const numberMatch = mutableAddress.match(/((\d+)(-\d+)?) *號/);

  if (numberMatch?.length) {
    parts.push(`No. ${numberMatch[1]}`);
    mutableAddress = mutableAddress.replace(numberMatch[0], "");
  }

  const floorMatch = mutableAddress.match(/(\d+) *樓/);

  if (floorMatch?.length) {
    parts.push(`${floorMatch[1]}F.`);
    mutableAddress = mutableAddress.replace(floorMatch[0], "");
  }

  const roomMatch = mutableAddress.match(/(\d+) *[室房]/);

  if (roomMatch?.length) {
    parts.push(`Rm. ${roomMatch[1]}`);
    mutableAddress = mutableAddress.replace(roomMatch[0], "");
  }

  return {
    result: parts.toReversed().join(", "),
    // if the address is valid, parts will have at least 2 elements, and the address should be empty
    isValid: parts.length > 1 && !mutableAddress.trim(),
  };
}
