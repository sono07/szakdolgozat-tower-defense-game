import { IEffect } from "../../../api/effect/effect.interface";
import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { ENEMY_DAMAGE_TO_PLAYER, ENEMY_MONEY_VALUE } from "../../utils/config.constants";
import { ENEMY_HEALTH_BAR_OFFSET_PX, ENEMY_Z_INDEX } from "../../utils/constants";
import { HealthBarObject } from "../misc/health-bar.object.class";
import { BaseObject } from "../_abstract/base.object.abstract";

export class EnemyObject extends BaseObject implements IEnemy {
    id!: number;
    health!: number;
    private maxSpeed!: number;
    speed!: number;
    effects!: IEffect[];
    private gameStateStore!: IGameStateStore;
    path!: Phaser.Curves.Path;
    pathT!: number;

    private healthBar: HealthBarObject;

    constructor(scene: Phaser.Scene) {
        super(scene, "enemy", "001");

        this.setSensor(true);
        this.setDepth(ENEMY_Z_INDEX);

        this.healthBar = new HealthBarObject(this.scene);
    }

    public init(params: {
        health: number,
        speed: number,
        path: Phaser.Curves.Path,
        gameStateStore: IGameStateStore,
        cb?: () => void,
    }): void {
        const {health, speed, path, gameStateStore, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.health = health;
                this.maxSpeed = speed;
                this.speed = speed;
                this.effects = [];
                this.gameStateStore = gameStateStore;
                this.path = path;
                this.pathT = 0;
        
                let vector = new Phaser.Math.Vector2();
                this.path.getPoint(this.pathT, vector);
        
                this.healthBar.init(new Phaser.Math.Vector2(vector.x, vector.y - ENEMY_HEALTH_BAR_OFFSET_PX), 50, 10, 1, this.health, this.health);
                this.play({ key: "enemy-walk-animation", repeat: -1, frameRate: (8*5)/6 });
                this.anims.timeScale = this.speed / this.maxSpeed;
        
                this.position = vector;

                if(cb) cb();
            }
        })
    }

    public addEffect(effect: IEffect): void {
        this.effects.push(effect);
    }

    public update(time: number, delta: number): void {
        const speed = this.speed < 0 ? 0 : Phaser.Math.GetSpeed(this.speed/this.path.getLength(), 1);
        this.pathT += speed * delta;

        this.anims.timeScale = this.speed / this.maxSpeed;
        
        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        this.position = vector;

        let vector2 = new Phaser.Math.Vector2();
        this.path.getTangent(this.pathT, vector2);
        this.rotation = Phaser.Math.Angle.BetweenPoints(new Phaser.Math.Vector2(0, 0), vector2) - Math.PI / 2;

        this.healthBar.update(new Phaser.Math.Vector2(vector.x, vector.y - ENEMY_HEALTH_BAR_OFFSET_PX), this.health);

        for(const effect of this.effects) {
            effect.update(time, delta, this);
        }
        this.effects = this.effects.filter(effect => !effect.isDestroyed);

        if(this.health <= 0) {
            this.remove();
            this.gameStateStore.receiveMoney(ENEMY_MONEY_VALUE)
        } else if (this.pathT >= 1) {
            this.gameStateStore.receiveDamage(ENEMY_DAMAGE_TO_PLAYER);
            this.remove();
        }
    }

    public remove(): void {
        super.remove(() => {
            this.stop();
            this.healthBar.remove();
        });
    }
}
