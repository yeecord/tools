import xlsx from "node-xlsx";

async function downloadXlsToJSON<T>(fileName: string) {
  const response = await fetch(
    `https://www.post.gov.tw/post/download/${fileName}`,
  );

  const buffer = await response.arrayBuffer();

  const workbook = xlsx.parse<T>(buffer);

  const sheet = workbook[0]?.data;

  if (!sheet) throw new Error(`Sheet not found for ${fileName}`);

  return sheet;
}

export type AddressToEnglishJson = {
  county: [string, string, string][];
  villages: [string, string][];
  roads: [string, string][];
};

export async function getAddressToEnglishJson() {
  // zip code, chinese, english
  const county =
    await downloadXlsToJSON<[string, string, string]>("county_h_10706.xls");

  for (const item of county) {
    item[1] = item[1].replace(/台/g, "臺");
  }

  const villageResponse = await fetch(
    "https://www.post.gov.tw/post/internet/Postal/village.txt",
  );

  const villageText = await villageResponse.text();

  // remove invalid character
  const villages = villageText
    .replace(//g, "")
    .split("\n")
    .map((line) => JSON.parse(`[${line}]`) as [string, string]);

  for (const item of villages) {
    item[1] = item[1].replace(/台/g, "臺");
  }

  const roads = await downloadXlsToJSON<[string, string]>(
    "6.5_CEROAD11107.xlsx",
  );

  for (const item of roads) {
    item[1] = item[1].replace(/台/g, "臺");
  }

  return {
    county,
    villages,
    roads,
  } satisfies AddressToEnglishJson;
}
