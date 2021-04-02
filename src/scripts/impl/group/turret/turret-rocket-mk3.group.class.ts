import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretRocketMk3Object } from "../../object/turret/turret-rocket-mk3.object.class";
import { TURRET_ROCKET_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_ROCKET_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretRocketMk3Group extends BaseTurretGroup<TurretRocketMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretRocketMk3Object,
            TURRET_ROCKET_MK3_COST,
            TILE_TURRET_ROCKET_MK3,
        );
    }
}
