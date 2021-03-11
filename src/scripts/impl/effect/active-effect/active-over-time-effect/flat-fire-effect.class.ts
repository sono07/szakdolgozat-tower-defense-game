import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { BaseActiveOverTimeEffect } from "./_abstract/active-over-time-effect.abstract";

export class FlatFireEffect extends BaseActiveOverTimeEffect {
    private flatAmount: number;

    /**
     * @param totalDurationMs : how long should the effect take
     * @param times : how many times should the effect applied during its lifetime
     * @param flatAmount : the flat ammount to be applied each times
     */
    constructor(totalDurationMs: number, times: number, flatAmount: number) {
        super(totalDurationMs, times);

        this.flatAmount = flatAmount;
    }

    protected tick(enemy: IEnemy) {
        enemy.health -= this.flatAmount;
    }

    copy(o: this): this {
        this.flatAmount = o.flatAmount;
        super.copy(o);

        return this;
    }
}
