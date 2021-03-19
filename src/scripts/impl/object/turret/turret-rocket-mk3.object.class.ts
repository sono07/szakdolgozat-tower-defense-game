import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { FlatSlowEffect } from "../../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../../effect/instant-effect/flat-damage-effect.class";
import { EnemyObject } from "../enemy.object.class";
import { GameStateStore } from "../../game-state-store/game-state.store.class";
import { BaseObject } from "../_abstract/base.object.abstract";

type EnemyWithDistance = EnemyObject & {
    _d: number
}

export class TurretRocketMk3Object extends BaseObject {
    private isBodyAdded = true;
    private canShootAfterTimeMs!: number;
    private gameStateStore!: GameStateStore;
    private radius!: number;
    private baseImage!: Phaser.GameObjects.Image;
    private debugCircle!: Phaser.GameObjects.Arc;

    private slotIndex: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene, 'turret-weapons', 'rocket-mk3');
        this.setScale(0.75)
        this.setDepth(6);

        this.baseImage = this.scene.add.image(0, 0, 'turret-bases', '004');
        this.baseImage.setDepth(4);
        this.baseImage.setScale(0.65);
    }
    
    init(position: Phaser.Math.Vector2, gameStateStore: GameStateStore): void {
        this.canShootAfterTimeMs = 0;
        this.gameStateStore = gameStateStore;
        this.radius = 200;

        if(this.scene.matter.world.drawDebug) {
            this.debugCircle = this.scene.add.circle(position.x, position.y, this.radius, 0xFF0000, 0.1)
        }

        this.position = position;
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        this.baseImage.setPosition(this.position.x, this.position.y);
        this.baseImage.setActive(true);
        this.baseImage.setVisible(true);

        this.setActive(true);
        this.setVisible(true);
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
        const enemies = this.gameStateStore.enemiesGroup.getChildren() as EnemyObject[];
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

    private addProjectile(enemy: IEnemy, angle: number) {
        const forwardOffset = new Phaser.Math.Vector2(0, -13).scale(0.75).rotate(angle);
        let sideOffset!: Phaser.Math.Vector2;
        switch(this.slotIndex) {
            case 0: {
                sideOffset = new Phaser.Math.Vector2(26, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 1: {
                sideOffset = new Phaser.Math.Vector2(17, 0).scale(0.75).rotate(angle).scale(-1);
                this.slotIndex++;
                break;
            }
            case 2: {
                sideOffset = new Phaser.Math.Vector2(17, 0).scale(0.75).rotate(angle).scale(1);
                this.slotIndex++;
                break;
            }
            case 3: {
                sideOffset = new Phaser.Math.Vector2(26, 0).scale(0.75).rotate(angle).scale(1);
                this.slotIndex = 0;
                break;
            }
        }

        const rocket = this.gameStateStore.rocketsGroup.get();
        if (rocket) {
            const fromPos = this.position.clone().add(forwardOffset.clone().add(sideOffset));
            const targetPos = enemy.position.clone();
            rocket.init(
                fromPos,
                targetPos,
                200,
                [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
                this.gameStateStore.enemiesGroup.getChildren(),
                100,
            );
        }
    }

    private fire(): boolean {
        const enemy = this.getEnemy(this.position, this.radius);
        if (enemy) {
            const angle = Phaser.Math.Angle.BetweenPoints(this.position, enemy.position) + Math.PI / 2;
            this.angle = angle * Phaser.Math.RAD_TO_DEG;

            this.addProjectile(enemy, angle);

            return true;
        } else {
            return false;
        }
    }

    update(time: number, delta: number): void {
        if (time > this.canShootAfterTimeMs) {
            if(this.fire()) {
                this.canShootAfterTimeMs = time + 1000;
            }
        }
    }

    remove(): void {
        if(this.debugCircle != null) {
            this.debugCircle.destroy();
        }

        this.baseImage.setActive(false);
        this.baseImage.setVisible(false);

        this.setActive(false);
        this.setVisible(false);

        if(this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }
    }
}