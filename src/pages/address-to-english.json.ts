import { getAddressToEnglishJson } from "~/utils/get-address-data-json";

export const prerender = true;

export async function GET() {
  return Response.json(await getAddressToEnglishJson());
}
