import { FlatSlowEffect } from "../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../effect/instant-effect/flat-damage-effect.class";
import { EnemyObject } from "./enemy.object.class";
import { BaseObject } from "./_abstract/base.object.abstract";

export class BulletObject extends BaseObject {
    private lifespan!: number;
    private speed!: number;
    private direction!: Phaser.Math.Vector2;
    private enemiesGroup!: Phaser.Physics.Arcade.Group;
    private collider!: Phaser.Physics.Arcade.Collider;

    constructor(scene: Phaser.Scene) {
        super(scene, 'bullet');;
    }

    create(position: Phaser.Math.Vector2, angle: number, enemiesGroup: Phaser.Physics.Arcade.Group) {
        this.lifespan = 1000;
        this.speed = Phaser.Math.GetSpeed(600, 1);
        this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG; //sprite image specific conversion
        this.direction = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle))

        this.enemiesGroup = enemiesGroup;
        this.collider = this.scene.physics.add.overlap(
            this,
            this.enemiesGroup,
            (obj1, obj2) => this.damageEnemy(obj1 as this, obj2 as EnemyObject)
        );

        super._create(position);
    }

    private damageEnemy(bullet: this, enemy: EnemyObject) {
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.destroy();

            enemy.effects.push(new FlatDamageEffect(25));
            enemy.effects.push(new FlatSlowEffect(1000, 50));
        }
    }

    update(time: number, delta: number) {
        this.lifespan -= delta;

        this.position = this.position.clone().add(this.direction.clone().scale(this.speed).scale(delta))

        if (this.lifespan <= 0) {
            this.destroy();
        }
    }

    destroy() {
        this.collider.destroy();
        super._destroy();
    }

}
