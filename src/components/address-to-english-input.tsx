import { Textarea } from "@/components/ui/textarea";
import type { AddressToEnglishJson } from "@/pages/address-to-english.json.ts";
import { cn } from "@/utils/cn.ts";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import useSWR from "swr";

// Ref: https://seanacnet.com/js/js-full-shape-to-half-shape/
const fullShapeToHalfShape = (str: string) =>
  str
    .replace(/[\uff01-\uff5e]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, " ");

function prettyAddress(address: string) {
  // replace 台 with 臺,
  // and remove 臺灣,
  // then convert full-width characters to half-width
  address = fullShapeToHalfShape(
    address.replace(/台/g, "臺").replace(/^臺灣/, ""),
  );

  return address;
}

export const AddressToEnglishInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [result, setResult] = useState<string>();
  const [isValid, setIsValid] = useState(true);
  const deferredValue = useDeferredValue(value);

  const { isLoading, data: addressData } = useSWR<AddressToEnglishJson>(
    deferredValue ? "/address-to-english.json" : null,
    (url: string) => fetch(url).then((response) => response.json()),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    async function translate() {
      if (!addressData) return;

      // the address parts in reverse order
      const parts = ["Taiwan (R.O.C.)"];

      let mutableAddress = prettyAddress(deferredValue);

      const nzh = await import("nzh").then((module) => module.default.hk);

      // encode all numbers to chinese numbers, in order to match villages and roads
      mutableAddress = mutableAddress.replace(/\d+/g, (ch) => nzh.encodeS(ch));

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
          nzh.decodeS(ch, {
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

      setResult(parts.toReversed().join(", "));
      // if the address is valid, parts will have at least 2 elements, and the address should be empty
      setIsValid(parts.length > 1 && !mutableAddress.trim());
    }

    if (deferredValue) void translate();
  }, [deferredValue, addressData]);

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">
      <Textarea
        autoFocus
        ref={inputRef}
        className={cn(
          "whitespace-pre-wrap inline-block text-start break-words break-all text-2xl bg-secondary/50 resize-none focus-visible:ring-0 !ring-offset-0 transition-colors",
          !isValid && "border-red-500",
        )}
        placeholder="臺北市中正區重慶南路1段122號"
        onChange={(event) => {
          event.currentTarget.style.height = "";
          event.currentTarget.style.height =
            event.currentTarget.scrollHeight + "px";

          setValue(event.currentTarget.value.trim());
        }}
        rows={3}
      />
      <Textarea
        className="whitespace-pre-wrap inline-block text-start break-words break-all text-lg border-none bg-secondary/50 resize-none focus-visible:ring-0 !ring-offset-0"
        value={isLoading ? "正在更新地址資料..." : result}
        readOnly
        placeholder="No. 122, Sec. 1, Chongqing S. Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)"
      />
      {result && (
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(result)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          在 Google Maps 上查看
        </a>
      )}
    </div>
  );
};
