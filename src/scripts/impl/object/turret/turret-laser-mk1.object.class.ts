import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_LASER_MK1_FIRERATE, TURRET_LASER_MK1_PROJECTILE_EFFECTS, TURRET_LASER_MK1_RANGE } from "../../game-config";
import { BaseTurretObject } from "./__abstract__/base-turret.object.asbtract";

export class TurretLaserMk1Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'laser-mk1',
            TURRET_LASER_MK1_RANGE,
            TURRET_LASER_MK1_FIRERATE,
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
                effects: TURRET_LASER_MK1_PROJECTILE_EFFECTS,
                targets: [enemy],
            });
        }
    }
}
