import { GAME_SCENE_KEY } from "./game.scene";
import { BaseScene } from "./_abstract/base.scene.abstract";

//TODO impl scene
export const MAIN_MENU_SCENE_KEY = "MainMenu";
export class MainMenuScene extends BaseScene {
    backgroundImage!: Phaser.GameObjects.Image;

    constructor() {
        super(MAIN_MENU_SCENE_KEY);
    }

    init(data: object): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.backgroundImage = this.add.image(width/2, height/2, 'background');
        this.backgroundImage.setAlpha(0.5);
    }

    preload(): void {

    }

    create(data: object): void {
        //TODO impl menu
        if(true) {
            this.startGame();
        }
    }

    update(time: number, delta: number): void {

    }

    private startGame() {
        this.backgroundImage.destroy();
        this.scene.start(GAME_SCENE_KEY)
    }
}
