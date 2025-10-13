import { XMLParser } from "fast-xml-parser";
import Papa from "papaparse";

export type AddressToEnglishJson = {
  county: [string, string, string][];
  villages: [string, string][];
  roads: [string, string][];
};

export async function getAddressToEnglishJson() {
  const [county, villages, roads] = await Promise.all([
    getCounty(),
    getVillages(),
    getRoads(),
  ]);

  return {
    county,
    villages: villages.data,
    roads: roads.data,
  } satisfies AddressToEnglishJson;
}

async function getCounty() {
  const countyResponse = await fetch(
    "https://www.post.gov.tw/post/download/County_h_10906.xml",
  );

  const countyText = fixTextFile(await countyResponse.text());

  const countyParsed = new XMLParser({
    // keep it all string
    parseTagValue: false,
    ignoreAttributes: true,
    removeNSPrefix: true,
  }).parse(countyText) as {
    dataroot: {
      County_h_10906: Record<string, string>[];
    };
  };

  return countyParsed.dataroot.County_h_10906.map((item) =>
    Object.values(item),
  ) as [string, string, string][];
}

async function getVillages() {
  const villageResponse = await fetch(
    "https://www.post.gov.tw/post/internet/Postal/village.txt",
  );

  const villageText = fixTextFile(await villageResponse.text());

  // remove invalid character
  return Papa.parse<[string, string]>(villageText, {
    header: false,
    skipEmptyLines: true,
    worker: false,
    delimiter: ",",
  });
}

async function getRoads() {
  const roadsResponse = await fetch(
    "https://www.post.gov.tw/post/download/%E4%B8%AD%E8%8B%B1%E6%96%87%E8%A1%97%E8%B7%AF%E5%90%8D%E7%A8%B1%E5%B0%8D%E7%85%A7%E6%AA%94.TXT",
  );

  // convert big5 to utf-8
  const roadsText = await roadsResponse.arrayBuffer();

  const roadsDecoded = fixTextFile(new TextDecoder("big5").decode(roadsText));

  return Papa.parse<[string, string]>(roadsDecoded, {
    header: false,
    skipEmptyLines: true,
    worker: false,
    delimiter: ",",
  });
}

function fixTextFile(text: string) {
  return text
    .replaceAll("", "")
    .replaceAll("台", "臺")
    .replaceAll("\r\n", "\n");
}
