import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_LASER_MK1 } from "../../game-constants";
import { PlaceAction } from "./__abstract__/place-action.abstract";

export class PlaceTurretLaserMk1Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK1;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretLaserMk1sGroup);
    }
}
