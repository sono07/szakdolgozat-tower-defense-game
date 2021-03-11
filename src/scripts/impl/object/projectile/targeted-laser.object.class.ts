import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseProjectile } from "./_abstract/base-projectile.abstract";

export class TargetedLaserObject extends BaseProjectile {
    private effects!: IEffect[];
    private visibleTimeMs!: number;
    private elapsedTimeMs!: number;
    private target!: IEnemy;
    private enemiesAlreadyGotHit!: IEnemy[];

    constructor(scene: Phaser.Scene) {
        //TODO laser image
        super(scene, 'bullet');
    }

    protected _init(startPosition: Phaser.Math.Vector2, target: IEnemy, effects: IEffect[], visibleTimeMs: number): [position: Phaser.Math.Vector2] {
        const endPosition = target.position.clone();
        this.setRotation(0)
        this.setScale(startPosition.distance(endPosition) / this.width + 1, 1);
        this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition));

        this.effects = effects;
        this.visibleTimeMs = visibleTimeMs;
        this.elapsedTimeMs = 0;
        this.target = target;
        this.enemiesAlreadyGotHit = [];
        
        return [startPosition.clone().lerp(endPosition.clone(), 0.5)]
    }

    private damageEnemy(bullet: this, enemy: IEnemy) {
        if(enemy.active === true && bullet.active === true) {
            this.enemiesAlreadyGotHit.push(enemy);

            //clone effects, then add to enemy
            this.effects.forEach(effect => {
                enemy.addEffect(effect.clone());
            })
        }
    }

    private shouldDamage(bullet: this, enemy: IEnemy) {
        return !this.enemiesAlreadyGotHit.includes(enemy);
    }

    protected _update(time: number, delta: number): void {
        this.elapsedTimeMs += delta;

        this.scene.matter.overlap(
            this,
            this.target as any,
            (obj1: any, obj2: any) => this.damageEnemy(...convertOverlapParams(obj1, obj2)),
            (obj1: any, obj2: any) => this.shouldDamage(...convertOverlapParams(obj1, obj2)),
        )

        if (this.elapsedTimeMs > this.visibleTimeMs) {
            this.remove();
        }
    }

    protected _remove() {
    }
}
