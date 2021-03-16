import { TurretBulletMk1Object } from "../../object/turret/turret-bullet-mk1.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretBulletMk1Group extends BaseGroup<TurretBulletMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretBulletMk1Object);
    }
}
