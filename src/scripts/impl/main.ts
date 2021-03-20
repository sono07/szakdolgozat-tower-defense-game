import 'Phaser';
import { GameConfig } from './config';
import { Game } from './game';

export class App {
  static game: Game;

  static run() {
    this.game = new Game(GameConfig);
  }
}

window.addEventListener('load', () => {
  App.run();
});
