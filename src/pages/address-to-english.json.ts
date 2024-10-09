import { getAddressToEnglishJson } from "@/utils/get-address-data-json";

export const prerender = false;

export async function GET() {
  const result = await getAddressToEnglishJson();

  return Response.json(result, {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, stale-while-revalidate=3600, max-age=3600",
    },
  });
}
