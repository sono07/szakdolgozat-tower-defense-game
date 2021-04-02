import { Phaser } from "../../__helper__/phaser.export";
import { IEffect } from "../../effect/effect.interface";
import { IGameStateStore } from "../../game-state/game-state-store.interface";
import { IObject } from "../object.interface";

export interface IEnemy extends IObject {
    health: number;
    speed: number;
    path: Phaser.Curves.Path;
    pathT: number;
    effects: IEffect[];

    init(params: {
        health: number,
        speed: number,
        path: Phaser.Curves.Path,
        gameStateStore: IGameStateStore,
    }): void;

    addEffect(effect: IEffect): void;
}
