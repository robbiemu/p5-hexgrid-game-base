import { tryMoveCharacter } from './try-move-character';

function factoryGo(dim, offset) {
  return ({ p5, settings }, hexagonalMap) => {
    const { x, y, z } = hexagonalMap.getCharacterCoord();

    const coords = {
      x: dim === 'x' ? x : x + (dim == 'y' ? offset : -offset),
      y: dim === 'y' ? y : y + (dim == 'z' ? offset : -offset),
      z: dim === 'z' ? z : z + (dim == 'x' ? offset : -offset),
    };
    console.info('[user-input::motion]', dim, offset);
    tryMoveCharacter({ p5, settings }, coords, hexagonalMap);
  };
}

function factoryDetectPlainKey(char) {
  return (event) => (event.key ?? null) === char;
}

export const commands = [
  [factoryDetectPlainKey('w'), factoryGo('x', 1)],
  [factoryDetectPlainKey('x'), factoryGo('x', -1)],
  [factoryDetectPlainKey('d'), factoryGo('y', 1)],
  [factoryDetectPlainKey('a'), factoryGo('y', -1)],
  [factoryDetectPlainKey('z'), factoryGo('z', 1)],
  [factoryDetectPlainKey('e'), factoryGo('z', -1)],
];
