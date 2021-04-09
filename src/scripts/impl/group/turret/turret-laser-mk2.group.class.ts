import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretLaserMk2Object } from "../../object/turret/turret-laser-mk2.object.class";
import { TURRET_LASER_MK2_COST } from "../../game-config";
import { TILE_TURRET_LASER_MK2 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

export class TurretLaserMk2Group extends BaseTurretGroup<TurretLaserMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretLaserMk2Object,
            TURRET_LASER_MK2_COST,
            TILE_TURRET_LASER_MK2,
        );
    }
}
