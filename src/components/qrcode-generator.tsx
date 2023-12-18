import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { toCanvas } from "qrcode";

export const QrcodeGenerator = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    toCanvas(canvasRef.current, value, {
      width: 512,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
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
      <canvas ref={canvasRef} className="!w-40 !h-40" />
    </div>
  );
};
