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

    protected init(enemy: IEnemy): void {
        super.init(enemy, (enemy) => {
            enemy.health -= this.flatAmount;
        })
    }

    public copy(o: this): this {
        this.flatAmount = o.flatAmount;
        super.copy(o);

        return this;
    }
}
