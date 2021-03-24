import { BootScene } from "./scene/boot.scene";
import { GameOverScene } from "./scene/game-over.scene";
import { GameScene } from "./scene/game.scene";
import { MainMenuScene } from "./scene/main-menu.scene";
import { PrealoadScene } from "./scene/preload.scene";
import { GAME_HEIGHT_PIXELS, GAME_WIDTH_PIXELS } from "./utils/config.constants";

export const GameConfig: Phaser.Types.Core.GameConfig = {
    version: '1.0.0',
    type: Phaser.CANVAS,
    width: GAME_WIDTH_PIXELS,
    height: GAME_HEIGHT_PIXELS,
    parent: 'phaser-canvas-container',
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false,
            gravity: {
                y: 0,
                x: 0,
            },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true,
    },
    scene: [BootScene, PrealoadScene, MainMenuScene, GameScene, GameOverScene]
};
