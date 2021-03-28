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

    protected init(enemy: IEnemy): void {
        super.init(enemy, (enemy) => {
            this.flatAmount = enemy.speed * this.percentageAmount;
            enemy.speed -= this.flatAmount;
        })
    }

    protected remove(enemy: IEnemy): void {
        super.remove(enemy, (enemy) => {
            enemy.speed += this.flatAmount;
        })
    }

    public copy(o: this): this {
        this.percentageAmount = o.percentageAmount;
        this.flatAmount = o.flatAmount;
        super.copy(o);

        return this;
    }
}
