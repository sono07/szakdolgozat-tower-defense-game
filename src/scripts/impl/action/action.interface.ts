import { ITurretGroup } from "../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../api/object/turret-object/turret-object.interface";
import { GameStateStore } from "../game-state-store/game-state.store.class";
import { TurretBulletMk1Object } from "../object/turret/turret-bullet-mk1.object.class";
import { TurretBulletMk2Object } from "../object/turret/turret-bullet-mk2.object.class";
import { TurretBulletMk3Object } from "../object/turret/turret-bullet-mk3.object.class";
import { TurretEnergyBallBlueMk1Object } from "../object/turret/turret-energy-ball-blue-mk1.object.class";
import { TurretEnergyBallBlueMk2Object } from "../object/turret/turret-energy-ball-blue-mk2.object.class";
import { TurretEnergyBallBlueMk3Object } from "../object/turret/turret-energy-ball-blue-mk3.object.class";
import { TurretEnergyBallOrangeMk1Object } from "../object/turret/turret-energy-ball-orange-mk1.object.class";
import { TurretEnergyBallOrangeMk2Object } from "../object/turret/turret-energy-ball-orange-mk2.object.class";
import { TurretEnergyBallOrangeMk3Object } from "../object/turret/turret-energy-ball-orange-mk3.object.class";
import { TurretLaserMk1Object } from "../object/turret/turret-laser-mk1.object.class";
import { TurretLaserMk2Object } from "../object/turret/turret-laser-mk2.object.class";
import { TurretLaserMk3Object } from "../object/turret/turret-laser-mk3.object.class";
import { TurretRocketMk1Object } from "../object/turret/turret-rocket-mk1.object.class";
import { TurretRocketMk2Object } from "../object/turret/turret-rocket-mk2.object.class";
import { TurretRocketMk3Object } from "../object/turret/turret-rocket-mk3.object.class";
import { CRATERS_CLEAR_COST, REMOVE_PRICE_MULTIPLIER, TREES_CLEAR_COST } from "../utils/config.constants";
import { ACTION_KEY_PLACE_TURRET_BULLET_MK1, ACTION_KEY_PLACE_TURRET_BULLET_MK2, ACTION_KEY_PLACE_TURRET_BULLET_MK3, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK1, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK2, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK3, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK1, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK2, ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3, ACTION_KEY_PLACE_TURRET_LASER_MK1, ACTION_KEY_PLACE_TURRET_LASER_MK2, ACTION_KEY_PLACE_TURRET_LASER_MK3, ACTION_KEY_PLACE_TURRET_ROCKET_MK1, ACTION_KEY_PLACE_TURRET_ROCKET_MK2, ACTION_KEY_PLACE_TURRET_ROCKET_MK3, ACTION_KEY_REMOVE, ACTION_KEY_SELECT, TILE_CRATERS, TILE_EMPTY, TILE_TREES } from "../utils/constants";

export interface IAction {
    actionKey: string;
	getPriceForTile(tile?: Phaser.Tilemaps.Tile): number;
	getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number;
    onTileHover(tile?: Phaser.Tilemaps.Tile) : void;
	onTileClick(tile: Phaser.Tilemaps.Tile) : void;
}

const isTurretTile = (v: number): boolean => {
    return v >= 10;
}

const isRemovableTile = (v: number): boolean => {
    return isTurretTile(v) || v == TILE_TREES || v == TILE_CRATERS;
}

const getTileValue = (gameStateStore: GameStateStore, tile: Phaser.Tilemaps.Tile) : number => {
    return Math.floor(gameStateStore.getMap()[tile.y][tile.x]);
}

export class SelectAction implements IAction {
    public actionKey = ACTION_KEY_SELECT;

    private gameStateStore: GameStateStore;

    constructor(gameStateStore: GameStateStore) {
        this.gameStateStore = gameStateStore;
    }


    getPriceForTile(tile?: Phaser.Tilemaps.Tile): number {
        return 0;
    }

    getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(tile != null && isTurretTile(getTileValue(this.gameStateStore, tile))) {
            return 0xFFFF00; //yellow
        } else {
            return 0xFFFFFF; //white
        }
    }

    onTileHover(tile?: Phaser.Tilemaps.Tile): void {
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

    onTileClick(tile: Phaser.Tilemaps.Tile): void {
        //currently do nothing
    }
}

export class RemoveAction implements IAction {
    public actionKey = ACTION_KEY_REMOVE;

    private gameStateStore: GameStateStore;

    constructor(gameStateStore: GameStateStore) {
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

    getPriceForTile(tile?: Phaser.Tilemaps.Tile): number {
        const {price} = this.getPriceAndGroupForTile(tile);

        return price;
    }

    getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number {
        if(tile != null
            && isRemovableTile(getTileValue(this.gameStateStore, tile))
            && this.gameStateStore.getMoney() >= this.getPriceAndGroupForTile(tile).price
        ) {
            return 0x00FF00; //green
        } else {
            return 0xFF0000; //red
        }
    }

    onTileHover(tile?: Phaser.Tilemaps.Tile): void {
        //do nothing
    }

    onTileClick(tile: Phaser.Tilemaps.Tile): void {
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

abstract class PlaceAction<T extends ITurretObject & Phaser.GameObjects.Sprite> implements IAction {
    public abstract actionKey: string;

    protected abstract group: ITurretGroup<T>; 

    private gameStateStore: GameStateStore;

    constructor(gameStateStore: GameStateStore) {
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

//bullet

export class PlaceTurretBulletMk1Action extends PlaceAction<TurretBulletMk1Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK1;

    protected group: ITurretGroup<TurretBulletMk1Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretBulletMk1sGroup
    }
}

export class PlaceTurretBulletMk2Action extends PlaceAction<TurretBulletMk2Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK2;

    protected group: ITurretGroup<TurretBulletMk2Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretBulletMk2sGroup
    }
}

export class PlaceTurretBulletMk3Action extends PlaceAction<TurretBulletMk3Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_BULLET_MK3;

    protected group: ITurretGroup<TurretBulletMk3Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretBulletMk3sGroup
    }
}

//energy ball blue

export class PlaceTurretEnergyBallBlueMk1Action extends PlaceAction<TurretEnergyBallBlueMk1Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK1;

    protected group: ITurretGroup<TurretEnergyBallBlueMk1Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallBlueMk1sGroup
    }
}

export class PlaceTurretEnergyBallBlueMk2Action extends PlaceAction<TurretEnergyBallBlueMk2Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK2;

    protected group: ITurretGroup<TurretEnergyBallBlueMk2Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallBlueMk2sGroup
    }
}

export class PlaceTurretEnergyBallBlueMk3Action extends PlaceAction<TurretEnergyBallBlueMk3Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_BLUE_MK3;

    protected group: ITurretGroup<TurretEnergyBallBlueMk3Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallBlueMk3sGroup
    }
}

//energy ball orange

export class PlaceTurretEnergyBallOrangeMk1Action extends PlaceAction<TurretEnergyBallOrangeMk1Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK1;

    protected group: ITurretGroup<TurretEnergyBallOrangeMk1Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallOrangeMk1sGroup
    }
}

export class PlaceTurretEnergyBallOrangeMk2Action extends PlaceAction<TurretEnergyBallOrangeMk2Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK2;

    protected group: ITurretGroup<TurretEnergyBallOrangeMk2Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallOrangeMk2sGroup
    }
}

export class PlaceTurretEnergyBallOrangeMk3Action extends PlaceAction<TurretEnergyBallOrangeMk3Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3;

    protected group: ITurretGroup<TurretEnergyBallOrangeMk3Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretEnergyBallOrangeMk3sGroup
    }
}

//laser

export class PlaceTurretLaserMk1Action extends PlaceAction<TurretLaserMk1Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK1;

    protected group: ITurretGroup<TurretLaserMk1Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretLaserMk1sGroup
    }
}

export class PlaceTurretLaserMk2Action extends PlaceAction<TurretLaserMk2Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK2;

    protected group: ITurretGroup<TurretLaserMk2Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretLaserMk2sGroup
    }
}

export class PlaceTurretLaserMk3Action extends PlaceAction<TurretLaserMk3Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_LASER_MK3;

    protected group: ITurretGroup<TurretLaserMk3Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretLaserMk3sGroup
    }
}

//rocket

export class PlaceTurretRocketMk1Action extends PlaceAction<TurretRocketMk1Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ROCKET_MK1;

    protected group: ITurretGroup<TurretRocketMk1Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretRocketMk1sGroup
    }
}

export class PlaceTurretRocketMk2Action extends PlaceAction<TurretRocketMk2Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ROCKET_MK2;

    protected group: ITurretGroup<TurretRocketMk2Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretRocketMk2sGroup
    }
}

export class PlaceTurretRocketMk3Action extends PlaceAction<TurretRocketMk3Object> implements IAction {
    public actionKey = ACTION_KEY_PLACE_TURRET_ROCKET_MK3;

    protected group: ITurretGroup<TurretRocketMk3Object>;

    constructor(gameStateStore: GameStateStore) {
        super(gameStateStore);
        this.group = gameStateStore.turretRocketMk3sGroup
    }
}

