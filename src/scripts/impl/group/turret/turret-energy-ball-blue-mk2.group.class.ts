import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallBlueMk2Object } from "../../object/turret/turret-energy-ball-blue-mk2.object.class";
import { TURRET_ENERGY_BALL_BLUE_MK2_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK2 } from "../../game-constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretEnergyBallBlueMk2Group extends BaseTurretGroup<TurretEnergyBallBlueMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallBlueMk2Object,
            TURRET_ENERGY_BALL_BLUE_MK2_COST,
            TILE_TURRET_ENERGY_BALL_BLUE_MK2,
        );
    }
}
