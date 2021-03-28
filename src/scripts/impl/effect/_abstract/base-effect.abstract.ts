import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseCloneable } from "../../common/cloneable.abstract";

export abstract class BaseEffect extends BaseCloneable implements IEffect {
    protected abstract totalDurationMs: number;
    protected elapsedDurationMs: number;
    protected isApplied: boolean;
    public isDestroyed: boolean;

    constructor() {
        super();

        this.elapsedDurationMs = 0;
        this.isApplied = false;
        this.isDestroyed = false;
    }

    protected init(enemy: IEnemy, cb?:((enemy: IEnemy) => void)): void {
        this.isApplied = true;
        this.isDestroyed = false;

        if(cb) cb(enemy);
    }

    public update(time: number, delta: number, enemy: IEnemy, cb?: IEffect['update']): void {
        if(!this.isApplied) {
            this.init(enemy);
        }

        if(cb) cb(time, delta, enemy);

        this.elapsedDurationMs += delta;
        if (this.elapsedDurationMs >= this.totalDurationMs) {
            this.remove(enemy);
        }
    }

    protected remove(enemy: IEnemy, cb?:((enemy: IEnemy) => void)): void {
        if(cb) cb(enemy);

        this.isApplied = false;
        this.isDestroyed = true;
    }

    public copy(o: this): this {
        this.isDestroyed = o.isDestroyed;
        this.isApplied = o.isApplied;
        this.elapsedDurationMs = o.elapsedDurationMs;

        return this;
    }
}
