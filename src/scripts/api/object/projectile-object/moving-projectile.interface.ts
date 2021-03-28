import { IEffect } from "../../effect/effect.interface";
import { IEnemy } from "../enemy-object/enemy.interface";
import { IProjectile } from "./projectile.interface";

export interface IMovingProjectile extends IProjectile {
    init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
    }): void;
}
