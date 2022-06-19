import { readFileSync } from "fs";
import { parse } from 'csv-parse/sync';



export default function parseCsv(path: string) {
  const data = readFileSync(`${path}/data.csv`);
  return parse(data, { columns: true, skipEmptyLines: true });
}
