import { Phaser } from '../../../../../api/__helper__/phaser.export';
import { IEffect } from "../../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../../api/object/enemy-object/enemy.interface";
import { IMovingProjectile } from "../../../../../api/object/projectile-object/moving-projectile.interface";
import { BaseProjectile } from "../../__abstract__/base-projectile.abstract";

export abstract class BaseMovingProjectile extends BaseProjectile implements IMovingProjectile {
    protected startPosition!: Phaser.Math.Vector2;
    protected speed!: number;
    protected dPosition!: Phaser.Math.Vector2;
    protected maxDistance!: number;

    public init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
        cb?: () => void,
    }) {
        const {startPosition, endPosition, speed, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.startPosition = startPosition.clone();
                this.position = startPosition.clone();
                this.speed = speed;
                this.dPosition = endPosition.clone().subtract(startPosition.clone()).normalize().scale(Phaser.Math.GetSpeed(speed, 1));
                this.maxDistance = startPosition.clone().distance(endPosition.clone());
                
                if(cb) cb();
            },
        })
    }
}
