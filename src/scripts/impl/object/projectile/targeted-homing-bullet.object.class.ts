import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseObject } from "../_abstract/base.object.abstract";

export class TargetedHomingBulletObject extends BaseObject {
    private startPosition!: Phaser.Math.Vector2;
    private speed!: number;
    private effects!: IEffect[];
    private target!: IEnemy;
    private isTargetDead!: boolean;
    private lastPos!: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene) {
        super(scene, 'bullet');
    }

    protected _init(startPosition: Phaser.Math.Vector2, target: IEnemy, speed: number, effects: IEffect[]): [position: Phaser.Math.Vector2] {
        this.startPosition = startPosition.clone();
        this.target = target;
        this.speed = speed;
        this.effects = effects;
        this.isTargetDead = !target.active;
        this.lastPos = target.position.clone();

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
        if(!this.target.active) {
            this.isTargetDead = true
        }

        if(!this.isTargetDead) {
            this.lastPos = this.target.position.clone();
        }

        const targetPos = this.lastPos;

        const dPos = targetPos.clone().subtract(this.position.clone()).normalize().scale(Phaser.Math.GetSpeed(this.speed, 1));
        this.position = this.position.add(dPos.scale(delta));
        
        this.scene.matter.overlap(
            this,
            this.target as any,
            (obj1: any, obj2: any) => this.damageEnemy(...convertOverlapParams(obj1, obj2)),
        )
        
        if(this.position.distance(this.startPosition) >= targetPos.distance(this.startPosition)) {
            this.remove();
        }
    }

    protected _remove() {
    }
}
