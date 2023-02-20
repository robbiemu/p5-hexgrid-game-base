import { commands as motions } from './motion';

const commands = [...motions];

export const factoryKeyPressed = ({ p5, settings }, hexagonalMap) => {
  return function fn(event) {
    for (let [testFn, command] of commands) {
      if (testFn(event)) {
        command({ p5, settings }, hexagonalMap);
        break;
      }
    }
  };
};
