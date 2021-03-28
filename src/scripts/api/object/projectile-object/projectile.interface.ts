import { IEffect } from "../../effect/effect.interface";
import { IEnemy } from "../enemy-object/enemy.interface";
import { IObject } from "../object.interface";

export interface IProjectile extends IObject {
    init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        effects: IEffect[],
        targets: IEnemy[],
    }): void;
}
