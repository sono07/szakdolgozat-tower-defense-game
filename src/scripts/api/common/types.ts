import { Phaser } from "../__helper__/phaser.export";
import { IGroup } from "../group/group.interface";
import { IEnemy } from "../object/enemy-object/enemy.interface";

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
export type Map<N> = { [key: string] : N }

export type EnemyDescription = {
    group: IGroup<Phaser.GameObjects.Sprite & IEnemy>,
    health: number,
    speed: number,
}

export type EnemyWithDistance = IEnemy & {
    _d: number
}

export type WindowSizes = {
    width: number,
    height: number,
    tileWidth: number,
    tileHeight: number,
}
