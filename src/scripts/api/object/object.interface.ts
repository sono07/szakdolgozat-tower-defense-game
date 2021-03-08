export interface IObject {
    position: Phaser.Math.Vector2;

    create(...args: any[]): void;
    update(time: number, delta: number): void;
    destroy(): void;
}
