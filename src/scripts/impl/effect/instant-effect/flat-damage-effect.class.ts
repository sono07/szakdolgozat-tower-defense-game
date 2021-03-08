import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseInstantEffect } from "./_abstract/instant-effect.abstract";

export class FlatDamageEffect extends BaseInstantEffect {
    private flatAmount: number;

    /**
     * @param flatAmount : the flat ammount to be applied
     */
    constructor(flatAmount: number) {
        super();

        this.flatAmount = flatAmount;
    }

    protected _create(enemy: IEnemy): void {
        enemy.health -= this.flatAmount;
    }
}
