import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { Phaser } from "../../api/__helper__/phaser.export";
import { SelectAction } from "../../impl/action/select-action.class";
import { ACTION_KEY_SELECT } from "../../impl/game-constants";
import { isTurretTile } from "../../impl/utils/action.utils";

jest.mock('../../impl/utils/action.utils');
const mockIsTurretTile = isTurretTile as jest.Mock;

beforeEach(() => {
    mockIsTurretTile.mockReset() 
})

test('Test select action construct', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new SelectAction(gameStateStore);

    expect(action != null).toStrictEqual(true);
})

test('Test select action key', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new SelectAction(gameStateStore);

    expect(action.actionKey).toStrictEqual(ACTION_KEY_SELECT);  
})

test('Test select action getPrice', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({} as any))();

    const action = new SelectAction(gameStateStore);

    expect(action.getPriceForTile()).toStrictEqual(0);
})

test('Test select action getColor', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({} as any))();

    const action = new SelectAction(gameStateStore);

    //for undefined
    expect(action.getSelectorColorForTile(undefined)).toStrictEqual(0xFFFFFF);

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();
    
    //for tile & not turret
    mockIsTurretTile.mockImplementationOnce(() => false);
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0xFFFFFF);

    //for tile & turret
    mockIsTurretTile.mockImplementationOnce(() => true);
    expect(action.getSelectorColorForTile(tile)).toStrictEqual(0xFFFF00);
})

test('Test select action onHover', () => {
    const getAllTurretGroupsMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getAllTurretGroups: getAllTurretGroupsMock
    } as any))();

    const action = new SelectAction(gameStateStore);

    //for undefined
    const showRangeMockFn = jest.fn();
    const hideRangeMockFn = jest.fn();
    getAllTurretGroupsMock.mockImplementation(() => [{
        getChildren: () => [
            {
                active: true,
                visible: true,
                position : {
                    x: 1,
                    y: 2,
                },
                showRange: showRangeMockFn,
                hideRange: hideRangeMockFn, 
            }
        ]
    }]);

    action.onTileHover(undefined);
    expect(showRangeMockFn).toBeCalledTimes(0)
    expect(hideRangeMockFn).toBeCalledTimes(1)

    //for tile
    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
        getCenterX: () => 1,
        getCenterY: () => 2,
    } as any))();

    const testWithTileParameterised = (obj: {}, result: boolean) => {
        showRangeMockFn.mockReset();
        hideRangeMockFn.mockReset();
        getAllTurretGroupsMock.mockImplementation(() => [{
            getChildren: () => [
                {
                    ...obj,
                    showRange: showRangeMockFn,
                    hideRange: hideRangeMockFn, 
                }
            ]
        }]);

        action.onTileHover(tile);
        expect(showRangeMockFn).toBeCalledTimes(result === true ? 1 : 0)
        expect(hideRangeMockFn).toBeCalledTimes(result === true ? 0 : 1)
    }

    [
        {
            obj: {
                active: true,
                visible: true,
                position : {
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
                position : {
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
                position : {
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
                position : {
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
                position : {
                    x: 1,
                    y: -2,
                }
            },
            result: false
        }
    ].forEach(parameters => {
        testWithTileParameterised(parameters.obj, parameters.result)
    })
})

test('Test select action onClick', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    } as any))();

    const action = new SelectAction(gameStateStore);

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();

    action.onTileClick(tile);

    //does nothing
    expect(true).toStrictEqual(true);
})
