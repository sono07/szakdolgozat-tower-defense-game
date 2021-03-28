import { IAction } from "../../../api/action/action.interface";
import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_BULLET_MK2 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretBulletMk2Action extends PlaceAction implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK2;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretBulletMk2sGroup);
    }
}
