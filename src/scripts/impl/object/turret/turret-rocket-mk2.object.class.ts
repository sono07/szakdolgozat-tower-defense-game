import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_ROCKET_MK2_FIRERATE, TURRET_ROCKET_MK2_PROJECTILE_BLOW_RADIUS, TURRET_ROCKET_MK2_PROJECTILE_EFFECTS, TURRET_ROCKET_MK2_PROJECTILE_SPEED, TURRET_ROCKET_MK2_RANGE } from "../../game-config";
import { BaseTurretObject } from "./__abstract__/base-turret.object.asbtract";

export class TurretRocketMk2Object extends BaseTurretObject {
    private slotIndex: number = 0;

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'rocket-mk2',
            TURRET_ROCKET_MK2_RANGE,
            TURRET_ROCKET_MK2_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -13).scale(0.75).rotate(angle);
        let sideOffset!: Phaser.Math.Vector2;
        switch(this.slotIndex) {
            case 0: {
                sideOffset = new Phaser.Math.Vector2(14, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 1: {
                sideOffset = new Phaser.Math.Vector2(5, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 2: {
                sideOffset = new Phaser.Math.Vector2(5, 0).scale(0.75).rotate(angle).scale(1);
                this.slotIndex++;
                break;
            }
            case 3: {
                sideOffset = new Phaser.Math.Vector2(14, 0).scale(0.75).rotate(angle).scale(1);
                this.slotIndex = 0;
                break;
            }
        }

        const rocket = this.gameStateStore.rocketsGroup.get();
        if (rocket) {
            const fromPos = this.position.clone().add(forwardOffset.clone().add(sideOffset));
            const targetPos = enemy.position.clone();
            rocket.init({
                startPosition: fromPos,
                endPosition: targetPos,
                speed: TURRET_ROCKET_MK2_PROJECTILE_SPEED,
                effects: TURRET_ROCKET_MK2_PROJECTILE_EFFECTS,
                targets: this.gameStateStore.enemiesGroup.getChildren(),
                radius: TURRET_ROCKET_MK2_PROJECTILE_BLOW_RADIUS,
            });
        }
    }
}
