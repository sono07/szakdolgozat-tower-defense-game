import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { MINIMUM_TURRET_TILE_VALUE, TILE_CRATERS, TILE_TREES } from "./constants";

export const isTurretTile = (v: number): boolean => {
    return v >= MINIMUM_TURRET_TILE_VALUE;
}

export const isRemovableTile = (v: number): boolean => {
    return isTurretTile(v) || v == TILE_TREES || v == TILE_CRATERS;
}

export const getTileValue = (gameStateStore: IGameStateStore, tile: Phaser.Tilemaps.Tile) : number => {
    return Math.floor(gameStateStore.getMap()[tile.y][tile.x]);
}