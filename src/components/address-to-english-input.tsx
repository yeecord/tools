import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn.ts";
import type { AddressToEnglishJson } from "@/utils/get-address-data-json";
import { translateAddressToEnglish } from "@/utils/translate-address-to-english";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import useSWR from "swr";

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
      if (!deferredValue || !addressData) return;

      const nzh = await import("nzh").then((module) => module.default.hk);

      const { result, isValid } = translateAddressToEnglish(
        addressData,
        deferredValue,
        nzh,
      );

      setResult(result);
      setIsValid(isValid);
    }

    void translate();
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
        value={isLoading ? "正在更新中華郵政資料..." : result}
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
