const exampleReport: string[] = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

export function getResult(exampleReport: string[]): number {
  const collectionLength = exampleReport.length;
  const collectionChunks = exampleReport
    .map(splitToStringChunks)
    .reduce((curr, acc) => curr.map((value, index) => value + acc[index], []));
  const getGammaBinary = collectionChunks.map((val) => (checkZeroFrequencyInChunk(val) > collectionLength / 2 ? 0 : 1));
  const epsilonBinary = collectionChunks.map((val) => (checkZeroFrequencyInChunk(val) < collectionLength / 2 ? 0 : 1));

  return parseInt(getGammaBinary.join(''), 2) * parseInt(epsilonBinary.join(''), 2);
}

const splitToStringChunks = (item: string) => item.split('');
const checkZeroFrequencyInChunk = (val: string) => val.split('').filter((val) => val === '0').length;
export const solution = getResult(exampleReport);
