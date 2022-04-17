const exampleCourse = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

type Move = 'forward' | 'up' | 'down';

function getResult(moves: string[]): number {
  const coords = moves.map(getCoords);

  return calculate(coords);
}

const calculate = (coords: [Move, number][]): number => {
  const coordsMap: Map<Move, number> = new Map([
    getCoordsEntry(coords, 'forward'),
    getCoordsEntry(coords, 'up'),
    getCoordsEntry(coords, 'down'),
  ]);
  const horizontalTotal = coordsMap.get('forward');
  const depth = coordsMap.get('up') + coordsMap.get('down') * -1;
  const depthTotal = depth < 0 ? depth * -1 : depth;

  return horizontalTotal * depthTotal;
};

const getCoordsEntry = (coords: [Move, number][], move: Move): [Move, number] => [
  move,
  coords
    .filter(([position]) => position === move)
    .map(([, coords]) => coords)
    .reduce((curr, acc) => acc + curr, 0),
];
const getCoords = (move: string): [Move, number] => {
  const [position, course] = move.split(' ');

  if (position === 'forward' || position === 'up' || position === 'down') {
    return [position, parseFloat(course)];
  }
};
export const solution = getResult(exampleCourse);
