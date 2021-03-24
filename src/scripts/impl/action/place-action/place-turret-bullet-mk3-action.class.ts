import { IAction } from "../../../api/action/action.interface";
import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { ITurretGroup } from "../../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../../api/object/turret-object/turret-object.interface";
import { ACTION_KEY_PLACE_TURRET_BULLET_MK3 } from "../../utils/constants";
import { PlaceAction } from "./_abstract/place-action.abstract";

export class PlaceTurretBulletMk3Action extends PlaceAction implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK3;

    protected group: ITurretGroup<ITurretObject & Phaser.GameObjects.Sprite>;

    constructor(gameStateStore: IGameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretBulletMk3sGroup as any;
    }
}
