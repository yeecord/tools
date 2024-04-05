import { Textarea } from "@/components/ui/textarea";
import { toDataURL } from "qrcode";
import { useEffect, useRef, useState } from "react";

export const QrcodeGenerator = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [dataUrl, setDataUrl] = useState<string>();

  useEffect(() => {
    if (!value) return setDataUrl(undefined);

    toDataURL(value, {
      width: 512,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).then(setDataUrl);
  }, [value]);

  return (
    <div className="max-w-lg w-full mx-auto flex flex-col items-center gap-4">
      <Textarea
        ref={inputRef}
        className="whitespace-pre-wrap inline-block text-start break-words break-all text-2xl bg-secondary/25 resize-none focus-visible:ring-0 !ring-offset-0"
        onChange={(event) => {
          event.currentTarget.style.height = "";
          event.currentTarget.style.height =
            event.currentTarget.scrollHeight + "px";

          setValue(event.currentTarget.value);
        }}
        rows={3}
      />
      <div className="!w-40 !h-40">
        {dataUrl && <img src={dataUrl} alt="QRCode" />}
      </div>
    </div>
  );
};
