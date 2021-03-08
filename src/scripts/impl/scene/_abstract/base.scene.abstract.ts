import { IScene } from "../../../api/scene/scene.interface";

export abstract class BaseScene extends Phaser.Scene implements IScene {

    constructor(key: string) {
        super({ key });
    }

    abstract init(data: object): void;
    abstract preload(): void;
    abstract create(data: object): void;
    abstract update(time: number, delta: number): void;
}
