import { Phaser } from '../../../api/__helper__/phaser.export';
import { EnergyBallBlueObject } from "../../object/projectile/moving-projectile/penetrating-moving-projectile/energy-ball-blue.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class EnergyBallBlueGroup extends BaseGroup<EnergyBallBlueObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnergyBallBlueObject);
    }
}
