import { ICloneable } from "../common/cloneable.interface";
import { IEnemy } from "../object/enemy-object/enemy.interface";

export interface IEffect extends ICloneable {
    readonly isDestroyed: boolean;

    update(time: number, delta: number, enemy: IEnemy): void;
}
