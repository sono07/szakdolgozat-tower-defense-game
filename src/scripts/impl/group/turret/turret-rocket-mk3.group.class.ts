import { TurretRocketMk3Object } from "../../object/turret/turret-rocket-mk3.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretRocketMk3Group extends BaseGroup<TurretRocketMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretRocketMk3Object);
    }
}
