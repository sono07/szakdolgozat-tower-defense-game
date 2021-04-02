import { Phaser } from '../../../../../../api/__helper__/phaser.export';
import { IEffect } from "../../../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../../../api/object/enemy-object/enemy.interface";
import { IPenetratingMovingProjectile } from "../../../../../../api/object/projectile-object/penetrating-moving-projectile.interface";
import { BaseMovingProjectile } from "../../__abstract__/base-moving-projectile.abstract";

export abstract class BasePenetratingMovingProjectile extends BaseMovingProjectile implements IPenetratingMovingProjectile {
    protected hitCount!: number;
    protected enemiesAlreadyGotHit!: IEnemy[];

    public init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
        penetrationCount: number,
        cb?: () => void,
    }) {
        const {penetrationCount, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.hitCount = penetrationCount + 1;
                this.enemiesAlreadyGotHit = [];
                
                if(cb) cb();
            },
        })
    }

    public update(time: number, delta: number): void {
        super.update(time, delta, (time, delta) => {
            this.position = this.position.add(this.dPosition.clone().scale(delta));

            this.checkOverlapAndApplyEffects(this.targets);

            if (this.position.distance(this.startPosition) >= this.maxDistance) {
                this.startRemove();
            }
        })
    }

    protected shouldApplyEffects(enemy: IEnemy): boolean {
        return !this.enemiesAlreadyGotHit.includes(enemy);
    }

    protected applyEffects(enemy: IEnemy): void {
        super.applyEffects(enemy, (enemy) => {
            this.enemiesAlreadyGotHit.push(enemy);
            if(this.enemiesAlreadyGotHit.length >= this.hitCount) {
                this.startRemove();
            }
        })
    }
}
