import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretLaserMk3Object } from "../../object/turret/turret-laser-mk3.object.class";
import { TURRET_LASER_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_LASER_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretLaserMk3Group extends BaseTurretGroup<TurretLaserMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretLaserMk3Object,
            TURRET_LASER_MK3_COST,
            TILE_TURRET_LASER_MK3,
        );
    }
}
