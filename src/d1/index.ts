import { readFileCollection } from '../utils';

export const run = (async () => {
  const measurments = await readFileCollection(`${__dirname}/file`);
  const measurmentsNums = measurments.map(parseInt);
  const getChunks = (arr: number[], length: number, i: number) => {
    if (i > arr.length - 3) return;
    return [arr[i], ...[...Array(length - 1).keys()].map((val) => arr[i + val + 1])];
  };

  return measurmentsNums
    .map((value, i, arr) => getChunks(arr, 3, i))
    .filter(Boolean)
    .map((val) => !!val && val.reduce((curr, acc) => curr + acc))
    .filter((value, index, arr) => index > 0 && arr[index - 1] < value)
    .length;
})();
