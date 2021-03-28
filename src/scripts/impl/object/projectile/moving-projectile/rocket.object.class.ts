import { IEffect } from "../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { IAOEMovingProjectile } from "../../../../api/object/projectile-object/aoe-moving-projectile.interface";
import { BaseMovingProjectile } from "./_abstract/base-moving-projectile.abstract";

export class RocketObject extends BaseMovingProjectile implements IAOEMovingProjectile {
    private radius!: number;

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-rocket');
    }

    public init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
        radius: number,
        cb?: () => void,
    }): void {
        const {startPosition, endPosition, radius, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.radius = radius;
                this.setScale(200/256,200/256);
                this.setCircle(radius);
                this.setSensor(true);
                this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition) + Math.PI / 2);

                if(cb) cb();
            },
        })
    }

    public update(time: number, delta: number): void {
        super.update(time, delta, (time, delta) => {
            this.position = this.position.add(this.dPosition.clone().scale(delta));

            if (this.position.distance(this.startPosition) >= this.maxDistance) {
                this.checkOverlapAndApplyEffects(this.targets);
                this.startRemove();
            }
        })
    }

    protected startRemove() {
        super.startRemove(() => {
            this.setFrame('002');
            this.setScale(this.radius*4/this.displayHeight)
            this.play({ key: "projectile-rocket-blow-animation", repeat: 0, frameRate: (49/2) });
            this.setRotation(0);
            this.position = this.position.clone().add(new Phaser.Math.Vector2(-8, 10).scale(this.radius*4/100))
        })
    }
}
