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

    protected _remove(): void {
        //do nothing
    }

    copy(o: this): this {
        this.totalDurationMs = o.totalDurationMs;
        super.copy(o);

        return this;
    }
}
