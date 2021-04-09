import { IGameStateStore } from "../../../../api/game-state/game-state-store.interface";
import { ITurretGroup } from "../../../../api/group/turret-group/turret-group.interface";
import { Phaser } from "../../../../api/__helper__/phaser.export";
import { PlaceAction } from "../../../../impl/action/place-action/__abstract__/place-action.abstract";
import { TILE_EMPTY } from "../../../../impl/game-constants";
import { getTileValue } from "../../../../impl/utils/action.utils";

jest.mock('../../../../impl/utils/action.utils');
const mockGetTileValue = getTileValue as jest.Mock;

class TestPlaceActionClass extends PlaceAction<any> {
    public actionKey: string = "TEST_KEY"
}

beforeEach(() => {
    mockGetTileValue.mockReset();
})

test('Test place action construct', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({} as any))();
    const group = jest.fn<ITurretGroup<any>, any[]>((...args: any[]) => ({} as any))();

    const action = new TestPlaceActionClass(gameStateStore, group);

    expect(action != null).toStrictEqual(true);
})

test('Test place action getPrice', () => {
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({} as any))();

    const getPriceMock = jest.fn();
    const group = jest.fn<ITurretGroup<any>, any[]>((...args: any[]) => ({
        getPrice: getPriceMock
    } as any))();

    const action = new TestPlaceActionClass(gameStateStore, group);


    //for undefined
    let price = 223322;
    getPriceMock.mockImplementation(() => price);

    let result = action.getPriceForTile(undefined);

    expect(getPriceMock).toBeCalledTimes(1);
    expect(result).toStrictEqual(price);


    //for tile
    getPriceMock.mockReset();
    price = 223322;
    getPriceMock.mockImplementation(() => price);

    const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();
    result = action.getPriceForTile(tile);

    expect(getPriceMock).toBeCalledTimes(1);
    expect(result).toStrictEqual(price);
})

test('Test place action getColor', () => {
    const getMoneyMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMoney: getMoneyMock
    } as any))();

    const getPriceMock = jest.fn();
    const group = jest.fn<ITurretGroup<any>, any[]>((...args: any[]) => ({
        getPrice: getPriceMock
    } as any))();

    const action = new TestPlaceActionClass(gameStateStore, group);


    //for undefined
    let result = action.getSelectorColorForTile(undefined);
    expect(result).toStrictEqual(0xFF0000);


    //for tile & not empty
    mockGetTileValue.mockImplementation(() => TILE_EMPTY + 1);
    let tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();

    result = action.getSelectorColorForTile(tile);
    expect(result).toStrictEqual(0xFF0000);


    //for tile & empty & not enough money
    mockGetTileValue.mockImplementation(() => TILE_EMPTY);
    getPriceMock.mockImplementation(() => 101);
    getMoneyMock.mockImplementation(() => 100);
    tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();

    result = action.getSelectorColorForTile(tile);
    expect(result).toStrictEqual(0xFF0000);


    //for tile & empty & enough money
    mockGetTileValue.mockImplementation(() => TILE_EMPTY);
    getPriceMock.mockImplementation(() => 100);
    getMoneyMock.mockImplementation(() => 100);
    tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({} as any))();

    result = action.getSelectorColorForTile(tile);
    expect(result).toStrictEqual(0x00FF00);
})

test('Test place action onHover', () => {
    const getMoneyMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMoney: getMoneyMock
    } as any))();

    const getPriceMock = jest.fn();
    const groupGetMock = jest.fn();
    const group = jest.fn<ITurretGroup<any>, any[]>((...args: any[]) => ({
        getPrice: getPriceMock,
        get: groupGetMock,
    } as any))();


    const tileX = 11;
    const tileY = 22;

    type TestTilesData = {
        tileValue: number,
        price: number,
        money: number,
        withTile: boolean,
    };

    type TestTilesResults = {
        turretMock: {
            init: jest.Mock,
            showRange: jest.Mock,
            remove: jest.Mock,
        }
    }

    const goodTiles:TestTilesData[] = [
        {
            tileValue: TILE_EMPTY,
            price: 100,
            money: 100,
            withTile: true
        }
    ]

    const badTiles: TestTilesData[] = [
        {
            tileValue: TILE_EMPTY+1,
            price: 100,
            money: 100,
            withTile: true
        },
        {
            tileValue: TILE_EMPTY-1,
            price: 100,
            money: 100,
            withTile: true
        },
        {
            tileValue: TILE_EMPTY,
            price: 101,
            money: 100,
            withTile: true
        },
        {
            tileValue: TILE_EMPTY,
            price: 100,
            money: 100,
            withTile: false
        }
    ]

    const testWithParameterised = (datas: (TestTilesData & {cb: (results: TestTilesResults) => void}) [], ) => {
        const action = new TestPlaceActionClass(gameStateStore, group);
        const turretMock = {
            init: jest.fn(),
            showRange: jest.fn(),
            remove: jest.fn(),
        }

        datas.forEach(data => {
            jest.resetAllMocks();

            groupGetMock.mockImplementation(() => turretMock);
            mockGetTileValue.mockImplementation(() => data.tileValue);
            getPriceMock.mockImplementation(() => data.price);
            getMoneyMock.mockImplementation(() => data.money);
            const tile = data.withTile ? jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
                getCenterX: () => tileX,
                getCenterY: () => tileY,
            } as any))() : undefined;

            action.onTileHover(tile);

            data.cb({turretMock});
        })
    }

    //good -> 1x create 1x init&showrange
    goodTiles.forEach(tile1 => {
        testWithParameterised([
            {
                ...tile1,
                cb: (results) => {
                    expect(groupGetMock).toBeCalledTimes(1);
                    
                    expect(results.turretMock.init).toBeCalledTimes(1);
                    expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                        position: new Phaser.Math.Vector2(tileX, tileY),
                        gameStateStore: gameStateStore,
                        ignoreUpdate: true,
                    }));

                    expect(results.turretMock.showRange).toBeCalledTimes(1);

                    expect(results.turretMock.remove).toBeCalledTimes(0);
                }
            },
        ])
    })

    //bad -> do nothing
    badTiles.forEach(tile1 => {
        testWithParameterised([
            {
                ...tile1,
                cb: (results) => {
                    expect(groupGetMock).toBeCalledTimes(0);
                    
                    expect(results.turretMock.init).toBeCalledTimes(0);

                    expect(results.turretMock.showRange).toBeCalledTimes(0);

                    expect(results.turretMock.remove).toBeCalledTimes(0);
                }
            },
        ])
    })

    //bad | good -> do nothing | 1x create 1x init&showrange
    badTiles.forEach(tile1 => {
        goodTiles.forEach(tile2 => {
            testWithParameterised([
                {
                    ...tile1,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(0);
                        
                        expect(results.turretMock.init).toBeCalledTimes(0);
    
                        expect(results.turretMock.showRange).toBeCalledTimes(0);
    
                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
                {
                    ...tile2,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(1);
                        
                        expect(results.turretMock.init).toBeCalledTimes(1);
                        expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                            position: new Phaser.Math.Vector2(tileX, tileY),
                            gameStateStore: gameStateStore,
                            ignoreUpdate: true,
                        }));

                        expect(results.turretMock.showRange).toBeCalledTimes(1);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
            ])
        })
    })

    //good | bad -> 1x create 1x init&showrange | 1x remove
    goodTiles.forEach(tile1 => {
        badTiles.forEach(tile2 => {
            testWithParameterised([
                {
                    ...tile1,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(1);
                        
                        expect(results.turretMock.init).toBeCalledTimes(1);
                        expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                            position: new Phaser.Math.Vector2(tileX, tileY),
                            gameStateStore: gameStateStore,
                            ignoreUpdate: true,
                        }));

                        expect(results.turretMock.showRange).toBeCalledTimes(1);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
                {
                    ...tile2,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(0);
                        
                        expect(results.turretMock.init).toBeCalledTimes(0);
    
                        expect(results.turretMock.showRange).toBeCalledTimes(0);
    
                        expect(results.turretMock.remove).toBeCalledTimes(1);
                    }
                },
            ])
        })
    })

    //good | good -> 1x create 1x init&showrange | 1x init&showRange
    goodTiles.forEach(tile1 => {
        goodTiles.forEach(tile2 => {
            testWithParameterised([
                {
                    ...tile1,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(1);
                        
                        expect(results.turretMock.init).toBeCalledTimes(1);
                        expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                            position: new Phaser.Math.Vector2(tileX, tileY),
                            gameStateStore: gameStateStore,
                            ignoreUpdate: true,
                        }));

                        expect(results.turretMock.showRange).toBeCalledTimes(1);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
                {
                    ...tile1,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(0);
                        
                        expect(results.turretMock.init).toBeCalledTimes(1);
                        expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                            position: new Phaser.Math.Vector2(tileX, tileY),
                            gameStateStore: gameStateStore,
                            ignoreUpdate: true,
                        }));

                        expect(results.turretMock.showRange).toBeCalledTimes(1);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
            ])
        })
    })

    //bad | bad -> do nothing | do nothing
    badTiles.forEach(tile1 => {
        badTiles.forEach(tile2 => {
            testWithParameterised([
                {
                    ...tile1,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(0);
                        
                        expect(results.turretMock.init).toBeCalledTimes(0);

                        expect(results.turretMock.showRange).toBeCalledTimes(0);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
                {
                    ...tile2,
                    cb: (results) => {
                        expect(groupGetMock).toBeCalledTimes(0);
                        
                        expect(results.turretMock.init).toBeCalledTimes(0);

                        expect(results.turretMock.showRange).toBeCalledTimes(0);

                        expect(results.turretMock.remove).toBeCalledTimes(0);
                    }
                },
            ])
        })
    })

    //good | bad | good -> 1x create 1x init&showrange | 1x remove | 1x create 1x init&showrange
    goodTiles.forEach(tile1 => {
        badTiles.forEach(tile2 => {
            goodTiles.forEach(tile3 => {
                testWithParameterised([
                    {
                        ...tile1,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(1);
                            
                            expect(results.turretMock.init).toBeCalledTimes(1);
                            expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                                position: new Phaser.Math.Vector2(tileX, tileY),
                                gameStateStore: gameStateStore,
                                ignoreUpdate: true,
                            }));

                            expect(results.turretMock.showRange).toBeCalledTimes(1);

                            expect(results.turretMock.remove).toBeCalledTimes(0);
                        }
                    },
                    {
                        ...tile2,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(0);
                            
                            expect(results.turretMock.init).toBeCalledTimes(0);
        
                            expect(results.turretMock.showRange).toBeCalledTimes(0);
        
                            expect(results.turretMock.remove).toBeCalledTimes(1);
                        }
                    },
                    {
                        ...tile3,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(1);
                            
                            expect(results.turretMock.init).toBeCalledTimes(1);
                            expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                                position: new Phaser.Math.Vector2(tileX, tileY),
                                gameStateStore: gameStateStore,
                                ignoreUpdate: true,
                            }));

                            expect(results.turretMock.showRange).toBeCalledTimes(1);

                            expect(results.turretMock.remove).toBeCalledTimes(0);
                        }
                    },
                ])
            })
        })
    })

    //bad | good | bad -> do nothing | 1x create 1x init&showrange | 1x remove
    badTiles.forEach(tile1 => {
        goodTiles.forEach(tile2 => {
            badTiles.forEach(tile3 => {
                testWithParameterised([
                    {
                        ...tile1,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(0);
                            
                            expect(results.turretMock.init).toBeCalledTimes(0);
        
                            expect(results.turretMock.showRange).toBeCalledTimes(0);
        
                            expect(results.turretMock.remove).toBeCalledTimes(0);
                        }
                    },
                    {
                        ...tile2,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(1);
                            
                            expect(results.turretMock.init).toBeCalledTimes(1);
                            expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                                position: new Phaser.Math.Vector2(tileX, tileY),
                                gameStateStore: gameStateStore,
                                ignoreUpdate: true,
                            }));

                            expect(results.turretMock.showRange).toBeCalledTimes(1);

                            expect(results.turretMock.remove).toBeCalledTimes(0);
                        }
                    },
                    {
                        ...tile3,
                        cb: (results) => {
                            expect(groupGetMock).toBeCalledTimes(0);
                            
                            expect(results.turretMock.init).toBeCalledTimes(0);
        
                            expect(results.turretMock.showRange).toBeCalledTimes(0);
        
                            expect(results.turretMock.remove).toBeCalledTimes(1);
                        }
                    },
                ])
            })
        })
    })

})

test('Test place action onClick', () => {
    const getMoneyMock = jest.fn();
    const spendMoneyMock = jest.fn();
    const setTileMock = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        getMoney: getMoneyMock,
        spendMoney: spendMoneyMock,
        setTile: setTileMock,
    } as any))();

    const getPriceMock = jest.fn();
    const groupGetMock = jest.fn();
    const groupGetTileMock = jest.fn();
    const group = jest.fn<ITurretGroup<any>, any[]>((...args: any[]) => ({
        getPrice: getPriceMock,
        get: groupGetMock,
        getTile: groupGetTileMock,
    } as any))();


    const tileX = 1;
    const tileY = 2;
    const tileCenterX = 11;
    const tileCenterY = 22;
    const groupGetTileValue = 33;

    type TestTilesData = {
        tileValue: number,
        price: number,
        money: number,
    };

    type TestTilesResults = {
        turretMock: {
            init: jest.Mock,
        }
    }

    const goodTiles:TestTilesData[] = [
        {
            tileValue: TILE_EMPTY,
            price: 100,
            money: 100,
        }
    ]

    const badTiles: TestTilesData[] = [
        {
            tileValue: TILE_EMPTY+1,
            price: 100,
            money: 100,
        },
        {
            tileValue: TILE_EMPTY-1,
            price: 100,
            money: 100,
        },
        {
            tileValue: TILE_EMPTY,
            price: 101,
            money: 100,
        },
    ]

    const testWithParameterised = (datas: (TestTilesData & {cb: (results: TestTilesResults) => void}) [], ) => {
        const action = new TestPlaceActionClass(gameStateStore, group);
        const turretMock = {
            init: jest.fn(),
        }

        datas.forEach(data => {
            jest.resetAllMocks();

            groupGetTileMock.mockImplementation(() => groupGetTileValue);
            groupGetMock.mockImplementation(() => turretMock);
            mockGetTileValue.mockImplementation(() => data.tileValue);
            getPriceMock.mockImplementation(() => data.price);
            getMoneyMock.mockImplementation(() => data.money);
            const tile = jest.fn<Phaser.Tilemaps.Tile, any[]>((...args: any[]) => ({
                getCenterX: () => tileCenterX,
                getCenterY: () => tileCenterY,
                x: tileX,
                y: tileY,
            } as any))();

            action.onTileClick(tile);

            data.cb({turretMock});
        })
    }

    //good
    goodTiles.forEach(tile1 => {
        testWithParameterised([
            {
                ...tile1,
                cb: (results) => {
                    expect(groupGetMock).toBeCalledTimes(1);
                    
                    expect(results.turretMock.init).toBeCalledTimes(1);
                    expect(results.turretMock.init).toBeCalledWith(expect.objectContaining({
                        position: new Phaser.Math.Vector2(tileCenterX, tileCenterY),
                        gameStateStore: gameStateStore,
                    }));

                    expect(spendMoneyMock).toBeCalledTimes(1);
                    expect(spendMoneyMock).toBeCalledWith(tile1.price);

                    expect(groupGetTileMock).toBeCalledTimes(1);

                    expect(setTileMock).toBeCalledTimes(1);
                    expect(setTileMock).toBeCalledWith(tileY, tileX, groupGetTileValue);
                }
            },
        ])
    })

    //bad
    badTiles.forEach(tile1 => {
        testWithParameterised([
            {
                ...tile1,
                cb: (results) => {
                    expect(groupGetMock).toBeCalledTimes(0);
                    
                    expect(results.turretMock.init).toBeCalledTimes(0);
                    
                    expect(spendMoneyMock).toBeCalledTimes(0);
                    
                    expect(groupGetTileMock).toBeCalledTimes(0);

                    expect(setTileMock).toBeCalledTimes(0);
                }
            },
        ])
    })

})
