import { Phaser } from '../../api/__helper__/phaser.export';
import { MAIN_MENU_SCENE_KEY } from '../../impl/scene/main-menu.scene';
import { PreloadScene, PRELOAD_SCENE_KEY } from '../../impl/scene/preload.scene';
import { BaseScene } from '../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../__helper__/mock.helper';

jest.mock('../../impl/scene/__abstract__/base.scene.abstract');
const baseSceneMockHelper = new MockHelper(BaseScene.prototype)

beforeEach(() => {
  baseSceneMockHelper.reset() 
})

test('Preload scene construct', () => {
  const scene = new PreloadScene();

  expect(scene != null).toBe(true);
  expect(baseSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().constructor).toBeCalledWith(PRELOAD_SCENE_KEY);
})

test('Preload scene init', () => {
  baseSceneMockHelper.setup((proto) => {
    proto.cameras.main.width = 0;
    proto.cameras.main.height = 0;
    proto.add.image = jest.fn((): any => ({
      setScale: jest.fn(),
      setAlpha: jest.fn(),
    }));
    proto.add.graphics = jest.fn((): any => ({
      fillStyle: jest.fn(),
      fillRect: jest.fn(),
    }));

    proto.make.text = jest.fn((): any => ({
      setOrigin: jest.fn(),
    }));

    proto.load.on = jest.fn();
  })

  const scene = new PreloadScene();
  scene.init({});

  expect(baseSceneMockHelper.get().load.on).toBeCalledTimes(2);
  expect(baseSceneMockHelper.get().load.on).toBeCalledWith(Phaser.Loader.Events.PROGRESS, expect.anything(), expect.anything());
  expect(baseSceneMockHelper.get().load.on).toBeCalledWith(Phaser.Loader.Events.FILE_PROGRESS, expect.anything(), expect.anything());
})

test('Preload scene preload', () => {
  baseSceneMockHelper.setup((proto) => {
    proto.load.html = jest.fn();
    proto.load.atlas = jest.fn();
  })

  const scene = new PreloadScene();
  scene.preload();

  expect(baseSceneMockHelper.get().load.html).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().load.html).toBeCalledWith('seed-input', 'seed-input/seed-input.html');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledTimes(10);
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('ui', 'images/spritesheets/ui/ui.spritesheet.png', 'images/spritesheets/ui/ui.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('enemy', 'images/spritesheets/enemy/enemy.spritesheet.png', 'images/spritesheets/enemy/enemy.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('terrain-tiles', 'images/spritesheets/terrain/terrain-light-grass.spritesheet.png', 'images/spritesheets/terrain/terrain-light-grass.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('turret-bases', 'images/spritesheets/turret/turret-base.spritesheet.png', 'images/spritesheets/turret/turret-base.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('turret-weapons', 'images/spritesheets/turret/turret-weapon.spritesheet.png', 'images/spritesheets/turret/turret-weapon.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('projectile-bullet', 'images/spritesheets/projectile/projectile-bullet.spritesheet.png', 'images/spritesheets/projectile/projectile-bullet.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('projectile-laser', 'images/spritesheets/projectile/projectile-laser.spritesheet.png', 'images/spritesheets/projectile/projectile-laser.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('projectile-energy-ball-orange', 'images/spritesheets/projectile/projectile-energy-ball-orange.spritesheet.png', 'images/spritesheets/projectile/projectile-energy-ball-orange.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('projectile-energy-ball-blue', 'images/spritesheets/projectile/projectile-energy-ball-blue.spritesheet.png', 'images/spritesheets/projectile/projectile-energy-ball-blue.spritesheet.json');
  expect(baseSceneMockHelper.get().load.atlas).toBeCalledWith('projectile-rocket', 'images/spritesheets/projectile/projectile-rocket.spritesheet.png', 'images/spritesheets/projectile/projectile-rocket.spritesheet.json');
})

test('Preload scene create', () => {
  baseSceneMockHelper.setup((proto) => {
    proto.anims.generateFrameNames = jest.fn();
    
    proto.anims.create = jest.fn();
    proto.scene.start = jest.fn();
  })

  
  const scene = new PreloadScene();
  scene.create({});

  expect(baseSceneMockHelper.get().anims.create).toBeCalledTimes(6);
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'enemy-walk-animation' }))
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'projectile-bullet-blow-animation'}))
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'projectile-laser-blow-animation'}))
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'projectile-energy-ball-orange-blow-animation'}))
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'projectile-energy-ball-blue-blow-animation'}))
  expect(baseSceneMockHelper.get().anims.create).toBeCalledWith(expect.objectContaining({ key: 'projectile-rocket-blow-animation'}))
  expect(baseSceneMockHelper.get().scene.start).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().scene.start).toBeCalledWith(MAIN_MENU_SCENE_KEY);
})

test('Preload scene update', () => {
  const scene = new PreloadScene();
  scene.update(0, 0);
})
