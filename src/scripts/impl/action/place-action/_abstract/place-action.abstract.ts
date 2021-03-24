import { IAction } from "../../../../api/action/action.interface";
import { IGameStateStore } from "../../../../api/game-state/game-state-store.interface";
import { ITurretGroup } from "../../../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../../../api/object/turret-object/turret-object.interface";
import { getTileValue } from "../../../utils/action.utils";
import { TILE_EMPTY } from "../../../utils/constants";

export abstract class PlaceAction<T extends ITurretObject & Phaser.GameObjects.Sprite = ITurretObject & Phaser.GameObjects.Sprite> implements IAction {
    public abstract actionKey: string;

    protected abstract group: ITurretGroup<T>; 

    private gameStateStore: IGameStateStore;

    constructor(gameStateStore: IGameStateStore) {
        this.gameStateStore = gameStateStore;
    }

    private isGoodTile(tile?: Phaser.Tilemaps.Tile) {
        return tile != null
            && getTileValue(this.gameStateStore, tile) == TILE_EMPTY
            && this.gameStateStore.getMoney() >= this.getPriceForTile(tile)
    }

    getPriceForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(tile != null && getTileValue(this.gameStateStore, tile) == TILE_EMPTY) {
            return this.group.getPrice();
        } else {
            return this.group.getPrice();
        }
    }

    getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(this.isGoodTile(tile)) {
            return 0x00FF00; //green
        } else {
            return 0xFF0000; //red
        }
    }
    
    turret?: T;
    onTileHover(tile?: Phaser.Tilemaps.Tile): void {
        if(this.isGoodTile(tile)) {
            if(this.turret == null) {
                this.turret = this.group.get();
            }

            this.turret.init(new Phaser.Math.Vector2(tile!.getCenterX(), tile!.getCenterY()), this.gameStateStore, true)
            this.turret.showRange();
        } else {
            this.turret?.remove()
        }
    }

    onTileClick(tile: Phaser.Tilemaps.Tile): void {
        if(tile != null && getTileValue(this.gameStateStore, tile) == TILE_EMPTY) {
            const price = this.getPriceForTile(tile);

            if(this.gameStateStore.getMoney() >= price) {
                const turret = this.group.get();
                if (turret) {
                    const pos = new Phaser.Math.Vector2(
                        tile.getCenterX(),
                        tile.getCenterY(),
                    );
                    turret.init(pos, this.gameStateStore);

                    this.gameStateStore.spendMoney(price);
                    this.gameStateStore.setTile(tile.y, tile.x, this.group.getTile());
                }
            }
        }
    }
}
