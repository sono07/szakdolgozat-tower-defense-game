import { Phaser } from "../../api/__helper__/phaser.export";
import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { TILE_CRATERS, TILE_TREES, TURRET_TILE_VALUE_LOWER_LIMIT } from "../game-constants";

export const isTurretTile = (v: number): boolean => {
    return Math.floor(v) > TURRET_TILE_VALUE_LOWER_LIMIT;
}

export const isRemovableTile = (v: number): boolean => {
    const value = Math.floor(v);
    return isTurretTile(value) || value == TILE_TREES || value == TILE_CRATERS;
}

export const getTileValue = (gameStateStore: IGameStateStore, tile: Phaser.Tilemaps.Tile) : number => {
    return Math.floor(gameStateStore.getMap()[tile.y][tile.x]);
}