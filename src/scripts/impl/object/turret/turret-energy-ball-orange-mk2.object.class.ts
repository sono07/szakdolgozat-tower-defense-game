import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { TURRET_ENERGY_BALL_ORANGE_MK2_FIRERATE, TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_EFFECTS, TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_PENETRATION, TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_SPEED, TURRET_ENERGY_BALL_ORANGE_MK2_RANGE } from "../../game-config";
import { BaseTurretObject } from "./__abstract__/base-turret.object.asbtract";

export class TurretEnergyBallOrangeMk2Object extends BaseTurretObject {
    constructor(scene: Phaser.Scene) {
        super(
            scene,
            'turret-weapons',
            'energy-ball-orange-mk2',
            TURRET_ENERGY_BALL_ORANGE_MK2_RANGE,
            TURRET_ENERGY_BALL_ORANGE_MK2_FIRERATE,
        );
    }

    protected addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -52).scale(0.75).rotate(angle);

        const energyBallOrange = this.gameStateStore.energyBallOrangesGroup.get();
        if (energyBallOrange) {
            const fromPos = this.position.clone().add(forwardOffset);
            const targetPos = enemy.position.clone();
            energyBallOrange.init({
                startPosition: fromPos,
                endPosition: targetPos,
                speed: TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_SPEED,
                effects: TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_EFFECTS,
                targets: this.gameStateStore.enemiesGroup.getChildren(),
                penetrationCount: TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_PENETRATION,
            });
        }
    }
}
