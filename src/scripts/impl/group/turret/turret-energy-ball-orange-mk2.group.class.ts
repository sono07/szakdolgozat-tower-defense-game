import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallOrangeMk2Object } from "../../object/turret/turret-energy-ball-orange-mk2.object.class";
import { TURRET_ENERGY_BALL_ORANGE_MK2_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_ORANGE_MK2 } from "../../game-constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretEnergyBallOrangeMk2Group extends BaseTurretGroup<TurretEnergyBallOrangeMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallOrangeMk2Object,
            TURRET_ENERGY_BALL_ORANGE_MK2_COST,
            TILE_TURRET_ENERGY_BALL_ORANGE_MK2,
        );
    }
}
