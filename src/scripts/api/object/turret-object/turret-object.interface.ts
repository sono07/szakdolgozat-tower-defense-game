import { GameStateStore } from "../../../impl/game-state-store/game-state.store.class";
import { IObject } from "../object.interface";

export interface ITurretObject extends IObject {
    ignoreUpdate: boolean;

    init(position: Phaser.Math.Vector2, gameStateStore: GameStateStore, ignoreUpdate?: boolean): void;
    showRange(): void;
    hideRange(): void;
}
