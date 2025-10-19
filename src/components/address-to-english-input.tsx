import { Copy, Loader2, MapIcon } from "lucide-react";
import nzh from "nzh/hk";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/utils/cn.ts";
import type { AddressToEnglishJson } from "~/utils/get-address-data-json";
import {
  type TranslateAddressToEnglish,
  translateAddressToEnglish,
} from "~/utils/translate-address-to-english";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

export const AddressToEnglishInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [result, setResult] = useState<TranslateAddressToEnglish[]>([]);

  const deferredValue = useDeferredValue(value.trim());

  const { isLoading, data: addressData } = useSWR<AddressToEnglishJson>(
    deferredValue ? "/address-to-english.json" : null,
    (url: string) => fetch(url).then((response) => response.json()),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    // load address from the url address hash
    try {
      const searchParams = new URLSearchParams(location.hash.slice(1));

      const address = searchParams.get("address");

      if (address) setValue(address.replaceAll(";", "\n"));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // update url address param without reloading the page
    const url = new URL(location.href);

    const searchParams = new URLSearchParams();

    const addresses = deferredValue
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    if (deferredValue) searchParams.set("address", addresses.join(";"));

    url.hash = searchParams.toString();

    history.replaceState({}, "", url.toString());

    if (!addressData || !deferredValue) return;

    setResult(
      addresses.map((address) =>
        translateAddressToEnglish(addressData, address, nzh),
      ),
    );
  }, [deferredValue, addressData]);

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">
      <link
        rel="preload"
        href="/address-to-english.json"
        as="fetch"
        crossOrigin="anonymous"
      />
      <Textarea
        name="address"
        autoFocus
        ref={inputRef}
        className="whitespace-pre-wrap inline-block text-start break-words break-all text-2xl bg-secondary/15 resize-none focus-visible:ring-0 !ring-offset-0 transition-colors"
        value={value}
        placeholder="臺北市中正區重慶南路1段122號"
        onChange={(event) => {
          event.currentTarget.style.height = "";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;

          setValue(event.currentTarget.value);
        }}
        rows={3}
      />
      {isLoading && (
        <span className="text-muted-foreground flex justify-center items-center gap-2">
          正在載入中華郵政資料 <Loader2 className="w-4 animate-spin" />
        </span>
      )}
      <div className="flex flex-col gap-2">
        {result.map((result, index) => (
          <TranslatedRow key={`${index}-${result}`}>{result}</TranslatedRow>
        ))}
      </div>
    </div>
  );
};

function TranslatedRow({ children }: { children: TranslateAddressToEnglish }) {
  return (
    <div
      className={cn(
        "px-3 py-2 rounded-md whitespace-pre-wrap text-start break-words break-all text-lg border-none bg-secondary/50",
        !children.isValid && "border-destructive",
      )}
    >
      <span className="text-sm text-muted-foreground pb-1 block">
        {children.original}
      </span>
      <div>
        <span className="text-pretty">{children.result}</span>
        <ButtonGroup className="float-end inline-block py-1">
          <Button
            variant="outline"
            aria-label="複製到剪貼簿"
            onClick={async (e) => {
              e.preventDefault();
              await navigator.clipboard
                .writeText(location.href)
                .catch((e) => toast.error(String(e)));

              toast.success("已複製連結到剪貼簿");
            }}
          >
            <Copy />
          </Button>
          <Button asChild variant="outline">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/${encodeURIComponent(children.result)}`}
              title="在 Google Map 查看"
              aria-label="在 Google Map 查看"
            >
              <MapIcon />
            </a>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
