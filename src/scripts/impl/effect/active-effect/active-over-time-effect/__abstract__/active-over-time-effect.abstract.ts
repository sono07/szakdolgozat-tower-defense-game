import { IEnemy } from "../../../../../api/object/enemy-object/enemy.interface";
import { BaseActiveEffect } from "../../__abstract__/active-effect.abstract";

export abstract class BaseActiveOverTimeEffect extends BaseActiveEffect {
    private times: number;
    private tickCount: number;

    constructor(totalDurationMs: number, times: number) {
        super(totalDurationMs);

        this.times = times;
        this.tickCount = 0;
    }

    public update(time: number, delta: number, enemy: IEnemy) {
        super.update(time, delta, enemy, (time, delta, enemy) => {
            const tickLenghtMs = this.totalDurationMs / this.times;
            const totalElapsedDurationMs = this.elapsedDurationMs + delta;
            const correctedElapsedDurationMs = Math.min(totalElapsedDurationMs, this.totalDurationMs);
            const elapsedDurationSinceLastTick = correctedElapsedDurationMs - this.tickCount * tickLenghtMs;
    
            const timesToTickNow = Math.floor(elapsedDurationSinceLastTick / tickLenghtMs);
            for (let i = 0; i < timesToTickNow; i++) {
                this.tick(enemy);
                this.tickCount++;
            }
        })
    }

    protected abstract tick(enemy: IEnemy): void;

    public copy(o: this): this {
        this.times = o.times;
        this.tickCount = o.tickCount;
        super.copy(o);

        return this;
    }
}
