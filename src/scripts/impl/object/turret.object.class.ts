import { BulletObject } from "./bullet.object.class";
import { EnemyObject } from "./enemy.object.class";
import { BaseObject } from "./_abstract/base.object.abstract";

type EnemyWithDistance = EnemyObject & {
    _d: number
}

export class TurretObject extends BaseObject {
    private canShootAfterTimeMs!: number;
    private enemiesGroup!: Phaser.Physics.Arcade.Group;
    private bulletGroup!: Phaser.Physics.Arcade.Group;
    private radius!: number;
    private debugCircle!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, 'sprites', 'turret');
    }

    create(position: Phaser.Math.Vector2, enemiesGroup: Phaser.Physics.Arcade.Group, bulletGroup: Phaser.Physics.Arcade.Group) {
        this.canShootAfterTimeMs = 0;
        this.enemiesGroup = enemiesGroup;
        this.bulletGroup = bulletGroup;
        this.radius = 200;

        super._create(position);

        if(this.scene.physics.world.drawDebug) {
            this.debugCircle = this.scene.add.circle(position.x, position.y, this.radius, 0xFF0000, 0.1)
        }
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
            .map(e => ({...e, _d: (Phaser.Math.Distance.BetweenPoints(position, e.position))} as EnemyWithDistance))
            .filter(e => e._d <= distance);
        const result = activeInRangeEnemies.sort(this.enemySorterClosest)

        return result.shift();
    }

    private addBullet(position: Phaser.Math.Vector2, angle: number) {
        const bullet: BulletObject = this.bulletGroup.get();
        if (bullet) {
            bullet.create(position, angle, this.enemiesGroup);
        }
    }

    private fire(): boolean {
        const enemy = this.getEnemy(this.position, this.radius);
        if (enemy) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            this.addBullet(this.position.clone(), angle);

            return true;
        } else {
            return false;
        }
    }

    update(time: number, delta: number) {
        if (time > this.canShootAfterTimeMs) {
            if(this.fire()) {
                this.canShootAfterTimeMs = time + 1000;
            }
        }
    }

    destroy() {
        if(this.debugCircle != null) {
            this.debugCircle.destroy();
        }

        super._destroy();
    }
}
