import { TurretBulletMk2Object } from "../../object/turret/turret-bullet-mk2.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretBulletMk2Group extends BaseGroup<TurretBulletMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretBulletMk2Object);
    }
}
