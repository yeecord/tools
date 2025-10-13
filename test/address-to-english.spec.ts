import Nzh from "nzh";
import { expect, test } from "vitest";
import { getAddressToEnglishJson } from "~/utils/get-address-data-json";
import { translateAddressToEnglish } from "~/utils/translate-address-to-english";

const testCases = [
  [
    "臺北市中正區八德路一段1號",
    "No. 1, Sec. 1, Bade Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)",
  ],
  [
    "106台北市大安區臥龍街100號",
    "No. 100, Wolong St., Da’an Dist., Taipei City 106, Taiwan (R.O.C.)",
  ],
  [
    "基隆市中正區祥豐街124之1號",
    "No. 124-1, Xiangfeng St., Zhongzheng Dist., Keelung City 202, Taiwan (R.O.C.)",
  ],
  [
    "桃園市桃園區三民路三段59號",
    "No. 59, Sec. 3, Sanmin Rd., Taoyuan Dist., Taoyuan City 330, Taiwan (R.O.C.)",
  ],
  [
    "105台灣台北市松山區南京東路四段1號6樓",
    "6F., No. 1, Sec. 4, Nanjing E. Rd., Songshan Dist., Taipei City 105, Taiwan (R.O.C.)",
  ],
  [
    "105台灣台北市松山區南京東路四段六鄰1號6樓之2",
    "6th Neighborhood, 6F.-2, No. 1, Sec. 4, Nanjing E. Rd., Songshan Dist., Taipei City 105, Taiwan (R.O.C.)",
  ],
  [
    "臺中市西區公益路367號10F-2",
    "10F.-2, No. 367, Gongyi Rd., West Dist., Taichung City 403, Taiwan (R.O.C.)",
  ],
] as const;

test("address-to-english", async () => {
  const addressData = await getAddressToEnglishJson();

  for (const [input, expected] of testCases) {
    const { result } = translateAddressToEnglish(addressData, input, Nzh.hk);

    expect(result).toBe(expected);
  }
});
