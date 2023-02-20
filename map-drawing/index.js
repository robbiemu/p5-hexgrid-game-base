import {
  drawHexagonalMap,
  isVisibleLocation,
  getAllRenderableLocations,
} from './hexagons';
import { drawCharacter, inferCharacterPosition } from './character';
import { cubeDistance } from '../model/map/coordinates';

const consoleSeen = new Set();

export function updateMap({ p5, settings }, hexagonalMap, withFn) {
  beforeUpdateMap({ p5, settings }, hexagonalMap);
  withFn({ p5, settings }, hexagonalMap);
  afterUpdateMap({ p5, settings }, hexagonalMap);
}

function beforeUpdateMap({ p5, settings }, hexagonalMap) {
  return true;
}

function afterUpdateMap({ p5, settings }, hexagonalMap) {
  updateViewport({ p5, settings }, hexagonalMap);
  drawHexagonalMap({ p5, settings }, hexagonalMap);
  const { x, y } = inferCharacterPosition({ p5, settings }, hexagonalMap);
  drawCharacter({ p5, settings }, x, y);
}

/* if character is not in center and on the angle from the center to character there are unseen tiles beyond character, move viewport towards unseen tiles (Character) */
function updateViewport({ settings }, hexagonalMap) {
  const characterCoord = hexagonalMap.getCharacterCoord();
  // Check if there are unrendered tiles beyond the character along the angle
  const renderableLocations = getAllRenderableLocations(
    { settings },
    hexagonalMap
  );
  if (
    !isVisibleLocation({ settings }, hexagonalMap, characterCoord) ||
    getAllRenderableLocations({ settings }, hexagonalMap, characterCoord).some(
      (coord) => !renderableLocations.has(coord)
    )
  ) {
    hexagonalMap.setViewportCoord(characterCoord);
  }
}
