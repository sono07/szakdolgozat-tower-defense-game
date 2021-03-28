import { PRELOAD_SCENE_KEY } from "./preload.scene";
import { BaseScene } from "./_abstract/base.scene.abstract";

export const BOOT_SCENE_KEY = "Boot";
export class BootScene extends BaseScene {
    constructor() {
        super(BOOT_SCENE_KEY);
    }

    public init(data: object): void {
    }

    public preload(): void {
        this.load.image('background', 'images/background.png');
    }

    public create(data: object): void {
        this.scene.start(PRELOAD_SCENE_KEY);
    }

    public update(time: number, delta: number): void {
    }
}
