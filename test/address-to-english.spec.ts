import { getAddressToEnglishJson } from "@/utils/get-address-data-json";
import { translateAddressToEnglish } from "@/utils/translate-address-to-english";
import Nzh from "nzh";
import { expect, test } from "vitest";

const testCases = [
  [
    "臺北市中正區八德路一段1號",
    "No. 1, Sec. 1, Bade Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)",
  ],
] as const;

test("address-to-english", async () => {
  const addressData = await getAddressToEnglishJson();

  for (const [input, expected] of testCases) {
    const { result } = translateAddressToEnglish(addressData, input, Nzh.hk);

    expect(result).toBe(expected);
  }
});
