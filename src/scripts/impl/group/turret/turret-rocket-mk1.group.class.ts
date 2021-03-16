import { TurretRocketMk1Object } from "../../object/turret/turret-rocket-mk1.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretRocketMk1Group extends BaseGroup<TurretRocketMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretRocketMk1Object);
    }
}
