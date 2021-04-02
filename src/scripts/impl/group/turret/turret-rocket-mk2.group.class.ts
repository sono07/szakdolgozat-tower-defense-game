import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretRocketMk2Object } from "../../object/turret/turret-rocket-mk2.object.class";
import { TURRET_ROCKET_MK2_COST } from "../../game-config";
import { TILE_TURRET_ROCKET_MK2 } from "../../game-constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretRocketMk2Group extends BaseTurretGroup<TurretRocketMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretRocketMk2Object,
            TURRET_ROCKET_MK2_COST,
            TILE_TURRET_ROCKET_MK2,
        );
    }
}
