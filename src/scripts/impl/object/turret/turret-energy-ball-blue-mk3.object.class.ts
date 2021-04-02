import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_ENERGY_BALL_BLUE_MK3_FIRERATE, TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_EFFECTS, TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_PENETRATION, TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_SPEED, TURRET_ENERGY_BALL_BLUE_MK3_RANGE } from "../../game-config";
import { BaseTurretObject } from "./_abstract/base-turret.object.asbtract";

export class TurretEnergyBallBlueMk3Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'energy-ball-blue-mk3',
            TURRET_ENERGY_BALL_BLUE_MK3_RANGE,
            TURRET_ENERGY_BALL_BLUE_MK3_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -52).scale(0.75).rotate(angle);

        const energyBallBlue = this.gameStateStore.energyBallBluesGroup.get();
        if (energyBallBlue) {
            const fromPos = this.position.clone().add(forwardOffset);
            const targetPos = enemy.position.clone();
            energyBallBlue.init({
                startPosition: fromPos,
                endPosition: targetPos,
                speed: TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_SPEED,
                effects: TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_EFFECTS,
                targets: this.gameStateStore.enemiesGroup.getChildren(),
                penetrationCount: TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_PENETRATION,
            });
        }
    }
}
