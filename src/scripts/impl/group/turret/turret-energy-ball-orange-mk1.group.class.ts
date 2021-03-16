import { TurretEnergyBallOrangeMk1Object } from "../../object/turret/turret-energy-ball-orange-mk1.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallOrangeMk1Group extends BaseGroup<TurretEnergyBallOrangeMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallOrangeMk1Object);
    }
}
