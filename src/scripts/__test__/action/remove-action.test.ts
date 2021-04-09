import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { Phaser } from "../../api/__helper__/phaser.export";
import { RemoveAction } from "../../impl/action/remove-action.class";
import { CRATERS_CLEAR_COST, REMOVE_PRICE_MULTIPLIER, TREES_CLEAR_COST } from "../../impl/game-config";
import { ACTION_KEY_REMOVE, TILE_CRATERS, TILE_EMPTY, TILE_TREES } from "../../impl/game-constants";
import { getTileValue, isRemovableTile } from "../../impl/utils/action.utils";

jest.mock('../../impl/utils/action.utils');
const mockGetTileValue = getTileValue as jest.Mock;
const mockIsRemovableTile = isRemovableTile as jest.Mock;

beforeEach(() => {
    mockGetTileValue.mockReset();
    mockIsRemovableTile.mockReset();
})

test('Test remove action construct', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new RemoveAction(gameStateStore);

    expect(action != null).toStrictEqual(true);
})

test('Test remove action key', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new RemoveAction(gameStateStore);

    expect(action.actionKey).toStrictEqual(ACTION_KEY_REMOVE);  
})

test('Test remove action getPrice', () => {
    const getAllTurretGroupsMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getAllTurretGroups: getAllTurretGroupsMock
    } as any))();

    const action = new RemoveAction(gameStateStore);

    //for undefined
    expect(action.getPriceForTile(undefined)).toStrictEqual(0);

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();

    //for tile & not removable
    mockIsRemovableTile.mockImplementation(() => false);
    mockGetTileValue.mockImplementation(() => -99);
    expect(action.getPriceForTile(tile)).toStrictEqual(0);

    //for tile & removable & tree
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => TILE_TREES);
    expect(action.getPriceForTile(tile)).toStrictEqual(TREES_CLEAR_COST);

    //for tile & removable & crater
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => TILE_CRATERS);
    expect(action.getPriceForTile(tile)).toStrictEqual(CRATERS_CLEAR_COST);

    //for tile & removable & turret
    const tileValue = 99999
    const tileCost = 88888
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => tileValue);
    getAllTurretGroupsMock.mockImplementation(() => [{
        getTile: () => tileValue,
        getPrice: () => tileCost,
    }])
    expect(action.getPriceForTile(tile)).toStrictEqual(tileCost * (-1) * REMOVE_PRICE_MULTIPLIER);
})

test('Test remove action getColor', () => {
    const getAllTurretGroupsMock = jest.fn();
    const getMoneyMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getAllTurretGroups: getAllTurretGroupsMock,
        getMoney: getMoneyMock,
    } as any))();

    const action = new RemoveAction(gameStateStore);

    //for undefined
    expect(action.getSelectorColorForTile(undefined)).toStrictEqual(0xFF0000);

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();
    
    //for tile & not removable
    mockIsRemovableTile.mockImplementation(() => false);
    mockGetTileValue.mockImplementation(() => -99);
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0xFF0000);

    //for tile & not enough money
    let tileValue = 99999
    let tileCost = -88888 //workaround use negative cost (turrets have inverse cost for remove -> gives you money)
    let money = 0;
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => tileValue);
    getMoneyMock.mockImplementation(() => money)
    getAllTurretGroupsMock.mockImplementation(() => [{
        getTile: () => tileValue,
        getPrice: () => tileCost,
    }])
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0xFF0000);

    //for tile & enough money
    tileValue = 99999
    tileCost = -88888 //workaround use negative cost (turrets have inverse cost for remove -> gives you money)
    money = 9999999999999;
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => tileValue);
    getMoneyMock.mockImplementation(() => money)
    getAllTurretGroupsMock.mockImplementation(() => [{
        getTile: () => tileValue,
        getPrice: () => tileCost,
    }])
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0x00FF00);

    //for tile & turret remove which adds money
    tileValue = 99999
    tileCost = 88888
    money = 0;
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => tileValue);
    getMoneyMock.mockImplementation(() => money)
    getAllTurretGroupsMock.mockImplementation(() => [{
        getTile: () => tileValue,
        getPrice: () => tileCost,
    }])
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0x00FF00);
})

test('Test remove action onHover', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new RemoveAction(gameStateStore);
    action.onTileHover();

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();
    action.onTileHover(tile);

    //does nothing
    expect(true).toStrictEqual(true);
})

test('Test remove action onClick', () => {
    const getAllTurretGroupsMock = jest.fn();
    const getMoneyMock = jest.fn();
    const setTileMock = jest.fn();
    const spendMoneyMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getAllTurretGroups: getAllTurretGroupsMock,
        getMoney: getMoneyMock,
        setTile: setTileMock,
        spendMoney: spendMoneyMock,
    } as any))();

    const action = new RemoveAction(gameStateStore);

    //for tile & not removable
    getAllTurretGroupsMock.mockReset();
    getMoneyMock.mockReset();
    setTileMock.mockReset();
    spendMoneyMock.mockReset();
    
    let tileValue = 99999
    let tileCost = -88888
    let money = 0;
    let tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 3,
        y: 4,
        getCenterX: () => 1,
        getCenterY: () => 2,
    } as any))();
    mockIsRemovableTile.mockImplementation(() => false);

    action.onTileClick(tile)

    expect(setTileMock).toBeCalledTimes(0);
    expect(spendMoneyMock).toBeCalledTimes(0);

    // for tile & removable & not enough money
    getAllTurretGroupsMock.mockReset();
    getMoneyMock.mockReset();
    setTileMock.mockReset();
    spendMoneyMock.mockReset();

    tileValue = 99999
    tileCost = -88888
    money = 0;
    tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        x: 3,
        y: 4,
        getCenterX: () => 1,
        getCenterY: () => 2,
    } as any))();
    mockIsRemovableTile.mockImplementation(() => true);
    mockGetTileValue.mockImplementation(() => tileValue);
    getMoneyMock.mockImplementation(() => money);
    let removeTurretMock = jest.fn();
    getAllTurretGroupsMock.mockImplementation(() => [{
        getTile: () => tileValue,
        getPrice: () => tileCost,
        getChildren: () => [
            {
                active: true,
                visible: true,
                position: {
                    x: 1,
                    y: 2,
                },
                remove: removeTurretMock
            }
        ]
    }])

    action.onTileClick(tile)

    expect(setTileMock).toBeCalledTimes(0);
    expect(removeTurretMock).toBeCalledTimes(0);
    expect(spendMoneyMock).toBeCalledTimes(0);

    // for tile & removable & enough money 
    // with various parameters
    const testWithTileParameterised = (obj: {}, result: boolean) => {
        getAllTurretGroupsMock.mockReset();
        getMoneyMock.mockReset();
        setTileMock.mockReset();
        spendMoneyMock.mockReset();

        let tileValue = 99999
        let tileCost = 88888
        let money = 9999999999;
        let tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
            x: 3,
            y: 4,
            getCenterX: () => 1,
            getCenterY: () => 2,
        } as any))();
        mockIsRemovableTile.mockImplementation(() => true);
        mockGetTileValue.mockImplementation(() => tileValue);
        getMoneyMock.mockImplementation(() => money);
        const removeTurretMock = jest.fn();
        getAllTurretGroupsMock.mockImplementation(() => [{
            getTile: () => tileValue,
            getPrice: () => tileCost,
            getChildren: () => [
                {
                    ...obj,
                    remove: removeTurretMock
                }
            ]
        }])

        action.onTileClick(tile)

        expect(setTileMock).toBeCalledTimes(1);
        expect(setTileMock).toBeCalledWith(4, 3, TILE_EMPTY);

        expect(removeTurretMock).toBeCalledTimes(result ? 1 : 0);

        expect(spendMoneyMock).toBeCalledTimes(1);
        expect(spendMoneyMock).toBeCalledWith(tileCost * (-1) * REMOVE_PRICE_MULTIPLIER);
    }

    [
        {
            obj: {
                active: true,
                visible: true,
                position: {
                    x: 1,
                    y: 2,
                }
            },
            result: true
        },
        {
            obj: {
                active: false,
                visible: true,
                position: {
                    x: 1,
                    y: 2,
                }
            },
            result: false
        },
        {
            obj: {
                active: true,
                visible: false,
                position: {
                    x: 1,
                    y: 2,
                }
            },
            result: false
        },
        {
            obj: {
                active: true,
                visible: true,
                position: {
                    x: -1,
                    y: 2,
                }
            },
            result: false
        },
        {
            obj: {
                active: true,
                visible: true,
                position: {
                    x: 1,
                    y: -2,
                }
            },
            result: false
        },
    ].forEach(params => {
        testWithTileParameterised(params.obj, params.result);
    })
})
