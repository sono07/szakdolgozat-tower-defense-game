import { TurretEnergyBallBlueMk3Object } from "../../object/turret/turret-energy-ball-blue-mk3.object.class";
import { TURRET_ENERGY_BALL_BLUE_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretEnergyBallBlueMk3Group extends BaseTurretGroup<TurretEnergyBallBlueMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallBlueMk3Object);
    }

    getPrice() {
        return TURRET_ENERGY_BALL_BLUE_MK3_COST;
    }

    getTile() {
        return TILE_TURRET_ENERGY_BALL_BLUE_MK3;
    }
}
