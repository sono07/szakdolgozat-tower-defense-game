import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretEnergyBallBlueMk1Object } from "../../object/turret/turret-energy-ball-blue-mk1.object.class";
import { TURRET_ENERGY_BALL_BLUE_MK1_COST } from "../../game-config";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK1 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

export class TurretEnergyBallBlueMk1Group extends BaseTurretGroup<TurretEnergyBallBlueMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretEnergyBallBlueMk1Object,
            TURRET_ENERGY_BALL_BLUE_MK1_COST,
            TILE_TURRET_ENERGY_BALL_BLUE_MK1,
        );
    }
}
