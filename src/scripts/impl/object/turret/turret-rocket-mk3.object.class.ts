import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_ROCKET_MK3_FIRERATE, TURRET_ROCKET_MK3_PROJECTILE_BLOW_RADIUS, TURRET_ROCKET_MK3_PROJECTILE_EFFECTS, TURRET_ROCKET_MK3_PROJECTILE_SPEED, TURRET_ROCKET_MK3_RANGE } from "../../utils/config.constants";
import { BaseTurretObject } from "./_abstract/base-turret.object.asbtract";

export class TurretRocketMk3Object extends BaseTurretObject {
    private slotIndex: number = 0;

    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'rocket-mk3',
            TURRET_ROCKET_MK3_RANGE,
            TURRET_ROCKET_MK3_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -13).scale(0.75).rotate(angle);
        let sideOffset!: Phaser.Math.Vector2;
        switch(this.slotIndex) {
            case 0: {
                sideOffset = new Phaser.Math.Vector2(26, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 1: {
                sideOffset = new Phaser.Math.Vector2(17, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 2: {
                sideOffset = new Phaser.Math.Vector2(17, 0).scale(0.75).rotate(angle).scale(1);
                this.slotIndex++;
                break;
            }
            case 3: {
                sideOffset = new Phaser.Math.Vector2(26, 0).scale(0.75).rotate(angle).scale(1);
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
                speed: TURRET_ROCKET_MK3_PROJECTILE_SPEED,
                effects: TURRET_ROCKET_MK3_PROJECTILE_EFFECTS,
                targets: this.gameStateStore.enemiesGroup.getChildren(),
                radius: TURRET_ROCKET_MK3_PROJECTILE_BLOW_RADIUS,
            });
        }
    }
}
