import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseActiveEffect } from "./__abstract__/active-effect.abstract";

export class FlatSlowEffect extends BaseActiveEffect {
    private flatAmount: number;

    /**
     * @param totalDurationMs : how long should the effect take
     * @param flatAmount : the flat ammount to be applied
     */
    constructor(totalDurationMs: number, flatAmount: number) {
        super(totalDurationMs);
        this.flatAmount = flatAmount;
    }

    protected init(enemy: IEnemy): void {
        super.init(enemy, (enemy) => {
            enemy.speed -= this.flatAmount;
        })
    }

    protected remove(enemy: IEnemy): void {
        super.remove(enemy, (enemy) => {
            enemy.speed += this.flatAmount;
        })
    }

    public copy(o: this): this {
        this.flatAmount = o.flatAmount;
        super.copy(o);

        return this;
    }
}
