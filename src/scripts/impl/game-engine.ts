import { Phaser } from "../api/__helper__/phaser.export";

export class GameEngine extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}