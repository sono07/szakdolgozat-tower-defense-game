import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretRocketMk3Object } from "../../object/turret/turret-rocket-mk3.object.class";
import { TURRET_ROCKET_MK3_COST } from "../../game-config";
import { TILE_TURRET_ROCKET_MK3 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

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
