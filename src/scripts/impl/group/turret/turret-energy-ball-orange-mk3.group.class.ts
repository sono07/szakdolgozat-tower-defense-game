import { TurretEnergyBallOrangeMk3Object } from "../../object/turret/turret-energy-ball-orange-mk3.object.class";
import { TURRET_ENERGY_BALL_ORANGE_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_ENERGY_BALL_ORANGE_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretEnergyBallOrangeMk3Group extends BaseTurretGroup<TurretEnergyBallOrangeMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretEnergyBallOrangeMk3Object);
    }

    getPrice() {
        return TURRET_ENERGY_BALL_ORANGE_MK3_COST;
    }

    getTile() {
        return TILE_TURRET_ENERGY_BALL_ORANGE_MK3;
    }
}
