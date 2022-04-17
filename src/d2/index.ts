const exampleCourse = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

type Move = 'forward' | 'up' | 'down';
type CoordsEntries = [Move, number];

const getResult = (moves: string[]): number => calculate(moves.map(getCoords));

const calculate = (coords: CoordsEntries[]): number => {
  const moveOptions: Move[] = ['forward', 'up', 'down'];
  const coordsMap: Map<Move, number> = new Map(moveOptions.map((move) => getCoordsEntry(coords, move)));
  const horizontalTotal = coordsMap.get('forward');
  const depth = coordsMap.get('up') + coordsMap.get('down') * -1;
  const depthTotal = depth < 0 ? depth * -1 : depth;

  return horizontalTotal * depthTotal;
};

const getCoordsEntries = (coords: CoordsEntries[], move: Move): [Move, number] => [
  move,
  coords
    .filter(([position]) => position === move)
    .map(([, coords]) => coords)
    .reduce((curr, acc) => acc + curr, 0),
];

const getCoords = (move: string): CoordsEntries => {
  const [position, course] = move.split(' ');

  if (position === 'forward' || position === 'up' || position === 'down') {
    return [position, parseFloat(course)];
  }
};

export const solution = getResult(exampleCourse);
