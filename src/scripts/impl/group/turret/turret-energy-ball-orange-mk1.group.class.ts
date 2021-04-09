import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallOrangeMk1Object } from "../../object/turret/turret-energy-ball-orange-mk1.object.class";
import { TURRET_ENERGY_BALL_ORANGE_MK1_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_ORANGE_MK1 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

export class TurretEnergyBallOrangeMk1Group extends BaseTurretGroup<TurretEnergyBallOrangeMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallOrangeMk1Object,
            TURRET_ENERGY_BALL_ORANGE_MK1_COST,
            TILE_TURRET_ENERGY_BALL_ORANGE_MK1,
        );
    }
}
