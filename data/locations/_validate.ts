import { LocationDataSchema } from './_schema';
import fs from 'fs';
import path from 'path';

const files = ['melbourne.json', 'perth.json', 'adelaide.json', 'brisbane.json'];

let allValid = true;
for (const file of files) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
    LocationDataSchema.parse(raw);
    console.log(`${file}: VALID`);
  } catch (e: any) {
    console.error(`${file}: INVALID —`, e.message?.slice(0, 200));
    allValid = false;
  }
}

process.exit(allValid ? 0 : 1);
