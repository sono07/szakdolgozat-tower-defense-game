import { TurretEnergyBallBlueMk2Object } from "../../object/turret/turret-energy-ball-blue-mk2.object.class";
import { TURRET_ENERGY_BALL_BLUE_MK2_COST } from "../../utils/config.constants";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK2 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretEnergyBallBlueMk2Group extends BaseTurretGroup<TurretEnergyBallBlueMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallBlueMk2Object);
    }

    getPrice() {
        return TURRET_ENERGY_BALL_BLUE_MK2_COST;
    }

    getTile() {
        return TILE_TURRET_ENERGY_BALL_BLUE_MK2;
    }
}
