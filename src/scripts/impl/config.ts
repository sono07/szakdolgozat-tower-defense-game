import { BootScene } from "./scene/boot.scene";
import { GameOverScene } from "./scene/game-over.scene";
import { GameScene } from "./scene/game.scene";
import { MainMenuScene } from "./scene/main-menu.scene";
import { PrealoadScene } from "./scene/preload.scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
    version: '1.0.0',
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    parent: 'phaser-canvas-container',
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false,
            gravity: {
                y: 0,
                x: 0,
            },
            debug: true,
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
