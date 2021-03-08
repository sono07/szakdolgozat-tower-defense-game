import { GameScene } from "./scene/game.scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
    //TODO remove comments
//   version: '1.0.0',
//   width: 800,
//   height: 600,
//   backgroundColor: 0x3a404d,
//   type: Phaser.AUTO,
//   parent: 'game',
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 }
//     }
//   },
//   scene: [MainScene]
    type: Phaser.AUTO,
    // parent: 'content',
    width: 640,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },

    scene: [GameScene]
};
