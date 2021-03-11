import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseProjectile } from "./_abstract/base-projectile.abstract";

export class BulletObject extends BaseProjectile {
    private startPosition!: Phaser.Math.Vector2;
    private speed!: number;
    private effects!: IEffect[];
    private targets!: IEnemy[];
    private dPos!: Phaser.Math.Vector2;
    private maxDistance!: number;

    constructor(scene: Phaser.Scene) {
        super(scene, 'bullet');
    }

    protected _init(startPosition: Phaser.Math.Vector2, endPosition: Phaser.Math.Vector2, speed: number, effects: IEffect[], targets: IEnemy[]): [position: Phaser.Math.Vector2] {
        this.startPosition = startPosition.clone();
        this.speed = speed;
        this.effects = effects;
        this.targets = targets;
        this.dPos = endPosition.clone().subtract(startPosition.clone()).normalize().scale(Phaser.Math.GetSpeed(this.speed, 1));
        this.maxDistance = startPosition.clone().distance(endPosition.clone());

        return [startPosition.clone()];
    }

    private damageEnemy(bullet: this, enemy: IEnemy) {
        if (enemy.active === true && bullet.active === true) {
            bullet.remove();

            //clone effects, then add to enemy
            this.effects.forEach(effect => {
                enemy.addEffect(effect.clone());
            })
        }
    }

    protected _update(time: number, delta: number): void {
        this.position = this.position.add(this.dPos.clone().scale(delta));

        this.scene.matter.overlap(
            this,
            this.targets as any[],
            (obj1: any, obj2: any) => this.damageEnemy(...convertOverlapParams(obj1, obj2)),
        )

        if (this.position.distance(this.startPosition) >= this.maxDistance) {
            this.remove();
        }
    }

    protected _remove() {
    }
}
