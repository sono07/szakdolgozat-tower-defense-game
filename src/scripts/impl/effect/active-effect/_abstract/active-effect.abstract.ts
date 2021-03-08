import { BaseEffect } from "../../_abstract/base-effect.abstract";

export abstract class BaseActiveEffect extends BaseEffect {
    protected totalDurationMs: number;

    constructor(totalDurationMs: number) {
        super();

        this.totalDurationMs = totalDurationMs;
    }
}
