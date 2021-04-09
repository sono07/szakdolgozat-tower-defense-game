import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallOrangeMk3Object } from "../../object/turret/turret-energy-ball-orange-mk3.object.class";
import { TURRET_ENERGY_BALL_ORANGE_MK3_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_ORANGE_MK3 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

export class TurretEnergyBallOrangeMk3Group extends BaseTurretGroup<TurretEnergyBallOrangeMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallOrangeMk3Object,
            TURRET_ENERGY_BALL_ORANGE_MK3_COST,
            TILE_TURRET_ENERGY_BALL_ORANGE_MK3,
        );
    }
}
