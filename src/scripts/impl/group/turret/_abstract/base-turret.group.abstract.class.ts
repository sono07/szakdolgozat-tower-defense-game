import { Phaser } from '../../../../api/__helper__/phaser.export';
import { ITurretGroup } from "../../../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../../../api/object/turret-object/turret-object.interface";
import { BaseGroup } from "../../_abstract/base.group.abstract";

export abstract class BaseTurretGroup<T extends Phaser.GameObjects.GameObject & ITurretObject> extends BaseGroup<T> implements ITurretGroup<T> {
    private priceValue: number;
    private tileValue: number

    constructor(scene: Phaser.Scene, clazz: new (scene: Phaser.Scene) => T, priceValue: number, tileValue: number) {
        super(scene, clazz);

        this.priceValue = priceValue;
        this.tileValue = tileValue;
    }
    
    public getPrice(): number {
        return this.priceValue;
    }

    public getTile(): number {
        return this.tileValue;
    }
}
