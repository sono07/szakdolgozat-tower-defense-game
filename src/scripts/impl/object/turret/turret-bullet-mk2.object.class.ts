import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { FlatSlowEffect } from "../../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../../effect/instant-effect/flat-damage-effect.class";
import { GameStateStore } from "../../game-state/game-state.store.class";
import { BaseTurretObject, EnemySorters } from "./_abstract/base-turret.object.asbtract";
import { TURRET_BULLET_MK2_FIRERATE, TURRET_BULLET_MK2_RANGE } from "../../utils/config.constants";
import { EnemyWithDistance } from "../../../api/common/types";

export class TurretBulletMk2Object extends BaseTurretObject {
    private isBodyAdded = true;
    private canShootAfterTimeMs!: number;
    private gameStateStore!: GameStateStore;
    private radius: number = TURRET_BULLET_MK2_RANGE;
    private firerate: number = TURRET_BULLET_MK2_FIRERATE;
    private baseImage!: Phaser.GameObjects.Image;
    private rangeCircle!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, 'turret-weapons', 'bullet-mk2');
        this.setScale(0.75)
        this.setDepth(6);

        this.baseImage = this.scene.add.image(0, 0, 'turret-bases', '004');
        this.baseImage.setDepth(4);
        this.baseImage.setScale(0.65);

        this.rangeCircle = this.scene.add.circle(0, 0, this.radius, 0xFFFFFF, 0.2)
        this.rangeCircle.setStrokeStyle(2, 0xFFFFFF, 1)
        this.rangeCircle.setActive(false);
        this.rangeCircle.setVisible(false);
    }
    
    init(position: Phaser.Math.Vector2, gameStateStore: GameStateStore, ignoreUpdate?: boolean): void {
        this.ignoreUpdate = ignoreUpdate == true;
        this.canShootAfterTimeMs = 0;
        this.gameStateStore = gameStateStore;

        this.position = position;
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        this.baseImage.setPosition(this.position.x, this.position.y);
        this.baseImage.setActive(true);
        this.baseImage.setVisible(true);

        this.rangeCircle.setPosition(position.x, position.y);
        this.rangeCircle.setActive(false);
        this.rangeCircle.setVisible(false);

        this.setActive(true);
        this.setVisible(true);
    }

    showRange() {
        this.rangeCircle.setVisible(true);
    }

    hideRange() {
        this.rangeCircle.setVisible(false);
    }

    private getEnemy(position: Phaser.Math.Vector2, distance: number): IEnemy | undefined {
        const enemies = this.gameStateStore.enemiesGroup.getChildren();
        const activeEnemies = enemies.filter(e => e.active);
        const activeInRangeEnemies = activeEnemies
            .map(e => {
                const ee: EnemyWithDistance = e as any;
                ee._d = (Phaser.Math.Distance.BetweenPoints(position, e.position))

                return ee;
            })
            .filter(e => e._d <= distance);
        const result = activeInRangeEnemies.sort(EnemySorters.enemySorterClosest)

        return result.shift();
    }

    private addProjectile(enemy: IEnemy, angle: number) {
        const dirRadius = enemy.position.clone().subtract(this.position.clone()).normalize().scale(this.radius);
        const forwardOffset = new Phaser.Math.Vector2(0, -49).scale(0.75).rotate(angle);
        const sideOffset = new Phaser.Math.Vector2(-6, 0).scale(0.75).rotate(angle);
      
        const bullet1 = this.gameStateStore.bulletsGroup.get();
        if (bullet1) {
            const fromPos = this.position.clone().add(forwardOffset.clone().add(sideOffset.clone().scale(1)));
            const targetPos = this.position.clone().add(dirRadius).add(sideOffset.clone().scale(1));
            bullet1.init(
                fromPos,
                targetPos,
                300,
                [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
                this.gameStateStore.enemiesGroup.getChildren(),
                0,
            );
        }

        const bullet2 = this.gameStateStore.bulletsGroup.get();
        if (bullet2) {
            const fromPos = this.position.clone().add(forwardOffset.clone().add(sideOffset.clone().scale(-1)));
            const targetPos = this.position.clone().add(dirRadius).add(sideOffset.clone().scale(-1));
            bullet2.init(
                fromPos,
                targetPos,
                300,
                [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 100)],
                this.gameStateStore.enemiesGroup.getChildren(),
                0,
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
        if (!this.ignoreUpdate && time > this.canShootAfterTimeMs) {
            if(this.fire()) {
                this.canShootAfterTimeMs = time + this.firerate;
            }
        }
    }

    remove(): void {
        this.rangeCircle.setActive(false);
        this.rangeCircle.setVisible(false);

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
