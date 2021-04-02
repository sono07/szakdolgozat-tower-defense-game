import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretBulletMk3Object } from "../../object/turret/turret-bullet-mk3.object.class";
import { TURRET_BULLET_MK3_COST } from "../../game-config";
import { TILE_TURRET_BULLET_MK3 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract.class";

export class TurretBulletMk3Group extends BaseTurretGroup<TurretBulletMk3Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretBulletMk3Object,
            TURRET_BULLET_MK3_COST,
            TILE_TURRET_BULLET_MK3,
        );
    }
}
