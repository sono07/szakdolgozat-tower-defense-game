import { Phaser } from '../../../api/__helper__/phaser.export';
import { EnergyBallOrangeObject } from "../../object/projectile/moving-projectile/penetrating-moving-projectile/energy-ball-orange.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class EnergyBallOrangeGroup extends BaseGroup<EnergyBallOrangeObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnergyBallOrangeObject);
    }
}
