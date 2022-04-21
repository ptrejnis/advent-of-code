import { readFileCollection } from '../utils';

export const run = (async () => {
  const report = await readFileCollection(`${__dirname}/file`);

  const splitToStringChunks = (item: string) => item.split('');
  const checkZeroFrequencyInChunk = (val: string) => val.split('').filter((val) => val === '0').length;

  const reportsLength = report.length;
  const reportsChunks = report
    .map(splitToStringChunks)
    .reduce((curr, acc) => curr.map((value, index) => value + acc[index], []));
  const gammaBinary = reportsChunks.map((val) => (checkZeroFrequencyInChunk(val) > reportsLength / 2 ? 0 : 1));
  const epsilonBinary = gammaBinary.map(val =>  val === 1 ? 0 : 1);

  return parseInt(gammaBinary.join(''), 2) * parseInt(epsilonBinary.join(''), 2);
})();
