import { Phaser } from '../../api/__helper__/phaser.export';
import { IGameStateStore } from '../../api/game-state/game-state-store.interface';
import { EnemySpawner } from '../../impl/map/enemy-spawner.class';
import { ENEMY_BASE_HEALTH, ENEMY_EXTRA_COUNT_PER_WAVE, ENEMY_EXTRA_HEALTH_PER_WAVE, WAVE_SPAWN_DELAY_MS, WAVE_START_DELAY_MS } from '../../impl/game-config';

test('Test construct', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  expect(spawner != null).toBe(true);
})

test('Test no new wave started until enemies are alive', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: jest.fn(),
        //instantly die
        active: true,
        visible: true
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  //spawn other enemies
  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);
  }

  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(spawner.getWaveNumber()).toStrictEqual(1);

  // even after a lot of time
  dt = 10 * 60 * 1000; //10 mins
  time += dt;
  spawner.update(time, dt);

  expect(spawner.getWaveNumber()).toStrictEqual(1);
})

test('Test default wave number', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  expect(spawner.getWaveNumber()).toStrictEqual(0)
})

test('Test first wave number', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  expect(spawner.getWaveNumber()).toStrictEqual(1);
})

test('Test wave number after all enemies killed', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: jest.fn(),
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  //spawn other enemies
  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);
  }

  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(spawner.getWaveNumber()).toStrictEqual(2);
})

test('Test wave enemy number', () => {
  const enemyInitMockFn = jest.fn();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //1st wave init
  expect(spawner.getWaveEnemyNumber()).toStrictEqual(ENEMY_EXTRA_COUNT_PER_WAVE);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  //spawn other enemies
  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);
  }

  dt = 1;
  time += dt;
  spawner.update(time, dt);

  //second wave init
  expect(spawner.getWaveEnemyNumber()).toStrictEqual(2 * ENEMY_EXTRA_COUNT_PER_WAVE);
})

test('Test enemy health increase', () => {
  const enemyInitMockFn = jest.fn();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
    health: ENEMY_BASE_HEALTH
  }))

  //spawn other enemies
  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);

    expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
      health: ENEMY_BASE_HEALTH
    }))
  }

  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(ENEMY_EXTRA_COUNT_PER_WAVE);

  //second wave
  enemyInitMockFn.mockReset();

  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
    health: ENEMY_BASE_HEALTH
  }))

  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);

    expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
      health: ENEMY_BASE_HEALTH
    }))
  }

  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);

    expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
      health: ENEMY_BASE_HEALTH + ENEMY_EXTRA_HEALTH_PER_WAVE
    }))
  }
})

test('Test enemy count increase', () => {
  const enemyInitMockFn = jest.fn();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  //spawn other enemies
  for (let i = 0; i < ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);
  }

  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(ENEMY_EXTRA_COUNT_PER_WAVE);

  //second wave
  enemyInitMockFn.mockReset();

  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  for (let i = 0; i < 2*ENEMY_EXTRA_COUNT_PER_WAVE - 1; i++) {
    dt = WAVE_SPAWN_DELAY_MS;
    time += dt;
    spawner.update(time, dt);
  }

  expect(enemyInitMockFn).toBeCalledTimes(2*ENEMY_EXTRA_COUNT_PER_WAVE);
})

test('Test enemy proper path passed', () => {
  const enemyInitMockFn = jest.fn();
  const path = new Phaser.Curves.Path();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: path,
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(1);
  expect(enemyInitMockFn).toBeCalledWith(expect.objectContaining({
    path: path
  }))
})

test('Test enemy spawn delay', () => {
  const enemyInitMockFn = jest.fn();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //wait for wave start, it also spawns 1st enemy
  dt = WAVE_START_DELAY_MS;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(1);

  //slightly before second spawn
  dt = WAVE_SPAWN_DELAY_MS - 1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(1);

  //second spawn
  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(2);
})

test('Test wave start delay', () => {
  const enemyInitMockFn = jest.fn();
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path(),
    enemiesGroup: {
      get: jest.fn(() => ({
        init: enemyInitMockFn,
        //instantly die
        active: false,
        visible: false
      }))
    },
  } as any))();

  const spawner = new EnemySpawner(gameStateStore);

  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);

  //slightly before wave start
  dt = WAVE_START_DELAY_MS-1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(0);

  //wave start == first spawn
  dt = 1;
  time += dt;
  spawner.update(time, dt);

  expect(enemyInitMockFn).toBeCalledTimes(1);
})

test('Test waveNumberChangedCallback called', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path
  } as any))();
  const changedMockFn = jest.fn();

  const spawner = new EnemySpawner(gameStateStore);
  spawner.waveNumberChangedCallback.push(changedMockFn);
  expect(spawner.getWaveNumber()).toStrictEqual(0);
  
  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);
  expect(changedMockFn).toBeCalledTimes(1);
  expect(changedMockFn).toHaveBeenCalledWith(spawner.getWaveNumber());
})

test('Test waveEnemyNumberChangedCallback called', () => {
  const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
    path: new Phaser.Curves.Path
  } as any))();
  const changedMockFn = jest.fn();

  const spawner = new EnemySpawner(gameStateStore);
  spawner.waveEnemyNumberChangedCallback.push(changedMockFn);
  expect(spawner.getWaveEnemyNumber()).toStrictEqual(0);
  
  let dt = 1;
  let time = 0 + dt;
  spawner.update(time, dt);
  expect(changedMockFn).toBeCalledTimes(1);
  expect(changedMockFn).toHaveBeenCalledWith(spawner.getWaveEnemyNumber());
})
