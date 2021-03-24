import { IGameStateStore } from "../../game-state/game-state-store.interface";
import { IObject } from "../object.interface";

export interface ITurretObject extends IObject {
    ignoreUpdate: boolean;

    init(position: Phaser.Math.Vector2, gameStateStore: IGameStateStore, ignoreUpdate?: boolean): void;
    showRange(): void;
    hideRange(): void;
}
