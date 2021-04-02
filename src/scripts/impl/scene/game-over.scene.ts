import { Phaser } from '../../api/__helper__/phaser.export';
import { MAIN_MENU_SCENE_KEY } from "./main-menu.scene";
import { BaseScene } from "./_abstract/base.scene.abstract";

export const GAME_OVER_SCENE_KEY = "GameOver";
export class GameOverScene extends BaseScene {
    private backgroundImage!: Phaser.GameObjects.Image;
    private gameOverText!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;
    private backText!: Phaser.GameObjects.Text;
    private backBox!: Phaser.GameObjects.Rectangle;

    constructor() {
        super(GAME_OVER_SCENE_KEY);
    }

    public init(data: object): void {
    }

    public preload(): void {
    }

    public create(data: { score: number }): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.backgroundImage = this.add.image(width / 2, height / 2, 'background');
        this.backgroundImage.setScale(1.2);
        this.backgroundImage.setAlpha(0.5);

        this.gameOverText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Game Over',
            style: {
                font: '40px monospace',
                color: '#ffffff',
            }
        })
        this.gameOverText.setOrigin(0.5);

        this.scoreText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Score: ' + data.score,
            style: {
                font: '30px monospace',
                color: '#ffffff',
            }
        })
        this.scoreText.setOrigin(0.5);

        this.backBox = this.add.rectangle(
            width / 2,
            height / 2 + 50,
            320,
            50,
            0x222222,
            0.8,
        )
        this.backBox.setOrigin(0.5);
        this.backBox.setInteractive({ useHandCursor: true });
        this.backBox.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start(MAIN_MENU_SCENE_KEY);
        });

        this.backText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Back to Main Menu',
            style: {
                font: '30px monospace',
                color: '#ffffff',
            }
        });
        this.backText.setOrigin(0.5);
    }

    public update(time: number, delta: number): void {
    }
}
