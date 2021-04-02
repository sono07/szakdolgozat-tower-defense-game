import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_BULLET_MK2_FIRERATE, TURRET_BULLET_MK2_PROJECTILE_EFFECTS, TURRET_BULLET_MK2_PROJECTILE_PENETRATION, TURRET_BULLET_MK2_PROJECTILE_SPEED, TURRET_BULLET_MK2_RANGE } from "../../game-config";
import { BaseTurretObject } from "./__abstract__/base-turret.object.asbtract";

export class TurretBulletMk2Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'bullet-mk2',
            TURRET_BULLET_MK2_RANGE,
            TURRET_BULLET_MK2_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const dirRadius = enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius);
        const forwardOffset = new Phaser.Math.Vector2(0, -49).scale(0.75).rotate(angle);
        const sideOffset = new Phaser.Math.Vector2(-6, 0).scale(0.75).rotate(angle);
      
        [
            {
                fromPos: this.position.clone().add(forwardOffset.clone().add(sideOffset.clone().scale(1))),
                targetPos: this.position.clone().add(dirRadius).add(sideOffset.clone().scale(1)),
            },
            {
                fromPos: this.position.clone().add(forwardOffset.clone().add(sideOffset.clone().scale(-1))),
                targetPos: this.position.clone().add(dirRadius).add(sideOffset.clone().scale(-1)),
            },
        ].forEach(args => {
            const {fromPos, targetPos} = args;
            const bullet = this.gameStateStore.bulletsGroup.get();
            if (bullet) {
                bullet.init({
                    startPosition: fromPos,
                    endPosition: targetPos,
                    speed: TURRET_BULLET_MK2_PROJECTILE_SPEED,
                    effects: TURRET_BULLET_MK2_PROJECTILE_EFFECTS,
                    targets: this.gameStateStore.enemiesGroup.getChildren(),
                    penetrationCount: TURRET_BULLET_MK2_PROJECTILE_PENETRATION,
                });
            }
        })
    }
}
