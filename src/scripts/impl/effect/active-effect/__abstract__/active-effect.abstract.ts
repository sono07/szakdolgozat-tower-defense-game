import { BaseEffect } from "../../__abstract__/base-effect.abstract";

export abstract class BaseActiveEffect extends BaseEffect {
    protected totalDurationMs: number;

    constructor(totalDurationMs: number) {
        super();

        this.totalDurationMs = totalDurationMs;
    }

    public copy(o: this): this {
        this.totalDurationMs = o.totalDurationMs;
        super.copy(o);

        return this;
    }
}
