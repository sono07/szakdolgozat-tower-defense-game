import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_ROCKET_MK2 } from "../../game-constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretRocketMk2Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ROCKET_MK2;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretRocketMk2sGroup);
    }
}
