import { IAction } from "../../../api/action/action.interface";
import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK1 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretEnergyBallOrangeMk1Action extends PlaceAction implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK1;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore, gameStateStore.turretEnergyBallOrangeMk1sGroup);
    }
}
