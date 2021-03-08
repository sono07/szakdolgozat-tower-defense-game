import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseActiveEffect } from "./_abstract/active-effect.abstract";

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

    protected _create(enemy: IEnemy): void {
        enemy.speed -= this.flatAmount; //TODO can be negative! 
    }

    protected _update(time: number, delta: number, enemy: IEnemy): void {
        //do nothing
    }

    protected _destroy(enemy: IEnemy): void {
        enemy.speed += this.flatAmount;
    }
}
