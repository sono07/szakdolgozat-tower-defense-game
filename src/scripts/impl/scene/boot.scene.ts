import { PRELOAD_SCENE_KEY } from "./preload.scene";
import { BaseScene } from "./_abstract/base.scene.abstract";

export const BOOT_SCENE_KEY = "Boot";
export class BootScene extends BaseScene {
    constructor() {
        super(BOOT_SCENE_KEY);
    }

    init(data: object): void {
    }

    preload(): void {
        this.load.image('background', 'images/background.png');
    }

    create(data: object): void {
        this.scene.start(PRELOAD_SCENE_KEY);
    }

    update(time: number, delta: number): void {
    }
}
