import { hex_to_pixel } from './hexagons';
import { cubeSubtract } from '../model/map/coordinates';

export function drawCharacter({ p5, settings }, x, y) {
  const { emoji, textSize } = settings;
  p5.textSize(textSize);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.text(emoji, x, y);
}

export function inferCharacterPosition({ settings }, hexagonalMap) {
  const characterCoord = hexagonalMap.getCharacterCoord();
  const viewportCoord = hexagonalMap.getViewportCoord();
  const shiftedCoords = cubeSubtract(characterCoord, viewportCoord);
  return hex_to_pixel(settings, shiftedCoords);
}
