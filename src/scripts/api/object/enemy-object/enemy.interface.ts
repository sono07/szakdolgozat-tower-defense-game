import { IEffect } from "../../effect/effect.interface";
import { IObject } from "../object.interface";

export interface IEnemy extends IObject {
    // readonly discriminator: "ENEMY";
    health: number;
    speed: number;
    path: Phaser.Curves.Path;
    effects: IEffect[];
    // damage: number;

    create(health: number, speed: number, path: Phaser.Curves.Path): void;
}
