import { TurretRocketMk2Object } from "../../object/turret/turret-rocket-mk2.object.class";
import { TURRET_ROCKET_MK2_COST } from "../../utils/config.constants";
import { TILE_TURRET_ROCKET_MK2 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretRocketMk2Group extends BaseTurretGroup<TurretRocketMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretRocketMk2Object);
    }

    getPrice() {
        return TURRET_ROCKET_MK2_COST;
    }

    getTile() {
        return TILE_TURRET_ROCKET_MK2;
    }
}
