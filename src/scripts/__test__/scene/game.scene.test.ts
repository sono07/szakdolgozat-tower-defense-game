import { Phaser } from '../../api/__helper__/phaser.export';
import { Tuple } from '../../api/common/types';
import { MAP_TILES_COL_COUNT, MAP_TILES_ROW_COUNT } from '../../impl/game-config';
import { TILE_EMPTY, TILE_ROAD_2WAY_STRAIGHT } from '../../impl/game-constants';
import { GameStateStore } from '../../impl/game-state/game-state.store.class';
import { MapGenerator } from '../../impl/map/map-generator.class';
import { GameScene, GAME_SCENE_KEY } from '../../impl/scene/game.scene';
import { BaseScene } from '../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../__helper__/mock.helper';
import { IAction } from '../../api/action/action.interface';

jest.mock('../../impl/scene/__abstract__/base.scene.abstract');
const baseSceneMockHelper = new MockHelper(BaseScene.prototype)

jest.mock('../../impl/map/map-generator.class');
const mapGeneratorMockHelper = new MockHelper(MapGenerator);

jest.mock('../../impl/game-state/game-state.store.class');
const gameStateStoreMockHelper = new MockHelper(GameStateStore.prototype);


beforeEach(() => {
  baseSceneMockHelper.reset();
  mapGeneratorMockHelper.reset();
  gameStateStoreMockHelper.reset();
})

test('Game scene construct', () => {
  const scene = new GameScene();

  expect(scene != null).toBe(true);
  expect(baseSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().constructor).toBeCalledWith(GAME_SCENE_KEY);
})

test('Game scene init', () => {
  const scene = new GameScene();
  scene.init({});
})

test('Game scene preload', () => {
  const scene = new GameScene();
  scene.preload();
})

test('Game scene create', () => {
  const seedValue = "asdsa";

  const pathMock = {
    lineTo: jest.fn(),
  }
  const rectangleOnMock = jest.fn();
  baseSceneMockHelper.setup((proto) => {
    proto.cameras.main.width = 0;
    proto.cameras.main.height = 0;

    proto.add.path = jest.fn((): any => (pathMock));
    
    proto.make.tilemap = jest.fn((): any => ({
      addTilesetImage: jest.fn(),
      createBlankLayer: jest.fn((): any => ({
        setPosition: jest.fn(),
        setScale: jest.fn(),
      })),
    }))

    proto.add.rectangle = jest.fn((): any =>({
      setStrokeStyle: jest.fn(),
      setFillStyle: jest.fn(),
      setOrigin: jest.fn(),
      setDepth: jest.fn(),
      setVisible: jest.fn(),
      setInteractive: jest.fn(),
      on: rectangleOnMock,
    }))

    proto.add.graphics = jest.fn((): any => ({
      lineStyle: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      strokePath: jest.fn(),
      fillStyle: jest.fn(),
      fillRoundedRect: jest.fn(),
      setDepth: jest.fn(),
      strokeRoundedRect: jest.fn(),
      setVisible: jest.fn(),
    }))

    proto.add.image = jest.fn((): any => ({
      setOrigin: jest.fn(),
      setScale: jest.fn(),
      setDepth: jest.fn(),
      setRotation: jest.fn(),
      setDisplaySize: jest.fn(),
    }))

    proto.make.text = jest.fn((): any => ({
      setOrigin: jest.fn(),
      setDepth: jest.fn(),
    }))

    proto.input.on = jest.fn()
  })

  const map: number[][] = [];
  const path: Tuple<number, 2>[] = []
  for (let row = 0; row < MAP_TILES_ROW_COUNT; row++) {
    map.push([]);
    for (let col = 0; col < MAP_TILES_COL_COUNT; col++) {
      if(row == 0 || col == MAP_TILES_COL_COUNT - 1) {
        map[row].push(TILE_ROAD_2WAY_STRAIGHT)
        path.push([col, row]);
      } else {
        map[row].push(TILE_EMPTY)
      }
    }
  }
  mapGeneratorMockHelper.setup((proto) => {
    proto.generateMap = jest.fn((): any => ({
      map,
      path,
    }));
  })

  const healthValue = 6655;
  const moneyValue = 2255;
  const scoreValue = 1188;
  const waveValue = 22;
  const waveEnemyValue = 202;
  const mapData: any[] = [];
  const actionValue: Partial<IAction> = {actionKey: "asd"} 
  gameStateStoreMockHelper.setup((proto) => {
    proto.getMapDataForTileMap = jest.fn((): any => (mapData))
    proto.tileForTileMapChangedCallbacks.push = jest.fn();
    proto.getMap = jest.fn((): any => (mapData))
    proto.tileChangedCallbacks.push = jest.fn();
    proto.getHealth = jest.fn((): any => (healthValue));
    proto.healtChangedCallbacks.push = jest.fn();
    proto.getMoney = jest.fn((): any => (moneyValue));
    proto.moneyChangedCallbacks.push = jest.fn();
    proto.getScore = jest.fn((): any => (scoreValue));
    proto.scoreChangedCallbacks.push = jest.fn();
    proto.enemySpawner.getWaveNumber = jest.fn((): any => (waveValue));
    proto.enemySpawner.waveNumberChangedCallback.push = jest.fn();
    proto.enemySpawner.getWaveEnemyNumber = jest.fn((): any => (waveEnemyValue));
    proto.enemySpawner.waveEnemyNumberChangedCallback.push = jest.fn();
    proto.getAction = jest.fn((): any => (actionValue));
    proto.actionChangedCallbacks.push = jest.fn()
  })

  
  const scene = new GameScene();
  scene.create({seed: seedValue});

  expect(mapGeneratorMockHelper.get().generateMap).toBeCalledTimes(1);
  expect(mapGeneratorMockHelper.get().generateMap).toBeCalledWith(seedValue, MAP_TILES_ROW_COUNT, MAP_TILES_COL_COUNT);

  expect(gameStateStoreMockHelper.get().constructor).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().constructor).toBeCalledWith(expect.anything(), map, pathMock);

  expect(gameStateStoreMockHelper.get().getMapDataForTileMap).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().tileForTileMapChangedCallbacks.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().tileForTileMapChangedCallbacks.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().getHealth).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({ text: healthValue.toString() }))
  expect(gameStateStoreMockHelper.get().healtChangedCallbacks.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().healtChangedCallbacks.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().getMoney).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({ text: moneyValue.toString() }))
  expect(gameStateStoreMockHelper.get().moneyChangedCallbacks.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().moneyChangedCallbacks.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().getScore).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({ text: scoreValue.toString() }))
  expect(gameStateStoreMockHelper.get().scoreChangedCallbacks.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().scoreChangedCallbacks.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().enemySpawner.getWaveNumber).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({ text: waveValue.toString() }))
  expect(gameStateStoreMockHelper.get().enemySpawner.waveNumberChangedCallback.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().enemySpawner.waveNumberChangedCallback.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().enemySpawner.getWaveEnemyNumber).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({ text: waveEnemyValue.toString() }))
  expect(gameStateStoreMockHelper.get().enemySpawner.waveEnemyNumberChangedCallback.push).toBeCalledTimes(1);
  expect(gameStateStoreMockHelper.get().enemySpawner.waveEnemyNumberChangedCallback.push).toBeCalledWith(expect.anything());

  expect(gameStateStoreMockHelper.get().actionChangedCallbacks.push).toBeCalledTimes(2);
  expect(gameStateStoreMockHelper.get().actionChangedCallbacks.push).toBeCalledWith(expect.anything());

  expect(rectangleOnMock).toBeCalledWith(Phaser.Input.Events.POINTER_OVER, expect.anything());
  expect(rectangleOnMock).toBeCalledWith(Phaser.Input.Events.POINTER_OUT, expect.anything());
  expect(rectangleOnMock).toBeCalledWith(Phaser.Input.Events.POINTER_DOWN, expect.anything());
})

test('Game scene update', () => {
  const time = 22;
  const delta = 11;

  const mockUpdateSpawner = jest.fn();
  baseSceneMockHelper.setup((proto) => {
    (proto as any).gameStateStore.updateSpawner = mockUpdateSpawner;
  })

  const scene = new GameScene();
  scene.update(time, delta);

  expect(mockUpdateSpawner).toBeCalledTimes(1);
  expect(mockUpdateSpawner).toBeCalledWith(time, delta);
})
