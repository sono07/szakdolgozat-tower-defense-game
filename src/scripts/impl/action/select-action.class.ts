import { Phaser } from '../../api/__helper__/phaser.export';
import { IAction } from "../../api/action/action.interface";
import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { getTileValue, isTurretTile } from "../utils/action.utils";
import { ACTION_KEY_SELECT } from "../utils/constants";

export class SelectAction implements IAction {
    public actionKey = ACTION_KEY_SELECT;

    private gameStateStore: IGameStateStore;

    constructor(gameStateStore: IGameStateStore) {
        this.gameStateStore = gameStateStore;
    }


    public getPriceForTile(tile?: Phaser.Tilemaps.Tile): number {
        return 0;
    }

    public getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(tile != null && isTurretTile(getTileValue(this.gameStateStore, tile))) {
            return 0xFFFF00; //yellow
        } else {
            return 0xFFFFFF; //white
        }
    }

    public onTileHover(tile?: Phaser.Tilemaps.Tile): void {
        const tGroups = this.gameStateStore.getAllTurretGroups();

        const posX = tile != null ? tile.getCenterX() : undefined;
        const posY = tile != null ? tile.getCenterY() : undefined;
        tGroups.forEach(group => {
            group?.getChildren().forEach(turret => {
                if(turret.active
                    && turret.visible
                    && turret.position.x == posX
                    && turret.position.y == posY
                ) {
                    turret.showRange();
                } else {
                    turret.hideRange();
                }
            })
        })
    }

    public onTileClick(tile: Phaser.Tilemaps.Tile): void {
        //currently do nothing
    }
}
