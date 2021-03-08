import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";

export abstract class BaseEffect implements IEffect {
    // readonly discriminator = "EFFECT";
    protected abstract totalDurationMs: number;
    protected elapsedDurationMs: number;
    protected isApplied: boolean;
    isDestroyed: boolean;

    constructor() {
        this.elapsedDurationMs = 0;
        this.isApplied = false;
        this.isDestroyed = false;
    }

    private create(enemy: IEnemy): void {
        this.isApplied = true;
        this.isDestroyed = false;

        this._create(enemy);
    }

    protected abstract _create(enemy: IEnemy): void;

    update(time: number, delta: number, enemy: IEnemy): void {
        if(!this.isApplied) {
            this.create(enemy);
        }

        this._update(time, delta, enemy);
        this.elapsedDurationMs += delta;

        if (this.elapsedDurationMs >= this.totalDurationMs) {
            this.destroy(enemy);
        }
    }

    protected abstract _update(time: number, delta: number, enemy: IEnemy): void;

    private destroy(enemy: IEnemy): void {
        this._destroy(enemy);

        this.isApplied = false;
        this.isDestroyed = true;
    }

    protected abstract _destroy(enemy: IEnemy): void;
}
