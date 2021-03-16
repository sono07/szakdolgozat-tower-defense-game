import { TurretRocketMk2Object } from "../../object/turret/turret-rocket-mk2.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretRocketMk2Group extends BaseGroup<TurretRocketMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretRocketMk2Object);
    }
}
