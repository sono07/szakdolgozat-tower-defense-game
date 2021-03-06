import { Phaser } from "../../__helper__/phaser.export";
import { IEffect } from "../../effect/effect.interface";
import { IEnemy } from "../enemy-object/enemy.interface";
import { IMovingProjectile } from "./moving-projectile.interface";

export interface IPenetratingMovingProjectile extends IMovingProjectile {
    init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        speed: number
        effects: IEffect[],
        targets: IEnemy[],
        penetrationCount: number,
    }): void;
}
