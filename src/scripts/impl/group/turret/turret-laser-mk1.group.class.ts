import { TurretLaserMk1Object } from "../../object/turret/turret-laser-mk1.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretLaserMk1Group extends BaseGroup<TurretLaserMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretLaserMk1Object);
    }
}
