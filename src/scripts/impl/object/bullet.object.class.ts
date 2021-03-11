import { FlatSlowEffect } from "../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../effect/instant-effect/flat-damage-effect.class";
import { EnemyGroup } from "../group/enemy.group.class";
import { convertOverlapParams } from "../utils/matter.physics.utils";
import { EnemyObject } from "./enemy.object.class";
import { BaseObject } from "./_abstract/base.object.abstract";

export class BulletObject extends BaseObject {
    private lifespan!: number;
    private speed!: number;
    private direction!: Phaser.Math.Vector2;
    private enemiesGroup!: EnemyGroup;

    constructor(scene: Phaser.Scene) {
        super(scene, 'bullet');
    }

    protected _init(position: Phaser.Math.Vector2, angle: number, enemiesGroup: EnemyGroup): [position: Phaser.Math.Vector2] {
        this.lifespan = 1000;
        this.speed = Phaser.Math.GetSpeed(600, 1);
        this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG; //sprite image specific conversion
        this.direction = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle))

        this.enemiesGroup = enemiesGroup;


        return [position];
    }

    private damageEnemy(bullet: this, enemy: EnemyObject) {
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.remove();

            enemy.addEffect(new FlatDamageEffect(25))
            enemy.addEffect(new FlatSlowEffect(1000, 50));
        }
    }

    protected _update(time: number, delta: number) {
        this.lifespan -= delta;
        this.position = this.position.clone().add(this.direction.clone().scale(this.speed).scale(delta))

        this.scene.matter.overlap(
            this,
            this.enemiesGroup.getChildren(),
            (obj1: any, obj2: any) => this.damageEnemy(...convertOverlapParams(obj1, obj2)),
        );

        if (this.lifespan <= 0) {
            this.remove();
        }
    }

    protected _remove() {
    }

}
