import { TurretEnergyBallOrangeMk3Object } from "../../object/turret/turret-energy-ball-orange-mk3.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallOrangeMk3Group extends BaseGroup<TurretEnergyBallOrangeMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallOrangeMk3Object);
    }
}
