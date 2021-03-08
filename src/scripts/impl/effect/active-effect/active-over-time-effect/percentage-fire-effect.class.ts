import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { BaseActiveOverTimeEffect } from "./_abstract/active-over-time-effect.abstract";

export class PercentageFireEffect extends BaseActiveOverTimeEffect {
    private percentageAmount: number;

    /**
     * @param totalDurationMs : how long should the effect take
     * @param times : how many times should the effect applied during its lifetime
     * @param percentageAmount : the percentage ammount to be applied each times
     */
    constructor(totalDurationMs: number, times: number, percentageAmount: number) {
        super(totalDurationMs, times);

        if (percentageAmount < 0 || percentageAmount > 1) throw new Error("Error: percentageAmount must be between 0 and 1");
        this.percentageAmount = percentageAmount;
    }

    protected tick(enemy: IEnemy) {
        enemy.health *= (1 - this.percentageAmount);
    }
}
