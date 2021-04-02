import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_BULLET_MK3 } from "../../game-constants";
import { PlaceAction } from "./__abstract__/place-action.abstract";

export class PlaceTurretBulletMk3Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK3;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretBulletMk3sGroup);
    }
}
