import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_BULLET_MK2 } from "../../game-constants";
import { PlaceAction } from "./__abstract__/place-action.abstract";

export class PlaceTurretBulletMk2Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK2;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretBulletMk2sGroup);
    }
}
