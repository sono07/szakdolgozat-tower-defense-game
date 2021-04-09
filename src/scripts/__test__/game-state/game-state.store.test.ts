import { GameStateStore } from "../../impl/game-state/game-state.store.class"
import { EnemyGroup } from "../../impl/group/enemy.group.class";
import { BulletGroup } from "../../impl/group/projectiles/bullet.group.class";
import { EnergyBallBlueGroup } from "../../impl/group/projectiles/energy-ball-blue.group.class";
import { EnergyBallOrangeGroup } from "../../impl/group/projectiles/energy-ball-orange.group.class";
import { LaserGroup } from "../../impl/group/projectiles/laser.group.class";
import { RocketGroup } from "../../impl/group/projectiles/rocket.group.class";
import { TurretBulletMk1Group } from "../../impl/group/turret/turret-bullet-mk1.group.class";
import { TurretBulletMk2Group } from "../../impl/group/turret/turret-bullet-mk2.group.class";
import { TurretBulletMk3Group } from "../../impl/group/turret/turret-bullet-mk3.group.class";
import { TurretEnergyBallBlueMk1Group } from "../../impl/group/turret/turret-energy-ball-blue-mk1.group.class";
import { TurretEnergyBallBlueMk2Group } from "../../impl/group/turret/turret-energy-ball-blue-mk2.group.class";
import { TurretEnergyBallBlueMk3Group } from "../../impl/group/turret/turret-energy-ball-blue-mk3.group.class";
import { TurretEnergyBallOrangeMk1Group } from "../../impl/group/turret/turret-energy-ball-orange-mk1.group.class";
import { TurretEnergyBallOrangeMk2Group } from "../../impl/group/turret/turret-energy-ball-orange-mk2.group.class";
import { TurretEnergyBallOrangeMk3Group } from "../../impl/group/turret/turret-energy-ball-orange-mk3.group.class";
import { TurretLaserMk1Group } from "../../impl/group/turret/turret-laser-mk1.group.class";
import { TurretLaserMk2Group } from "../../impl/group/turret/turret-laser-mk2.group.class";
import { TurretLaserMk3Group } from "../../impl/group/turret/turret-laser-mk3.group.class";
import { TurretRocketMk1Group } from "../../impl/group/turret/turret-rocket-mk1.group.class";
import { TurretRocketMk2Group } from "../../impl/group/turret/turret-rocket-mk2.group.class";
import { TurretRocketMk3Group } from "../../impl/group/turret/turret-rocket-mk3.group.class";
import { SelectAction } from "../../impl/action/select-action.class";
import { EnemySpawner } from "../../impl/map/enemy-spawner.class";
import { Phaser } from "../../api/__helper__/phaser.export";
import { MockHelper } from "../__helper__/mock.helper";
import { TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_TREES } from "../../impl/game-constants";
import { STARTING_HEALTH, STARTING_MONEY } from "../../impl/game-config";
import { GAME_OVER_SCENE_KEY } from "../../impl/scene/game-over.scene";

jest.mock('../../impl/group/enemy.group.class');
const enemyGroupMockHelper = new MockHelper(EnemyGroup.prototype)

jest.mock('../../impl/group/projectiles/bullet.group.class');
const bulletGroupMockHelper = new MockHelper(BulletGroup.prototype)

jest.mock('../../impl/group/projectiles/energy-ball-blue.group.class');
const energyBallBlueGroupMockHelper = new MockHelper(EnergyBallBlueGroup.prototype)

jest.mock('../../impl/group/projectiles/energy-ball-orange.group.class');
const energyBallOrangeGroupMockHelper = new MockHelper(EnergyBallOrangeGroup.prototype)

jest.mock('../../impl/group/projectiles/laser.group.class');
const laserGroupMockHelper = new MockHelper(LaserGroup.prototype)

jest.mock('../../impl/group/projectiles/rocket.group.class');
const rocketGroupMockHelper = new MockHelper(RocketGroup.prototype)

jest.mock('../../impl/group/turret/turret-bullet-mk1.group.class');
const turretBulletMk1GroupMockHelper = new MockHelper(TurretBulletMk1Group.prototype)

jest.mock('../../impl/group/turret/turret-bullet-mk2.group.class');
const turretBulletMk2GroupMockHelper = new MockHelper(TurretBulletMk2Group.prototype)

jest.mock('../../impl/group/turret/turret-bullet-mk3.group.class');
const turretBulletMk3GroupMockHelper = new MockHelper(TurretBulletMk3Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-blue-mk1.group.class');
const turretEnergyBallBlueMk1GroupMockHelper = new MockHelper(TurretEnergyBallBlueMk1Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-blue-mk2.group.class');
const turretEnergyBallBlueMk2GroupMockHelper = new MockHelper(TurretEnergyBallBlueMk2Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-blue-mk3.group.class');
const turretEnergyBallBlueMk3GroupMockHelper = new MockHelper(TurretEnergyBallBlueMk3Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-orange-mk1.group.class');
const turretEnergyBallOrangeMk1GroupMockHelper = new MockHelper(TurretEnergyBallOrangeMk1Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-orange-mk2.group.class');
const turretEnergyBallOrangeMk2GroupMockHelper = new MockHelper(TurretEnergyBallOrangeMk2Group.prototype)

jest.mock('../../impl/group/turret/turret-energy-ball-orange-mk3.group.class');
const turretEnergyBallOrangeMk3GroupMockHelper = new MockHelper(TurretEnergyBallOrangeMk3Group.prototype)

jest.mock('../../impl/group/turret/turret-laser-mk1.group.class');
const turretLaserMk1GroupMockHelper = new MockHelper(TurretLaserMk1Group.prototype)

jest.mock('../../impl/group/turret/turret-laser-mk2.group.class');
const turretLaserMk2GroupMockHelper = new MockHelper(TurretLaserMk2Group.prototype)

jest.mock('../../impl/group/turret/turret-laser-mk3.group.class');
const turretLaserMk3GroupMockHelper = new MockHelper(TurretLaserMk3Group.prototype)

jest.mock('../../impl/group/turret/turret-rocket-mk1.group.class');
const turretRocketMk1GroupMockHelper = new MockHelper(TurretRocketMk1Group.prototype)

jest.mock('../../impl/group/turret/turret-rocket-mk2.group.class');
const turretRocketMk2GroupMockHelper = new MockHelper(TurretRocketMk2Group.prototype)

jest.mock('../../impl/group/turret/turret-rocket-mk3.group.class');
const turretRocketMk3GroupMockHelper = new MockHelper(TurretRocketMk3Group.prototype)

jest.mock('../../impl/action/select-action.class');
const selectActionMockHelper = new MockHelper(SelectAction.prototype)

jest.mock('../../impl/map/enemy-spawner.class');
const enemySpawnerMockHelper = new MockHelper(EnemySpawner.prototype)

beforeEach(() => {
  enemyGroupMockHelper.reset();
  bulletGroupMockHelper.reset();
  energyBallBlueGroupMockHelper.reset();
  energyBallOrangeGroupMockHelper.reset();
  laserGroupMockHelper.reset();
  rocketGroupMockHelper.reset();
  turretBulletMk1GroupMockHelper.reset();
  turretBulletMk2GroupMockHelper.reset();
  turretBulletMk3GroupMockHelper.reset();
  turretEnergyBallBlueMk1GroupMockHelper.reset();
  turretEnergyBallBlueMk2GroupMockHelper.reset();
  turretEnergyBallBlueMk3GroupMockHelper.reset();
  turretEnergyBallOrangeMk1GroupMockHelper.reset();
  turretEnergyBallOrangeMk2GroupMockHelper.reset();
  turretEnergyBallOrangeMk3GroupMockHelper.reset();
  turretLaserMk1GroupMockHelper.reset();
  turretLaserMk2GroupMockHelper.reset();
  turretLaserMk3GroupMockHelper.reset();
  turretRocketMk1GroupMockHelper.reset();
  turretRocketMk2GroupMockHelper.reset();
  turretRocketMk3GroupMockHelper.reset();
  selectActionMockHelper.reset();
  enemySpawnerMockHelper.reset();
})



test("Test game state store construct", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  expect(gameStateStore != null).toStrictEqual(true);
})

test("Test game state store path", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  expect(gameStateStore.path).toStrictEqual(path);
})

test("Test game state store construct enemy spawner", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  expect(enemySpawnerMockHelper.get().constructor).toBeCalledTimes(1);
  expect(enemySpawnerMockHelper.get().constructor).toBeCalledWith(gameStateStore);
})

test("Test game state store construct default action", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  expect(selectActionMockHelper.get().constructor).toBeCalledTimes(1);
  expect(selectActionMockHelper.get().constructor).toBeCalledWith(gameStateStore);
})

test("Test game state store construct groups", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  expect(enemyGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(enemyGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(bulletGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(bulletGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(energyBallBlueGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(energyBallBlueGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(energyBallOrangeGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(energyBallOrangeGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(laserGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(laserGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(rocketGroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(rocketGroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretBulletMk1GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretBulletMk1GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretBulletMk2GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretBulletMk2GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretBulletMk3GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretBulletMk3GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallBlueMk1GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallBlueMk1GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallBlueMk2GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallBlueMk2GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallBlueMk3GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallBlueMk3GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallOrangeMk1GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallOrangeMk1GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallOrangeMk2GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallOrangeMk2GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretEnergyBallOrangeMk3GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretEnergyBallOrangeMk3GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretLaserMk1GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretLaserMk1GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretLaserMk2GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretLaserMk2GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretLaserMk3GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretLaserMk3GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretRocketMk1GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretRocketMk1GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretRocketMk2GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretRocketMk2GroupMockHelper.get().constructor).toBeCalledWith(scene);
  expect(turretRocketMk3GroupMockHelper.get().constructor).toBeCalledTimes(1);
  expect(turretRocketMk3GroupMockHelper.get().constructor).toBeCalledWith(scene);
})

test("Test game state store getAllTurretGroups", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const result = gameStateStore.getAllTurretGroups();

  expect(!result.some(r => r instanceof EnemyGroup)).toStrictEqual(true);
  expect(!result.some(r => r instanceof BulletGroup)).toStrictEqual(true);
  expect(!result.some(r => r instanceof EnergyBallBlueGroup)).toStrictEqual(true);
  expect(!result.some(r => r instanceof EnergyBallOrangeGroup)).toStrictEqual(true);
  expect(!result.some(r => r instanceof LaserGroup)).toStrictEqual(true);
  expect(!result.some(r => r instanceof RocketGroup)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretBulletMk1Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretBulletMk2Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretBulletMk3Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallBlueMk1Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallBlueMk2Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallBlueMk3Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallOrangeMk1Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallOrangeMk2Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretEnergyBallOrangeMk3Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretLaserMk1Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretLaserMk2Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretLaserMk3Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretRocketMk1Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretRocketMk2Group)).toStrictEqual(true);
  expect(result.some(r => r instanceof TurretRocketMk3Group)).toStrictEqual(true);
})

test("Test game state store getAction", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const result = gameStateStore.getAction();

  expect(result instanceof SelectAction).toStrictEqual(true);
})

test("Test game state store setAction", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const action = jest.fn();
  gameStateStore.setAction(action as any);

  expect(gameStateStore.getAction()).toStrictEqual(action);
})

test("Test game state store setAction actionChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.actionChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.actionChangedCallbacks.push(cb2);

  const action = jest.fn();
  gameStateStore.setAction(action as any);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(action);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(action);
})

test("Test game state store getMap", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const result = gameStateStore.getMap();

  expect(result).toStrictEqual(map);
})

test("Test game state store getMapDataForTileMap values", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4.4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const result = gameStateStore.getMapDataForTileMap();

  for(let row of result) {
    for(let cell of row) {
      const goodValues = [TILE_CRATERS, TILE_TREES, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_2WAY_CORNER, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_EMPTY];
      expect(goodValues.includes(cell)).toStrictEqual(true);
    }
  }
})

test("Test game state store setTile", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4.4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  gameStateStore.setTile(0, 1, 344.1);
  const result = gameStateStore.getMap();

  expect(result[0][1]).toStrictEqual(344.1)
})

test("Test game state store setTile tileChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4.4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.tileChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.tileChangedCallbacks.push(cb2);

  gameStateStore.setTile(0, 1, 344.1);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(0, 1, 344.1);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(0, 1, 344.1);

})

test("Test game state store setTile tileForTileMapChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4.4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  
  const cb1 = jest.fn();
  gameStateStore.tileForTileMapChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.tileForTileMapChangedCallbacks.push(cb2);

  gameStateStore.setTile(0, 1, 344.1);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(0, 1, TILE_EMPTY);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(0, 1, TILE_EMPTY);
})

test("Test game state store setTile tileForTileMapChangedCallbacks called 2", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4.4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  
  const cb1 = jest.fn();
  gameStateStore.tileForTileMapChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.tileForTileMapChangedCallbacks.push(cb2);

  gameStateStore.setTile(0, 1, TILE_TREES+0.1);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(0, 1, TILE_TREES);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(0, 1, TILE_TREES);
})

test("Test game state store getHealth", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const result = gameStateStore.getHealth();

  expect(result).toStrictEqual(STARTING_HEALTH);
})

test("Test game state store receiveDamage", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  gameStateStore.receiveDamage(3);
  const result = gameStateStore.getHealth()

  expect(result).toStrictEqual(STARTING_HEALTH - 3);
})

test("Test game state store receiveDamage game-over", () => {
  const scene: Phaser.Scene = {
    scene: {
      start: jest.fn(),
    }
  } as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  gameStateStore.receiveDamage(STARTING_HEALTH);

  expect(scene.scene.start).toBeCalledTimes(1);
  expect(scene.scene.start).toBeCalledWith(GAME_OVER_SCENE_KEY, { score: 0 });
})

test("Test game state store receiveDamage game-over with score", () => {
  const scene: Phaser.Scene = {
    scene: {
      start: jest.fn(),
    }
  } as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  gameStateStore.receiveMoney(11);
  gameStateStore.receiveDamage(STARTING_HEALTH);

  expect(scene.scene.start).toBeCalledTimes(1);
  expect(scene.scene.start).toBeCalledWith(GAME_OVER_SCENE_KEY, { score: 11 });
})

test("Test game state store receiveDamage healtChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.healtChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.healtChangedCallbacks.push(cb2);

  gameStateStore.receiveDamage(3);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(STARTING_HEALTH - 3);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(STARTING_HEALTH - 3);
})

test("Test game state store getScore", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const result = gameStateStore.getScore();

  expect(result).toStrictEqual(0);
})

test("Test game state store receiveMoney score", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  gameStateStore.receiveMoney(33);
  const result = gameStateStore.getScore();

  expect(result).toStrictEqual(33);
})

test("Test game state store receiveMoney scoreChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.scoreChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.scoreChangedCallbacks.push(cb2);

  gameStateStore.receiveMoney(33);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(33);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(33);
})

test("Test game state store getMoney", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const result = gameStateStore.getMoney();

  expect(result).toStrictEqual(STARTING_MONEY);
})

test("Test game state store receiveMoney money", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  gameStateStore.receiveMoney(33);
  const result = gameStateStore.getMoney();

  expect(result).toStrictEqual(STARTING_MONEY + 33);
})

test("Test game state store receiveMoney moneyChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.moneyChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.moneyChangedCallbacks.push(cb2);

  gameStateStore.receiveMoney(33);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(STARTING_MONEY + 33);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(STARTING_MONEY + 33);
})

test("Test game state store spendMoney", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  gameStateStore.spendMoney(22);
  const result = gameStateStore.getMoney();

  expect(result).toStrictEqual(STARTING_MONEY - 22);
})

test("Test game state store spendMoney score not changed", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  gameStateStore.receiveMoney(100);

  const cb = jest.fn();
  gameStateStore.scoreChangedCallbacks.push(cb);
  gameStateStore.spendMoney(22);
  const result = gameStateStore.getScore();

  expect(result).toStrictEqual(100);
  expect(cb).toBeCalledTimes(0);
})

test("Test game state store spendMoney moneyChangedCallbacks called", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);

  const cb1 = jest.fn();
  gameStateStore.moneyChangedCallbacks.push(cb1);
  const cb2 = jest.fn();
  gameStateStore.moneyChangedCallbacks.push(cb2);

  gameStateStore.spendMoney(22);

  expect(cb1).toBeCalledTimes(1);
  expect(cb1).toBeCalledWith(STARTING_MONEY - 22);
  expect(cb2).toBeCalledTimes(1);
  expect(cb2).toBeCalledWith(STARTING_MONEY - 22);
})

test("Test game state store updateSpawner", () => {
  const scene: Phaser.Scene = jest.fn() as any;
  const map = [[1,2],[3,4]];
  const path: Phaser.Curves.Path = jest.fn() as any;

  const gameStateStore = new GameStateStore(scene, map, path);
  const time = 1000;
  const dt = 100;
  gameStateStore.updateSpawner(time, dt);

  expect(enemySpawnerMockHelper.get().update).toBeCalledTimes(1);
  expect(enemySpawnerMockHelper.get().update).toBeCalledWith(time, dt);
})
