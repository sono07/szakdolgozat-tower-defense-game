import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_ENERGY_BALL_BLUE_MK1_FIRERATE, TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_EFFECTS, TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_PENETRATION, TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_SPEED, TURRET_ENERGY_BALL_BLUE_MK1_RANGE } from "../../utils/config.constants";
import { BaseTurretObject } from "./_abstract/base-turret.object.asbtract";

export class TurretEnergyBallBlueMk1Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'energy-ball-blue-mk1',
            TURRET_ENERGY_BALL_BLUE_MK1_RANGE,
            TURRET_ENERGY_BALL_BLUE_MK1_FIRERATE,
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
                speed: TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_SPEED,
                effects: TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_EFFECTS,
                targets: this.gameStateStore.enemiesGroup.getChildren(),
                penetrationCount: TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_PENETRATION,
            });
        }
    }
}
