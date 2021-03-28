import { IAction } from "../../../api/action/action.interface";
import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_LASER_MK2 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretLaserMk2Action extends PlaceAction implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK2;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretLaserMk2sGroup);
    }
}
