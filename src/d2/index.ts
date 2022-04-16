const exampleCourse = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

interface Position {
  horizontal: number;
  depth: number;
}

interface Course {
  position: string;
  course: number;
}

function getFinalPosition(moves: string[]): Position {
  const coords = moves.map(getCoords);
  const horizontalMoves = getHorizontal(coords);
  const depthMoves = getDepths(coords);

  return { horizontal: calculatePosition(horizontalMoves), depth: calculatePosition(depthMoves) };
}

const getCoords = (move: string): Course => {
  const [first, second] = move.split(' ');
  const [position, course] = [first, parseFloat(second)];

  return { position, course };
};

const getHorizontal = (courses: Course[]): Position['horizontal'][] =>
  courses.filter(({ position }) => position === 'forward').map(({ course }) => course);

const getDepths = (courses: Course[]): Position['depth'][] =>
  courses
    .filter(({ position }) => position === 'up' || position === 'down')
    .map(({ position, course }) => (position === 'down' ? course * -1 : course));

const calculatePosition = (courseChanges: number[]): number => courseChanges.reduce((curr, acc) => acc + curr, 0);

export const solution = getFinalPosition(exampleCourse);
