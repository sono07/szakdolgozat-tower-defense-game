import { IEffect } from "../../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../../api/object/enemy-object/enemy.interface";
import { BasePenetratingMovingProjectile } from "./_abstract/base-penetrating-moving-projectile.abstract";

export class BulletObject extends BasePenetratingMovingProjectile {

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-bullet', undefined, (self) => {
            self.setCircle(1);
        });

        this.setScale(1.5);
    }

    public init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
        penetrationCount: number,
    }): void {
        const {startPosition, endPosition} = params;

        super.init({
            ...params,
            cb: () => {
                this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition) + Math.PI / 2);
            },
        })
    }

    protected startRemove() {
        super.startRemove(() => {
            this.play({ key: "projectile-bullet-blow-animation", repeat: 0, frameRate: (6 * 5) });
        })
    }
}
