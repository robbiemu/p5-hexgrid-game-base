import { cubeSubtract } from '../model/map/coordinates';

const consoleSeen = new Set();

export function drawHexagonalMap({ p5, settings }, hexagonalMap) {
  const viewportCoord = hexagonalMap.getViewportCoord();

  getAllRenderableLocations({ settings }, hexagonalMap).forEach((location) => {
    const shiftedCoords = cubeSubtract(location, viewportCoord);
    drawHexagon(
      { p5, settings },
      shiftedCoords.x,
      shiftedCoords.y,
      shiftedCoords.z
    );
  });
}

function drawHexagon({ p5, settings }, x, y, z) {
  const { hexRadius } = settings;
  const screen = hex_to_pixel(settings, { x, y, z });
  const angle = p5.radians(30);

  p5.push();
  p5.translate(screen.x, screen.y);
  p5.rotate(-angle);

  p5.fill(220);
  p5.stroke(153);
  p5.strokeWeight(2);

  p5.beginShape();

  for (let i = 0; i < 6; i++) {
    let angle = (p5.TWO_PI / 6) * i;
    let hx = x + hexRadius * p5.cos(angle);
    let hy = y + hexRadius * p5.sin(angle);
    p5.vertex(hx, hy);
  }
  p5.endShape(p5.CLOSE);
  p5.pop();
}

export function getAllRenderableLocations(
  { settings },
  hexagonalMap,
  fromLocation
) {
  if (!fromLocation) fromLocation = hexagonalMap.getViewportCoord();
  if (!fromLocation) return null;
  return hexagonalMap.getAllLocations().filter((location) => {
    return isVisibleLocation({ settings }, location, fromLocation);
  });
}

export const isVisibleLocation = ({ settings }, location, viewportCoord) => {
  const vp = hex_to_pixel(settings, viewportCoord);
  const offsetFromOrigin = {
    x: vp.x - settings.originX,
    y: vp.y - settings.originY,
  };

  return position_of_hex_corners(settings, location).every(
    ({ x, y }) =>
      x <= settings.canvas[0] + offsetFromOrigin.x &&
      y <= settings.canvas[1] + offsetFromOrigin.y &&
      x >= 0 + offsetFromOrigin.x &&
      y >= 0 + offsetFromOrigin.y
  );
};

export const M = {
  // orientation metrics for "pointy-top" hexagonal grid
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
  b0: Math.sqrt(3.0) / 3.0,
  b1: -1.0 / 3.0,
  b2: 0.0,
  b3: 2.0 / 3.0,
  start_angle: 0.5,
};

export function hex_to_pixel(settings, h) {
  const x = settings.originX + (M.f0 * h.x + M.f1 * h.y) * settings.hexRadius;
  const y = settings.originY + (M.f2 * h.x + M.f3 * h.y) * settings.hexRadius;
  return { x, y };
}

export function pixel_to_hex(settings, p) {
  const pt = {
    x: (p.x - settings.originX) / settings.hexRadius,
    y: (p.y - settings.originY) / settings.hexRadius,
  };
  q = parseInt(M.b0 * pt.x + M.b1 * pt.y);
  r = parseInt(M.b2 * pt.x + M.b3 * pt.y);
  return { x: q, y: r, z: -q - r };
}

function position_of_hex_corners(settings, hexagon) {
  const { hexRadius } = settings;
  const screen = hex_to_pixel(settings, hexagon);

  const angle = Math.PI / 6; // 30 degrees in radians

  const corners = [];
  for (let i = 0; i < 6; i++) {
    const x = screen.x + hexRadius * Math.cos(i * angle + angle / 2);
    const y = screen.y + hexRadius * Math.sin(i * angle + angle / 2);
    corners.push({ x, y });
  }

  return corners;
}
