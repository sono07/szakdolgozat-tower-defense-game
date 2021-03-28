import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseInstantEffect } from "./_abstract/instant-effect.abstract";

export class PercentageDamageEffect extends BaseInstantEffect {
    private percentageAmount: number;

    /**
     * @param percentageAmount : the percentage ammount to be applied
     */
    constructor(percentageAmount: number) {
        super();

        if (percentageAmount < 0 || percentageAmount > 1) throw new Error("Error: percentageAmount must be between 0 and 1");
        this.percentageAmount = percentageAmount;
    }

    protected init(enemy: IEnemy): void {
        super.init(enemy, (enemy) => {
            enemy.health *= (1 - this.percentageAmount);
        })
    }

    public copy(o: this): this {
        this.percentageAmount = o.percentageAmount;
        super.copy(o);

        return this;
    }
}
