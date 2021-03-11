import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { BaseCloneable } from "../../common/cloneable.abstract";

export abstract class BaseEffect extends BaseCloneable implements IEffect {
    protected abstract totalDurationMs: number;
    protected elapsedDurationMs: number;
    protected isApplied: boolean;
    isDestroyed: boolean;

    constructor() {
        super();

        this.elapsedDurationMs = 0;
        this.isApplied = false;
        this.isDestroyed = false;
    }

    protected init(enemy: IEnemy): void {
        this._beforeInit(enemy);
        this._init(enemy);
        this._afterInit(enemy);
    }

    protected _beforeInit(enemy: IEnemy): void {
        this.isApplied = true;
        this.isDestroyed = false;
    }

    protected abstract _init(enemy: IEnemy): void;

    protected _afterInit(enemy: IEnemy): void {}

    update(time: number, delta: number, enemy: IEnemy): void {
        this._beforeUpdate(time, delta, enemy);

        this._update(time, delta, enemy);

        this._afterUpdate(time, delta, enemy); 
    }

    protected _beforeUpdate(time: number, delta: number, enemy: IEnemy): void {
        if(!this.isApplied) {
            this.init(enemy);
        }  
    }

    protected abstract _update(time: number, delta: number, enemy: IEnemy): void;

    protected _afterUpdate(time: number, delta: number, enemy: IEnemy): void {
        this.elapsedDurationMs += delta;

        if (this.elapsedDurationMs >= this.totalDurationMs) {
            this.remove(enemy);
        } 
    }

    protected remove(enemy: IEnemy): void {
        this._beforeRemove(enemy);
        this._remove(enemy);
        this._afterRemove(enemy);
    }

    protected _beforeRemove(enemy: IEnemy): void {}

    protected abstract _remove(enemy: IEnemy): void;

    protected _afterRemove(enemy: IEnemy): void {
        this.isApplied = false;
        this.isDestroyed = true;
    }

    copy(o: this): this {
        this.isDestroyed = o.isDestroyed;
        this.isApplied = o.isApplied;
        this.elapsedDurationMs = o.elapsedDurationMs;

        return this;
    }
}
