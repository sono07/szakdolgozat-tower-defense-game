import { Phaser } from '../../../api/__helper__/phaser.export';
import { TurretRocketMk1Object } from "../../object/turret/turret-rocket-mk1.object.class";
import { TURRET_ROCKET_MK1_COST } from "../../game-config";
import { TILE_TURRET_ROCKET_MK1 } from "../../game-constants";
import { BaseTurretGroup } from "./__abstract__/base-turret.group.abstract";

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
