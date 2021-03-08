import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseActiveEffect } from "./_abstract/active-effect.abstract";

export class PercentageSlowEffect extends BaseActiveEffect {
    private percentageAmount: number; //must be between 0 and 1
    private flatAmount: number;

    /**
     * @param totalDurationMs : how long should the effect take
     * @param percentageAmount : the percentage ammount to be applied
     */
    constructor(totalDurationMs: number, percentageAmount: number) {
        super(totalDurationMs);

        if (percentageAmount < 0 || percentageAmount > 1) throw new Error("Error: percentageAmount must be between 0 and 1");
        this.percentageAmount = percentageAmount;
        this.flatAmount = 0;
    }

    protected _create(enemy: IEnemy): void {
        this.flatAmount = enemy.speed * this.percentageAmount;

        enemy.speed -= this.flatAmount;
    }

    protected _update(time: number, delta: number, enemy: IEnemy): void {
        //do nothing
    }

    protected _destroy(enemy: IEnemy): void {
        enemy.speed += this.flatAmount;
    }
}
