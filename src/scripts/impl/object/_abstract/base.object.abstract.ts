import { Phaser } from "../../../api/__helper__/phaser.export";
import { IObject } from "../../../api/object/object.interface";

export abstract class BaseObject extends Phaser.Physics.Matter.Sprite implements IObject {
    private _position!: Phaser.Math.Vector2;
    protected isBodyAdded = true;

    constructor(scene: Phaser.Scene, texture: string, frame?: string, cb?: (self: BaseObject) => void) {
        super(scene.matter.world, 0, 0, texture, frame);

        if (cb) cb(this);
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

    public init(params: {
        cb?: () => void
    }): void {
        const {cb} = params;

        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        if (cb) cb();

        this.setActive(true);
        this.setVisible(true);
    }

    public remove(cb?: (() => void)): void {
        this.setActive(false);
        this.setVisible(false);

        if (cb) cb();

        if(this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }
    }
}
