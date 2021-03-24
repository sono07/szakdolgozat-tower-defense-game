import { IEffect } from "../../api/effect/effect.interface";
import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { GameStateStore } from "../game-state-store/game-state.store.class";
import { BaseObject } from "./_abstract/_base.object.abstract";

export class EnemyObject extends BaseObject implements IEnemy {
    id!: number;
    health!: number;
    speed!: number;
    effects!: IEffect[];
    private gameStateStore!: GameStateStore;
    path!: Phaser.Curves.Path;
    pathT!: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprites", "enemy");
    }
    
    protected _init(healt: number, speed: number, path: Phaser.Curves.Path, gameStateStore: GameStateStore): [position: Phaser.Math.Vector2] {
        this.health = healt;
        this.speed = speed;
        this.effects = [];
        this.gameStateStore = gameStateStore;
        this.path = path;
        this.pathT = 0;

        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);

        return [vector];
    }

    addEffect(effect: IEffect): void {
        this.effects.push(effect);
    }

    protected  _update(time: number, delta: number): void {
        const speed = this.speed < 0 ? 0 : Phaser.Math.GetSpeed(this.speed/this.path.getLength(), 1);
        this.pathT += speed * delta;
        
        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        this.position = vector;

        for(const effect of this.effects) {
            effect.update(time, delta, this);
        }
        this.effects = this.effects.filter(effect => !effect.isDestroyed);

        if(this.health <= 0) {
            this.remove();
            this.gameStateStore.receiveMoney(100)
        } else if (this.pathT >= 1) {
            this.gameStateStore.receiveDamage(1);
            this.remove();
        }
    }

    protected _remove(): void {
    }
}
