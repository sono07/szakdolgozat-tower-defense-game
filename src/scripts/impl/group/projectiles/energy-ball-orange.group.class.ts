import { EnergyBallOrangeObject } from "../../object/projectile/energy-ball-orange.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class EnergyBallOrangeGroup extends BaseGroup<EnergyBallOrangeObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnergyBallOrangeObject);
    }
}
