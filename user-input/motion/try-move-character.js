import { updateMap } from '../../map-drawing';

export function tryMoveCharacter({ p5, settings }, dest, hexagonalMap) {
  if (
    playerCanMoveToLocation({ p5, settings }, dest, hexagonalMap) &&
    mapCanReceivePlayerAtLocation({ p5, settings }, dest, hexagonalMap)
  ) {
    const fn = () => hexagonalMap.setCharacterCoord(dest);
    updateMap({ p5, settings }, hexagonalMap, fn);
  }
}

export function playerCanMoveToLocation({ p5, settings }, dest, hexagonalMap) {
  return true;
}

export function mapCanReceivePlayerAtLocation(
  { p5, settings },
  dest,
  hexagonalMap
) {
  return hexagonalMap.hasLocation(dest);
}
