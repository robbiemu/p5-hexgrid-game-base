import './style.css';
import P5 from 'p5';

import { settings, hexagonalMap } from './game-settings';
import { updateMap } from './map-drawing';
import { factoryKeyPressed } from './user-input/key-pressed';

new P5(function (p5) {
  p5.setup = function () {
    p5.createCanvas(...settings.canvas);
    settings.originX = p5.width / 2;
    settings.originY = p5.height / 2;
  };

  p5.draw = function () {
    p5.background(255);
    updateMap({ p5, settings }, hexagonalMap, () => {
      /* noop */
    });
  };

  p5.keyPressed = factoryKeyPressed({ p5, settings }, hexagonalMap);
});
