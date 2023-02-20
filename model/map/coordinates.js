export const coordinateDimensions = {
  x: 'x',
  y: 'y',
  z: 'z',
};

export function factoryCoordinates({ x, y, z }) {
  return { x, y, z };
}

export const coordToString = ({ x, y, z }) => x + ',' + y + ',' + z;

export const getCoordinatesFromTrajectoryAndOrigin = (origin, trajectory) => {
  const destination = { ...origin };
  if (trajectory.x !== 0) {
    destination.y += -trajectory.x;
    destination.z += trajectory.x;
  }
  if (trajectory.y !== 0) {
    destination.x += -trajectory.y;
    destination.z += trajectory.y;
  }
  if (trajectory.z !== 0) {
    destination.y += -trajectory.z;
    destination.x += trajectory.z;
  }
  return destination;
};

export const cubeSubtract = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z,
});

export const cubeDistance = (a, b) => {
  const vec = cubeSubtract(a, b);
  return (Math.abs(vec.x) + Math.abs(vec.y) + Math.abs(vec.z)) / 2;
};

export function getAverageCubicCoord(coordinates) {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  coordinates.forEach((coord) => {
    sumX += coord.x;
    sumY += coord.y;
    sumZ += coord.z;
  });

  const numHexagons = hexagons.size;
  const x = Math.round(sumX / numHexagons);
  const y = Math.round(sumY / numHexagons);
  const z = Math.round(sumZ / numHexagons);

  return { x, y, z };
}
