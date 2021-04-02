import { Phaser } from '../../../api/__helper__/phaser.export';
import { IScene } from "../../../api/scene/scene.interface";

export abstract class BaseScene extends Phaser.Scene implements IScene {

    constructor(key: string) {
        super({ key });
    }

    public abstract init(data: object): void;
    public abstract preload(): void;
    public abstract create(data: object): void;
    public abstract update(time: number, delta: number): void;
}
