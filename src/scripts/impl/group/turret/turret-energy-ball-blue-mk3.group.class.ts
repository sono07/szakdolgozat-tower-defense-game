import { TurretEnergyBallBlueMk3Object } from "../../object/turret/turret-energy-ball-blue-mk3.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallBlueMk3Group extends BaseGroup<TurretEnergyBallBlueMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallBlueMk3Object);
    }
}
