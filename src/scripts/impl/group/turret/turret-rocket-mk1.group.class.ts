import { TurretRocketMk1Object } from "../../object/turret/turret-rocket-mk1.object.class";
import { TURRET_ROCKET_MK1_COST } from "../../utils/config.constants";
import { TILE_TURRET_ROCKET_MK1 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretRocketMk1Group extends BaseTurretGroup<TurretRocketMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretRocketMk1Object,
            TURRET_ROCKET_MK1_COST,
            TILE_TURRET_ROCKET_MK1,
        );
    }
}
