import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { EnemyGroup } from "../../group/enemy.group.class";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseObject } from "../_abstract/base.object.abstract";

export class PenetratingBulletObject extends BaseObject {
    private startPosition!: Phaser.Math.Vector2;
    private speed!: number;
    private effects!: IEffect[];
    private enemiesGroup!: EnemyGroup;
    private dPos!: Phaser.Math.Vector2;
    private maxDistance!: number;
    private hitCount!: number;
    private enemiesAlreadyGotHit!: IEnemy[];

    constructor(scene: Phaser.Scene) {
        super(scene, 'bullet');
    }

    protected _init(startPosition: Phaser.Math.Vector2, endPosition: Phaser.Math.Vector2, speed: number, effects: IEffect[], enemiesGroup: EnemyGroup, penetrationCount: number): [position: Phaser.Math.Vector2] {
        this.startPosition = startPosition.clone();
        this.maxDistance = startPosition.clone().distance(endPosition.clone());
        this.speed = speed;
        this.effects = effects;
        this.enemiesGroup = enemiesGroup;
        this.hitCount = penetrationCount + 1;
        this.enemiesAlreadyGotHit = [];

        this.dPos = endPosition.clone().subtract(startPosition.clone()).normalize().scale(Phaser.Math.GetSpeed(this.speed, 1));

        return [startPosition.clone()];
    }

    private damageEnemy(bullet: this, enemy: IEnemy) {
        if (enemy.active === true && bullet.active === true) {
            this.enemiesAlreadyGotHit.push(enemy);
            if(this.enemiesAlreadyGotHit.length >= this.hitCount) bullet.remove();

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
        this.position = this.position.add(this.dPos.clone().scale(delta));

        this.scene.matter.overlap(
            this,
            this.enemiesGroup.getChildren(),
            (obj1: any, obj2: any) => this.damageEnemy(...convertOverlapParams(obj1, obj2)),
            (obj1: any, obj2: any) => this.shouldDamage(...convertOverlapParams(obj1, obj2)),
        )

        if (this.position.distance(this.startPosition) >= this.maxDistance) {
            this.remove();
        }
    }

    protected _remove() {
    }
}
