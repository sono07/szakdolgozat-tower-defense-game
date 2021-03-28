import { TurretEnergyBallOrangeMk1Object } from "../../object/turret/turret-energy-ball-orange-mk1.object.class";
import { TURRET_ENERGY_BALL_ORANGE_MK1_COST } from "../../utils/config.constants";
import { TILE_TURRET_ENERGY_BALL_ORANGE_MK1 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

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
