import { coordToString, cubeDistance } from './coordinates';

export function factoryHexagonalMap(
  hexagons = new Map(),
  viewportCoord = null,
  characterCoord = null
) {
  const seenKeys = {};

  const setHexagon = (coord, value) => {
    const s = coordToString(coord);
    if (!(s in seenKeys)) {
      seenKeys[s] = { coord };
    }
    hexagons.set(seenKeys[s], value);
  };

  const getHexagon = (coord) => hexagons.get(seenKeys[coordToString(coord)]);

  const setViewportCoord = (coord) => {
    // CONSIDER - check if coordinates are "sufficiently central"
    viewportCoord = coord;
  };

  const getViewportCoord = () => viewportCoord;

  const setCharacterCoord = (coord) => {
    if (!hexagons.has(seenKeys[coordToString(coord)])) {
      throw Error(
        '[HexagonalMap::setCharacterCoords] invalid coordinates specified',
        coord
      );
    }
    characterCoord = coord;
  };

  const getCharacterCoord = () => characterCoord;

  const getAllLocations = () =>
    Array.from(hexagons.keys()).map((co) => co.coord);

  const hasLocation = (location) => {
    const s = coordToString(location);
    return s in seenKeys;
  };

  const getNearestCoordToLocation = (centralLocation) => {
    let nearestCoord = null;
    let minDistance = Infinity;

    hexagons.forEach((_value, key) => {
      const distance = cubeDistance(key.coord, centralLocation);

      if (distance < minDistance) {
        minDistance = distance;
        nearestCoord = key.coord;
      }
    });

    return nearestCoord;
  };

  const inferViewportCoord = () => {
    if (!hexagons.size) return null;

    if (characterCoord) {
      setViewportCoord(characterCoord);
    } else {
      setViewportCoord(
        getNearestCoordToLocation(
          getAverageCubicCoord(
            Array.from(hexagons.keys()).map(({ coord }) => coord)
          )
        )
      );
    }
    return viewportCoord;
  };

  return {
    setHexagon,
    getHexagon,
    setViewportCoord,
    getViewportCoord,
    inferViewportCoord,
    setCharacterCoord,
    getCharacterCoord,
    getAllLocations,
    hasLocation,
    getNearestCoordToLocation,
  };
}

const dims = ['x', 'y', 'z'];
