import { EnemyWithDistance } from "../../../api/common/types";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { GameStateStore } from "../../game-state/game-state.store.class";
import { TURRET_LASER_MK3_EFFECTS, TURRET_LASER_MK3_FIRERATE, TURRET_LASER_MK3_RANGE } from "../../utils/config.constants";
import { TURRET_BASE_Z_INDEX, TURRET_TOP_Z_INDEX } from "../../utils/constants";
import { BaseTurretObject, EnemySorters } from "./_abstract/base-turret.object.asbtract";

export class TurretLaserMk3Object extends BaseTurretObject {
    private isBodyAdded = true;
    private canShootAfterTimeMs!: number;
    private gameStateStore!: GameStateStore;
    private radius: number = TURRET_LASER_MK3_RANGE;
    private firerate: number = TURRET_LASER_MK3_FIRERATE;
    private baseImage!: Phaser.GameObjects.Image;
    private rangeCircle!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, 'turret-weapons', 'laser-mk3');
        this.setScale(0.75)
        this.setDepth(TURRET_TOP_Z_INDEX);

        this.baseImage = this.scene.add.image(0, 0, 'turret-bases', '004');
        this.baseImage.setDepth(TURRET_BASE_Z_INDEX);
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
        const forwardOffset = new Phaser.Math.Vector2(0, -42).scale(0.75).rotate(angle);

        const laser = this.gameStateStore.lasersGroup.get();
        if (laser) {
            const fromPos = this.position.clone().add(forwardOffset);
            const targetPos = enemy.position.clone();
            laser.init({
                startPosition: fromPos,
                endPosition: targetPos,
                effects: TURRET_LASER_MK3_EFFECTS,
                targets: [enemy],
            });
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