import { getAddressToEnglishJson } from "@/utils/get-address-data-json";

export const prerender = false;

export async function GET() {
  const response = new Response(
    JSON.stringify(await getAddressToEnglishJson()),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, stale-while-revalidate=3600, max-age=3600",
      },
    },
  );
}
