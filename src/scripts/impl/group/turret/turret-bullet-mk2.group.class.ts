import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretBulletMk2Object } from "../../object/turret/turret-bullet-mk2.object.class";
import { TURRET_BULLET_MK2_COST } from "../../game-config";
import { TILE_TURRET_BULLET_MK2 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract.class";

export class TurretBulletMk2Group extends BaseTurretGroup<TurretBulletMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            TurretBulletMk2Object,
            TURRET_BULLET_MK2_COST,
            TILE_TURRET_BULLET_MK2,
        );
    }
}
