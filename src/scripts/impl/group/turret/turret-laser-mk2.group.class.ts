import { TurretLaserMk2Object } from "../../object/turret/turret-laser-mk2.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretLaserMk2Group extends BaseGroup<TurretLaserMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretLaserMk2Object);
    }
}
