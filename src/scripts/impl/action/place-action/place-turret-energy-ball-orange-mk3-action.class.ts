import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3 } from "../../game-constants";
import { PlaceAction } from "./__abstract__/place-action.abstract";

export class PlaceTurretEnergyBallOrangeMk3Action extends PlaceAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretEnergyBallOrangeMk3sGroup);
    }
}
