import { GameConfig } from './phaser.config';
import { Game } from './phaser.game';

export class App {
  public static game: Game;

  public static run() {
    this.game = new Game(GameConfig);
  }
}

window.addEventListener('load', () => {
  App.run();
});
