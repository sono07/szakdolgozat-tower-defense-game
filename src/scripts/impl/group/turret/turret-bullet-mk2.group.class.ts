import { TurretBulletMk2Object } from "../../object/turret/turret-bullet-mk2.object.class";
import { TURRET_BULLET_MK2_COST } from "../../utils/config.constants";
import { TILE_TURRET_BULLET_MK2 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretBulletMk2Group extends BaseTurretGroup<TurretBulletMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretBulletMk2Object);
    }

    getPrice() {
        return TURRET_BULLET_MK2_COST;
    }

    getTile() {
        return TILE_TURRET_BULLET_MK2;
    }
}
