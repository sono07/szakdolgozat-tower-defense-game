import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { BaseEffect } from "../../_abstract/base-effect.abstract";

export abstract class BaseInstantEffect extends BaseEffect {
    protected totalDurationMs: number;

    constructor() {
        super();

        this.totalDurationMs = 0;
    }

    protected _update(time: number, delta: number, enemy: IEnemy): void {
        //do nothing
    }

    protected _destroy(enemy: IEnemy): void {
        //do nothing
    }
}
