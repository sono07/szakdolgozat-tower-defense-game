import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_LASER_MK2 } from "../../game-constants";
import { PlaceAction } from "./__abstract__/place-action.abstract";

export class PlaceTurretLaserMk2Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK2;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretLaserMk2sGroup);
    }
}
