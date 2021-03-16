import { TurretEnergyBallOrangeMk2Object } from "../../object/turret/turret-energy-ball-orange-mk2.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallOrangeMk2Group extends BaseGroup<TurretEnergyBallOrangeMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallOrangeMk2Object);
    }
}
