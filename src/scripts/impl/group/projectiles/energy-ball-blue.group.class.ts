import { EnergyBallBlueObject } from "../../object/projectile/energy-ball-blue.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class EnergyBallBlueGroup extends BaseGroup<EnergyBallBlueObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnergyBallBlueObject);
    }
}
