export interface IObject {
    active: boolean;
    position: Phaser.Math.Vector2;

    init(...args: any[]): void;
    update(time: number, delta: number): void;
    remove(): void;
}
