import { IObject } from "../../../api/object/object.interface";

export abstract class BaseObject extends Phaser.GameObjects.Image implements IObject {
    _position!: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, texture: string, frame?: string) {
        super(scene, 0, 0, texture, frame);
    }

    get position() {
        return this._position;
    }

    set position(position: Phaser.Math.Vector2) {
        this._position = position;
        this.setPosition(position.x, position.y)
    }

    abstract create(...args: any[]): void;

    protected _create(position: Phaser.Math.Vector2) {
        this.setActive(true);
        this.setVisible(true);

        this.position = position;
    }

    abstract update(time: number, delta: number): void;
    
    abstract destroy(): void;

    protected _destroy() {
        this.setActive(false);
        this.setVisible(false);
    }
}
