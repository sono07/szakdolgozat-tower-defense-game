import 'Phaser';
import { GameConfig } from './phaser.config';
import { Game } from './phaser.game';

export class App {
  static game: Game;

  static run() {
    this.game = new Game(GameConfig);
  }
}

window.addEventListener('load', () => {
  App.run();
});
