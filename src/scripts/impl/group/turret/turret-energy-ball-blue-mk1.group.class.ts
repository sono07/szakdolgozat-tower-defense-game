import { TurretEnergyBallBlueMk1Object } from "../../object/turret/turret-energy-ball-blue-mk1.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class TurretEnergyBallBlueMk1Group extends BaseGroup<TurretEnergyBallBlueMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallBlueMk1Object);
    }
}
