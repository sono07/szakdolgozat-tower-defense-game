import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_LASER_MK2_EFFECTS, TURRET_LASER_MK2_FIRERATE, TURRET_LASER_MK2_RANGE } from "../../utils/config.constants";
import { BaseTurretObject } from "./_abstract/base-turret.object.asbtract";

export class TurretLaserMk2Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'laser-mk2',
            TURRET_LASER_MK2_RANGE,
            TURRET_LASER_MK2_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -42).scale(0.75).rotate(angle);

        const laser = this.gameStateStore.lasersGroup.get();
        if (laser) {
            const fromPos = this.position.clone().add(forwardOffset);
            const targetPos = enemy.position.clone();
            laser.init({
                startPosition: fromPos,
                endPosition: targetPos,
                effects: TURRET_LASER_MK2_EFFECTS,
                targets: [enemy],
            });
        }
    }
}
