import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_ROCKET_MK3 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretRocketMk3Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ROCKET_MK3;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretRocketMk3sGroup);
    }
}
