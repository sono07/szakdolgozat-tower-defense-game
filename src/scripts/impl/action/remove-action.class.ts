import { IAction } from "../../api/action/action.interface";
import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { ITurretGroup } from "../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../api/object/turret-object/turret-object.interface";
import { getTileValue, isRemovableTile } from "../utils/action.utils";
import { CRATERS_CLEAR_COST, REMOVE_PRICE_MULTIPLIER, TREES_CLEAR_COST } from "../utils/config.constants";
import { ACTION_KEY_REMOVE, TILE_CRATERS, TILE_EMPTY, TILE_TREES } from "../utils/constants";

export class RemoveAction implements IAction {
    public actionKey = ACTION_KEY_REMOVE;

    private gameStateStore: IGameStateStore;

    constructor(gameStateStore: IGameStateStore) {
        this.gameStateStore = gameStateStore;
    }

    private getGroupFor(tv: number) {
        for(const tg of this.gameStateStore.getAllTurretGroups()) {
            if(tg.getTile() == tv) return tg;
        }

        return undefined;
    }

    private getPriceAndGroupForTile(tile?: Phaser.Tilemaps.Tile): {price: number, group?: ITurretGroup<ITurretObject & Phaser.GameObjects.Sprite>} {
        if(tile == null ) {
            return {
                price: 0,
            }
        } else {
            const tv = getTileValue(this.gameStateStore, tile)
            
            if(!isRemovableTile(tv)) {
                return {
                    price: 0,
                }
            } else {
                switch(tv) {
                    case TILE_TREES: return {
                        price: TREES_CLEAR_COST,
                    }
                    case TILE_CRATERS: return {
                        price: CRATERS_CLEAR_COST
                    }
                    default: {
                        const group = this.getGroupFor(tv);
                        return {
                            price: group != null ? group.getPrice() * (-1) * REMOVE_PRICE_MULTIPLIER : 0,
                            group: group,
                        }
                    }
                }
            }
        }
    }

    public getPriceForTile(tile?: Phaser.Tilemaps.Tile): number {
        const {price} = this.getPriceAndGroupForTile(tile);

        return price;
    }

    public getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(tile != null
            && isRemovableTile(getTileValue(this.gameStateStore, tile))
            && this.gameStateStore.getMoney() >= this.getPriceAndGroupForTile(tile).price
        ) {
            return 0x00FF00; //green
        } else {
            return 0xFF0000; //red
        }
    }

    public onTileHover(tile?: Phaser.Tilemaps.Tile): void {
        //do nothing
    }

    public onTileClick(tile: Phaser.Tilemaps.Tile): void {
        if(tile != null && isRemovableTile(getTileValue(this.gameStateStore, tile))) {
            const {price, group} = this.getPriceAndGroupForTile(tile);

            if(this.gameStateStore.getMoney() >= price) {
                this.gameStateStore.setTile(tile.y, tile.x, TILE_EMPTY);

                group?.getChildren().forEach(turret => {
                    if(turret.active
                        && turret.visible
                        && turret.position.x == tile.getCenterX()
                        && turret.position.y == tile.getCenterY()
                    ) {
                        turret.remove();
                    }
                })
                this.gameStateStore.spendMoney(price);
            }
        }
    }
}
