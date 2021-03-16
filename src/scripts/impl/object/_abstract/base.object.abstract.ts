export abstract class BaseObject extends Phaser.Physics.Matter.Sprite {
    _position!: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, texture: string, frame?: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig) {
        super(scene.matter.world, 0, 0, texture, frame, {...options, isSensor: true});
    }

    get position() {
        return this._position;
    }

    set position(position: Phaser.Math.Vector2) {
        this._position = position;
        this.x = position.x;
        this.y = position.y;
    }

    setPosition(x: number = 0, y: number = x, z: number = 0, w: number = 0): this {
        super.setPosition(x, y, z, w);
        this.position = new Phaser.Math.Vector2(x, y);

        return this;
    }
}
