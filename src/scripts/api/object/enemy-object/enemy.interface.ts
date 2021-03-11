import { IEffect } from "../../effect/effect.interface";
import { IObject } from "../object.interface";

export interface IEnemy extends IObject {
    health: number;
    speed: number;
    path: Phaser.Curves.Path;
    effects: IEffect[];
    // damage: number;

    init(health: number, speed: number, path: Phaser.Curves.Path): void;
}
