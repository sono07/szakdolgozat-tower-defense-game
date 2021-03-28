import { TurretBulletMk1Object } from "../../object/turret/turret-bullet-mk1.object.class";
import { TURRET_BULLET_MK1_COST } from "../../utils/config.constants";
import { TILE_TURRET_BULLET_MK1 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretBulletMk1Group extends BaseTurretGroup<TurretBulletMk1Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretBulletMk1Object,
            TURRET_BULLET_MK1_COST,
            TILE_TURRET_BULLET_MK1,
        );
    }
}
