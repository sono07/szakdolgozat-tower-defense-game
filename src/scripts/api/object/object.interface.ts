import { Phaser } from "../__helper__/phaser.export";
export interface IObject {
    active: boolean;
    position: Phaser.Math.Vector2;

    init(params: {}): void;
    update(time: number, delta: number): void;
    remove(): void;
}
