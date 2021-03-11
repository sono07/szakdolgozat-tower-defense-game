import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { FlatSlowEffect } from "../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../effect/instant-effect/flat-damage-effect.class";
import { BulletGroup } from "../group/bullet.group.class";
import { EnemyGroup } from "../group/enemy.group.class";
import { EnemyObject } from "./enemy.object.class";
import { BaseObject } from "./_abstract/base.object.abstract";

type EnemyWithDistance = EnemyObject & {
    _d: number
}

export class TurretObject extends BaseObject {
    private canShootAfterTimeMs!: number;
    private enemiesGroup!: EnemyGroup;
    private bulletGroup!: BulletGroup;
    private radius!: number;
    private debugCircle!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, 'sprites', 'turret');
    }

    
    protected _init(position: Phaser.Math.Vector2, enemiesGroup: EnemyGroup, bulletGroup: BulletGroup): [position: Phaser.Math.Vector2] {
        this.canShootAfterTimeMs = 0;
        this.enemiesGroup = enemiesGroup;
        this.bulletGroup = bulletGroup;
        this.radius = 200;

        if(this.scene.matter.world.drawDebug) {
            this.debugCircle = this.scene.add.circle(position.x, position.y, this.radius, 0xFF0000, 0.1)
        }

        return [position];
    }

    // private enemySorterFirst(a: Enemy, b: Enemy) {
    //     if(a.id < b.id) {
    //         return -1;
    //     } else if(a.id == b.id) {
    //         return 0;
    //     } else {
    //         return 1;
    //     }
    // }

    private enemySorterClosest(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a._d < b._d) {
            return -1;
        } else if(a._d == b._d) {
            return 0;
        } else {
            return 1;
        }
    }

    // private enemySorterFurthest(a: EnemyWithDistance, b: EnemyWithDistance) {
    //     if(a._d < b._d) {
    //         return 1;
    //     } else if(a._d == b._d) {
    //         return 0;
    //     } else {
    //         return -1;
    //     }
    // }

    // private enemySorterLowestHp(a: EnemyWithDistance, b: EnemyWithDistance) {
    //     if(a.hp < b.hp) {
    //         return -1;
    //     } else if(a.hp == b.hp) {
    //         return 0;
    //     } else {
    //         return 1;
    //     }
    // }

    private getEnemy(position: Phaser.Math.Vector2, distance: number): EnemyObject | undefined {
        const enemies = this.enemiesGroup.getChildren() as EnemyObject[];
        const activeEnemies = enemies.filter(e => e.active);
        const activeInRangeEnemies = activeEnemies
            .map(e => {
                const ee: EnemyWithDistance = e as any;
                ee._d = (Phaser.Math.Distance.BetweenPoints(position, e.position))

                return ee;
            })
            .filter(e => e._d <= distance);
        const result = activeInRangeEnemies.sort(this.enemySorterClosest)

        return result.shift();
    }

    private addBullet(enemy: IEnemy) {
        const bullet = this.bulletGroup.get();
        if (bullet) {

            //PenetratingBulletObject
            const targetPos = this.position.clone().add(enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius));
            bullet.init(
                this.position.clone(),
                targetPos,
                210,
                [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
                this.enemiesGroup,
                1,
            );

            // //TargetedHomingBulletObject
            // bullet.init(
            //     this.position.clone(),
            //     enemy,
            //     210,
            //     [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
            // );

            // //TargetedBullet
            // const targetPos = this.position.clone().add(enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius));
            // bullet.init(
            //     this.position.clone(),
            //     targetPos,
            //     210,
            //     [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
            //     enemy,
            // );

            // //Bullet
            // const targetPos = this.position.clone().add(enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius));
            // bullet.init(
            //     this.position.clone(),
            //     targetPos,
            //     210,
            //     [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
            //     this.enemiesGroup.getChildren(),
            // );

            // //Laser
            // const targetPos = this.position.clone().add(enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius));
            // bullet.init(
            //     this.position.clone(),
            //     targetPos,
            //     [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
            //     this.enemiesGroup,
            //     250,
            // );

            // //OverTimeLaser
            // const targetPos = this.position.clone().add(enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius));
            // bullet.init(
            //     this.position.clone(),
            //     targetPos,
            //     [ new FlatDamageEffect(20), new FlatSlowEffect(1000, 100)],
            //     this.enemiesGroup,
            //     1000,
            //     250,
            // );

            // //TargetedLaser
            // bullet.init(
            //     this.position.clone(),
            //     enemy,
            //     [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
            //     250,
            // );
        }
    }

    private fire(): boolean {
        const enemy = this.getEnemy(this.position, this.radius);
        if (enemy) {
            this.addBullet(enemy);
            const angle = Phaser.Math.Angle.BetweenPoints(this.position, enemy.position);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;

            return true;
        } else {
            return false;
        }
    }

    protected _update(time: number, delta: number): void {
        if (time > this.canShootAfterTimeMs) {
            if(this.fire()) {
                this.canShootAfterTimeMs = time + 200;
            }
        }
    }

    protected _remove(): void {
        if(this.debugCircle != null) {
            this.debugCircle.destroy();
        }
    }
}
