import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallBlueMk3Object } from "../../object/turret/turret-energy-ball-blue-mk3.object.class";
import { TURRET_ENERGY_BALL_BLUE_MK3_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK3 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

export class TurretEnergyBallBlueMk3Group extends BaseTurretGroup<TurretEnergyBallBlueMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallBlueMk3Object,
            TURRET_ENERGY_BALL_BLUE_MK3_COST,
            TILE_TURRET_ENERGY_BALL_BLUE_MK3,
        );
    }
}
