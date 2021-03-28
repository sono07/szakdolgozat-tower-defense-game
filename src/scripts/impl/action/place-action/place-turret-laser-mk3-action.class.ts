import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_LASER_MK3 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretLaserMk3Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK3;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretLaserMk3sGroup);
    }
}
