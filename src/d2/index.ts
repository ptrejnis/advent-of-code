import { readFileCollection } from '../utils';

export const run = (async () => {
  const moves = await readFileCollection(`${__dirname}/file`);
  const navCoords = moves
    .map((value) => value.split(' '))
    .reduce(
      (obj: Record<string, number>, [key, value]: string[]) => ({
        ...obj,
        [key]: key in obj ? obj[key] + parseInt(value) : parseInt(value),
      }),
      {},
    );
  const horizontalPosition = navCoords.up + navCoords.down * -1;

  return navCoords.forward * (horizontalPosition < 0 ? horizontalPosition * -1 : horizontalPosition);
})();
