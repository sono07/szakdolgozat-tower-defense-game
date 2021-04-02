import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretBulletMk1Object } from "../../object/turret/turret-bullet-mk1.object.class";
import { TURRET_BULLET_MK1_COST } from "../../game-config";
import { TILE_TURRET_BULLET_MK1 } from "../../game-constants";
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
