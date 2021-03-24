import { TurretBulletMk3Object } from "../../object/turret/turret-bullet-mk3.object.class";
import { TURRET_BULLET_MK3_COST } from "../../utils/config.constants";
import { TILE_TURRET_BULLET_MK3 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretBulletMk3Group extends BaseTurretGroup<TurretBulletMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretBulletMk3Object);
    }

    getPrice() {
        return TURRET_BULLET_MK3_COST;
    }

    getTile() {
        return TILE_TURRET_BULLET_MK3;
    }
}
