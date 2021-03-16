import { TurretEnergyBallBlueMk2Object } from "../../object/turret/turret-energy-ball-blue-mk2.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallBlueMk2Group extends BaseGroup<TurretEnergyBallBlueMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallBlueMk2Object);
    }
}
