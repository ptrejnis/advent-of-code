import * as Fs from 'fs/promises';
import path from 'path';

export const readFileCollection: (filepath: string) => Promise<string[]> = async (filePath: string) => {
  const file = await Fs.readFile(path.resolve(filePath), 'utf-8');
  return file.split('\n');
};
