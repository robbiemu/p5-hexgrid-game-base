import { factoryHexagonalMap } from './model/map/hexagonal-map';

export const canvas = [500, 500];

export const hexagonalMap = factoryHexagonalMap();
hexagonalMap.setHexagon({ x: 0, y: 0, z: 0 }, { terrain: 'rgb' });
hexagonalMap.setHexagon({ x: 1, y: 0, z: -1 }, { terrain: 'r' });
hexagonalMap.setHexagon({ x: -1, y: 0, z: 1 }, { terrain: 'r' });

hexagonalMap.setHexagon({ x: 1, y: -1, z: 0 }, { terrain: 'r' });
hexagonalMap.setHexagon({ x: -1, y: 1, z: 0 }, { terrain: 'g' });

hexagonalMap.setHexagon({ x: 0, y: 1, z: -1 }, { terrain: 'g' });
hexagonalMap.setHexagon({ x: 0, y: -1, z: 1 }, { terrain: 'g' });

hexagonalMap.setHexagon({ x: -1, y: 2, z: -1 }, { terrain: 'b' });
hexagonalMap.setHexagon({ x: -1, y: 3, z: -2 }, { terrain: 'b' });
hexagonalMap.setCharacterCoord({ x: 0, y: 0, z: 0 });

hexagonalMap.inferViewportCoord();

let emoji = '🧒'; // Character emoji
let hexRadius = 50; // Hexagonal size
let textSize = hexRadius * 2 * 0.7;
let hexWidth = (hexRadius * 3) / 2;
let hexHeight = Math.sqrt(3) * hexRadius;
let originX, originY;

export const settings = {
  emoji,
  textSize,
  hexRadius,
  hexWidth,
  hexHeight,
  canvas,
  originX,
  originY,
};
