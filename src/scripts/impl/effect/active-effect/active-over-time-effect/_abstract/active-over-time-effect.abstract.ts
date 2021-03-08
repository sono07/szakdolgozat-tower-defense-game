import { IEnemy } from "../../../../../api/object/enemy-object/enemy.interface";
import { BaseActiveEffect } from "../../_abstract/active-effect.abstract";

export abstract class BaseActiveOverTimeEffect extends BaseActiveEffect {
    private times: number;
    private tickCount: number;

    constructor(totalDurationMs: number, times: number) {
        super(totalDurationMs);

        this.times = times;
        this.tickCount = 0;
    }

    protected _create(enemy: IEnemy): void {
        //do nothing
    }

    protected _update(time: number, delta: number, enemy: IEnemy) {
        const tickLenghtMs = this.totalDurationMs / this.times;
        const totalElapsedDurationMs = this.elapsedDurationMs + delta;
        const correctedElapsedDurationMs = Math.min(totalElapsedDurationMs, this.totalDurationMs);
        const elapsedDurationSinceLastTick = correctedElapsedDurationMs - this.tickCount * tickLenghtMs;

        const timesToTickNow = Math.floor(elapsedDurationSinceLastTick / tickLenghtMs);
        for (let i = 0; i < timesToTickNow; i++) {
            this.tick(enemy);
            this.tickCount++;
        }
    }

    protected abstract tick(enemy: IEnemy): void;

    protected _destroy(enemy: IEnemy): void {
        //do nothing
    }
}
