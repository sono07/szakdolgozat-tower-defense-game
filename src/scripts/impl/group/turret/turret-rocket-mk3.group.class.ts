import { TurretRocketMk3Object } from "../../object/turret/turret-rocket-mk3.object.class";
import { TURRET_ROCKET_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_ROCKET_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretRocketMk3Group extends BaseTurretGroup<TurretRocketMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretRocketMk3Object);
    }

    getPrice() {
        return TURRET_ROCKET_MK3_COST;
    }

    getTile() {
        return TILE_TURRET_ROCKET_MK3;
    }
}
