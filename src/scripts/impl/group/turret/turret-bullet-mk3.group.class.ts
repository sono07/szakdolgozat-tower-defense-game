import { TurretBulletMk3Object } from "../../object/turret/turret-bullet-mk3.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretBulletMk3Group extends BaseGroup<TurretBulletMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretBulletMk3Object);
    }
}
