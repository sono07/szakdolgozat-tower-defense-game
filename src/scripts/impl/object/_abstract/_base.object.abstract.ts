import { IObject } from "../../../api/object/object.interface";

export abstract class BaseObject extends Phaser.Physics.Matter.Sprite implements IObject {
    _position!: Phaser.Math.Vector2;
    private isBodyAdded = true;

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

    // @ts-expect-error
    init(...args: Parameters<this['_init']>) {
        this._beforeInit(...args)
    
        const data = this._init(...args);

        this._afterInit(...data);
    }

    protected _beforeInit(...args: any[]): void {}

    protected abstract _init(...args: any): [position: Phaser.Math.Vector2, ...args: any[]];

    protected _afterInit(position: Phaser.Math.Vector2, ...args: any[]): void {
        this.position = position;
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number): void {
        this._beforeUpdate(time, delta);

        this._update(time, delta);

        this._afterUpdate(time, delta);
    }

    protected _beforeUpdate(time: number, delta: number): void {
    }

    protected abstract _update(time: number, delta: number): void;

    protected _afterUpdate(time: number, delta: number): void {
    }
    
    remove(): void {
        this._beforeRemove();

        this._remove();

        this._afterRemove();
    }

    protected _beforeRemove(): void {}

    protected abstract _remove(): void;

    protected _afterRemove(): void {
        this.setActive(false);
        this.setVisible(false);

        if(this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }
    }
}
