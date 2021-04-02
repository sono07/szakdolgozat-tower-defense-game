import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretLaserMk1Object } from "../../object/turret/turret-laser-mk1.object.class";
import { TURRET_LASER_MK1_COST } from "../../utils/config.constants";
import { TILE_TURRET_LASER_MK1 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretLaserMk1Group extends BaseTurretGroup<TurretLaserMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretLaserMk1Object,
            TURRET_LASER_MK1_COST,
            TILE_TURRET_LASER_MK1,
        );
    }
}
