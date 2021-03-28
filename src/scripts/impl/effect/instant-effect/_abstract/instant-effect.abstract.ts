import { BaseEffect } from "../../_abstract/base-effect.abstract";

export abstract class BaseInstantEffect extends BaseEffect {
    protected totalDurationMs: number;

    constructor() {
        super();

        this.totalDurationMs = 0;
    }

    public copy(o: this): this {
        this.totalDurationMs = o.totalDurationMs;
        super.copy(o);

        return this;
    }
}
