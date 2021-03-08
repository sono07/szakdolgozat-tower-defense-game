import { TurretObject } from "../object/turret.object.class";
import { BaseGroup } from "./_abstract/base.group.abstract";

export class TurretGroup extends BaseGroup<TurretObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretObject);
        this.runChildUpdate = true;
    }
}
