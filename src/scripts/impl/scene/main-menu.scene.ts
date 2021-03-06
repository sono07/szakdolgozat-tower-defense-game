import { Phaser } from '../../api/__helper__/phaser.export';
import { genRandomStr } from "../utils/random.utils";
import { GAME_SCENE_KEY } from "./game.scene";
import { BaseScene } from "./__abstract__/base.scene.abstract";

export const MAIN_MENU_SCENE_KEY = "MainMenu";
export class MainMenuScene extends BaseScene {
    private backgroundImage!: Phaser.GameObjects.Image;
    private mapText!: Phaser.GameObjects.Text;
    private seedContainer!: Phaser.GameObjects.DOMElement;
    private playText!: Phaser.GameObjects.Text;
    private playBox!: Phaser.GameObjects.Rectangle;

    constructor() {
        super(MAIN_MENU_SCENE_KEY);
    }

    public init(data: object): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.backgroundImage = this.add.image(width/2, height/2, 'background');
        this.backgroundImage.setScale(1.2);
        this.backgroundImage.setAlpha(0.5);

        this.mapText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Generate map',
            style: {
                font: '40px monospace',
                color: '#ffffff',
            }
        });
        this.mapText.setOrigin(0.5);

        this.seedContainer = this.add.dom(width / 2, height / 2).createFromCache('seed-input');
        this.seedContainer.setOrigin(0.5);

        let randomiseBtn: any = this.seedContainer.getChildByID("seed-randomise");
        let seedInput: any = this.seedContainer.getChildByID("seed-input");

        randomiseBtn.addEventListener("click", () => {
            seedInput.value = genRandomStr(10);
        })

        this.playBox = this.add.rectangle(
            width / 2,
            height / 2 + 50,
            200,
            50,
            0x222222,
            0.8,
        )
        this.playBox.setOrigin(0.5);
        this.playBox.setInteractive({ useHandCursor: true });
        this.playBox.on(Phaser.Input.Events.POINTER_DOWN, () => { 
            this.scene.start(GAME_SCENE_KEY, {
                seed: seedInput.value
            });
        });

        this.playText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Play',
            style: {
                font: '30px monospace',
                color: '#ffffff',
            }
        });
        this.playText.setOrigin(0.5);
    }

    public preload(): void {
    }

    public create(data: object): void {
    }

    public update(time: number, delta: number): void {
    }
}
