import { TurretLaserMk2Object } from "../../object/turret/turret-laser-mk2.object.class";
import { TURRET_LASER_MK2_COST } from "../../utils/config.constants";
import { TILE_TURRET_LASER_MK2 } from "../../utils/constants";
import { BaseTurretGroup } from "./_abstract/base-turret.group.abstract.class";

export class TurretLaserMk2Group extends BaseTurretGroup<TurretLaserMk2Object> {

    constructor(scene: Phaser.Scene) {
        super(scene, TurretLaserMk2Object);
    }

    getPrice() {
        return TURRET_LASER_MK2_COST;
    }

    getTile() {
        return TILE_TURRET_LASER_MK2;
    }
}
