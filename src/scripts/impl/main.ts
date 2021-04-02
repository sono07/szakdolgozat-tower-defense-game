import { PhaserConfig } from './game-config';
import { GameEngine } from './game-engine';

export class App {
  public static gameEngine: GameEngine;

  public static run() {
    this.gameEngine = new GameEngine(PhaserConfig);
  }
}

window.addEventListener('load', () => {
  App.run();
});
