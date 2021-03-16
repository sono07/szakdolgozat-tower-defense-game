import { TurretLaserMk3Object } from "../../object/turret/turret-laser-mk3.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretLaserMk3Group extends BaseGroup<TurretLaserMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretLaserMk3Object);
    }
}
