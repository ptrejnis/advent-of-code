import { readFileCollection, switchFn } from '../utils';

interface Coords {
  up: number;
  down: number;
  forward: number;
  aim: number;
  depth: number;
}
type MoveCoords = Omit<Coords, 'aim' | 'depth'>;
const initialNavCoords: Coords = {
  up: 0,
  down: 0,
  forward: 0,
  aim: 0,
  depth: 0,
};

export const run = (async () => {
  const moves = await readFileCollection(`${__dirname}/file`);

  const coordMoves = moves.map((value) => {
    const [position, val] = value.split(' ');
    return [position, Number(val)];
  });

  const checkExistingNavCoords = (value: string): boolean =>
    Object.keys(initialNavCoords)
      .filter((val) => val !== 'aim' && val !== 'depth')
      .includes(value);

  const movesAreCoordinates = (arr: any[][]): arr is [keyof MoveCoords, number][] =>
    arr.every((value) => {
      return value.length === 2 && checkExistingNavCoords(value[0]) && typeof parseFloat(value[1]) === 'number';
    });

  const calcMoves = (obj: Coords, [key, value]: [keyof MoveCoords, number]): Coords => {
    const updateCurrentKey = { [key]: obj[key] + value };
    return switchFn(key, {
      down: { ...obj, aim: obj.aim + value, ...updateCurrentKey },
      up: { ...obj, aim: obj.aim - value, ...updateCurrentKey },
      forward: { ...obj, depth: obj.depth + value * obj.aim, ...updateCurrentKey },
      default: obj,
    });
  };

  const coords = (() => {
    return movesAreCoordinates(coordMoves)
      ? coordMoves.reduce(
          (obj: Coords, [key, value]: [keyof MoveCoords, number]) => calcMoves(obj, [key, value]),
          initialNavCoords,
        )
      : initialNavCoords;
  })();
  const horizontalPosition = coords.forward;
  const depth = coords.depth;

  return horizontalPosition * depth;
})();
