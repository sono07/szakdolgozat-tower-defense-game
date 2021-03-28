import { EnemyWithDistance } from "../../../../api/common/types";
import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { ITurretObject } from "../../../../api/object/turret-object/turret-object.interface";
import { GameStateStore } from "../../../game-state/game-state.store.class";
import { TURRET_BASE_Z_INDEX, TURRET_TOP_Z_INDEX } from "../../../utils/constants";
import { BaseObject } from "../../_abstract/base.object.abstract";

export abstract class BaseTurretObject extends BaseObject implements ITurretObject {
    public ignoreUpdate: boolean = false;

    protected canShootAfterTimeMs!: number;
    protected gameStateStore!: GameStateStore;
    protected radius: number;
    protected firerate: number;
    protected baseImage: Phaser.GameObjects.Image;
    protected rangeCircle: Phaser.GameObjects.Arc;
    
    constructor(scene: Phaser.Scene, texture: string, frame: string | undefined = undefined, radius: number, firerate: number) {
        super(scene, texture, frame);

        this.scene.matter.world.remove(this.body, true);

        this.radius = radius;
        this.firerate = firerate;

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

    public init(params: {
        position: Phaser.Math.Vector2,
        gameStateStore: GameStateStore,
        ignoreUpdate?: boolean,
        cb?: () => void,
    }): void {
        const {position, gameStateStore, ignoreUpdate, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.ignoreUpdate = ignoreUpdate == true;
                this.canShootAfterTimeMs = 0;
                this.gameStateStore = gameStateStore;
                this.position = position;
        
                this.baseImage.setPosition(this.position.x, this.position.y);
                this.baseImage.setActive(true);
                this.baseImage.setVisible(true);
        
                this.rangeCircle.setPosition(position.x, position.y);
                this.rangeCircle.setActive(false);
                this.rangeCircle.setVisible(false);

                if(cb) cb();
            }
        })
    }

    public showRange() {
        this.rangeCircle.setVisible(true);
    }

    public hideRange() {
        this.rangeCircle.setVisible(false);
    }

    protected getEnemy(position: Phaser.Math.Vector2, distance: number): IEnemy | undefined {
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

    protected abstract addProjectile(enemy: IEnemy, angle: number): void;

    protected fire(): boolean {
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

    public update(time: number, delta: number): void {
        if (!this.ignoreUpdate && time > this.canShootAfterTimeMs) {
            if(this.fire()) {
                this.canShootAfterTimeMs = time + this.firerate;
            }
        }
    }

    public remove(cb?: (() => void)): void {
        super.remove(() => {
            this.rangeCircle.setActive(false);
            this.rangeCircle.setVisible(false);
    
            this.baseImage.setActive(false);
            this.baseImage.setVisible(false);

            if(cb) cb();
        })
    }
}

export const EnemySorters = {
    enemySorterClosestToTheEnd(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.pathT > b.pathT) {
            return -1;
        } else if(a.pathT == b.pathT) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterFurthestToTheEnd(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.pathT < b.pathT) {
            return -1;
        } else if(a.pathT == b.pathT) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterClosest(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a._d < b._d) {
            return -1;
        } else if(a._d == b._d) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterFurthest(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a._d < b._d) {
            return 1;
        } else if(a._d == b._d) {
            return 0;
        } else {
            return -1;
        }
    },

    enemySorterLowestHp(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.health < b.health) {
            return -1;
        } else if(a.health == b.health) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterHighestHp(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.health > b.health) {
            return -1;
        } else if(a.health == b.health) {
            return 0;
        } else {
            return 1;
        }
    },
} 