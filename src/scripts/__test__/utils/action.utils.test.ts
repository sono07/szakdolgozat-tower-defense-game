import { Phaser } from '../../api/__helper__/phaser.export';
import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { getTileValue, isRemovableTile, isTurretTile } from "../../impl/utils/action.utils";
import { ROTATION_180, ROTATION_270, ROTATION_90, ROTATION_ZERO, TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_TREES, TILE_TURRET_BULLET_MK1, TILE_TURRET_BULLET_MK2, TILE_TURRET_BULLET_MK3, TILE_TURRET_ENERGY_BALL_BLUE_MK1, TILE_TURRET_ENERGY_BALL_BLUE_MK2, TILE_TURRET_ENERGY_BALL_BLUE_MK3, TILE_TURRET_ENERGY_BALL_ORANGE_MK1, TILE_TURRET_ENERGY_BALL_ORANGE_MK2, TILE_TURRET_ENERGY_BALL_ORANGE_MK3, TILE_TURRET_LASER_MK1, TILE_TURRET_LASER_MK2, TILE_TURRET_LASER_MK3, TILE_TURRET_ROCKET_MK1, TILE_TURRET_ROCKET_MK2, TILE_TURRET_ROCKET_MK3, TURRET_TILE_VALUE_LOWER_LIMIT } from "../../impl/game-constants";

test('Test isTurretTile', () => {
    [ROTATION_ZERO, ROTATION_90, ROTATION_180, ROTATION_270].forEach(rotation => {
        expect(isTurretTile(TILE_EMPTY + rotation)).toBe(false)
        expect(isTurretTile(TILE_CRATERS + rotation)).toBe(false)
        expect(isTurretTile(TILE_TREES + rotation)).toBe(false)
        expect(isTurretTile(TILE_ROAD_2WAY_STRAIGHT + rotation)).toBe(false)
        expect(isTurretTile(TILE_ROAD_2WAY_CORNER + rotation)).toBe(false)
        expect(isTurretTile(TILE_ROAD_3WAY + rotation)).toBe(false)
        expect(isTurretTile(TILE_ROAD_4WAY + rotation)).toBe(false)
        expect(isTurretTile(TILE_TURRET_BULLET_MK1 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_BULLET_MK2 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_BULLET_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_BLUE_MK1 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_BLUE_MK2 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_BLUE_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK1 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK2 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_LASER_MK1 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_LASER_MK2 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_LASER_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ROCKET_MK1 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ROCKET_MK2 + rotation)).toBe(true)
        expect(isTurretTile(TILE_TURRET_ROCKET_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TURRET_TILE_VALUE_LOWER_LIMIT + rotation)).toBe(false)
    })
})

test('Test isRemovableTile', () => {
    [ROTATION_ZERO, ROTATION_90, ROTATION_180, ROTATION_270].forEach(rotation => {
        expect(isRemovableTile(TILE_EMPTY + rotation)).toBe(false)
        expect(isRemovableTile(TILE_CRATERS + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TREES + rotation)).toBe(true)
        expect(isRemovableTile(TILE_ROAD_2WAY_STRAIGHT + rotation)).toBe(false)
        expect(isRemovableTile(TILE_ROAD_2WAY_CORNER + rotation)).toBe(false)
        expect(isRemovableTile(TILE_ROAD_3WAY + rotation)).toBe(false)
        expect(isRemovableTile(TILE_ROAD_4WAY + rotation)).toBe(false)
        expect(isRemovableTile(TILE_TURRET_BULLET_MK1 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_BULLET_MK2 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_BULLET_MK3 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_BLUE_MK1 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_BLUE_MK2 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_BLUE_MK3 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK1 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK2 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ENERGY_BALL_ORANGE_MK3 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_LASER_MK1 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_LASER_MK2 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_LASER_MK3 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ROCKET_MK1 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ROCKET_MK2 + rotation)).toBe(true)
        expect(isRemovableTile(TILE_TURRET_ROCKET_MK3 + rotation)).toBe(true)
        expect(isTurretTile(TURRET_TILE_VALUE_LOWER_LIMIT + rotation)).toBe(false)
    })
})

test('Test getTileValue getMap called', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[0]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    getTileValue(gameSatetStore, tile);

    expect(gameSatetStore.getMap).toBeCalledTimes(1);
})

test('Test getTileValue proper indexes', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[0, 0], [3, 0]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 1,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(3)
})

test('Test getTileValue flooring 1', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[-0.1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(-1)
})

test('Test getTileValue flooring 2', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[-0.99]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(-1)
})

test('Test getTileValue flooring 3', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[-1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(-1)
})

test('Test getTileValue flooring 4', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[-1.1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(-2)
})

test('Test getTileValue flooring 5', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[0.1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(0)
})

test('Test getTileValue flooring 6', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[0.99]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(0)
})

test('Test getTileValue flooring 7', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(1)
})

test('Test getTileValue flooring 7', () => {
    const gameSatetStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMap: jest.fn().mockReturnValue([[1.1]])
    } as any))();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 0,
        y: 0,
    } as Phaser.Tilemaps.Tile))();

    expect(getTileValue(gameSatetStore, tile)).toBe(1)
})


