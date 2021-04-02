//@ts-expect-error
import { Phaser } from '../../api/__helper__/phaser.export';
import { BootScene, BOOT_SCENE_KEY } from '../../impl/scene/boot.scene';
import { PRELOAD_SCENE_KEY } from '../../impl/scene/preload.scene';
import { BaseScene } from '../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../__helper__/mock.helper';

jest.mock('../../impl/scene/__abstract__/base.scene.abstract');
const baseSceneMockHelper = new MockHelper(BaseScene.prototype)

beforeEach(() => {
  baseSceneMockHelper.reset() 
})

test('Boot scene construct', () => {
  const scene = new BootScene();

  expect(scene != null).toBe(true);
  expect(baseSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().constructor).toBeCalledWith(BOOT_SCENE_KEY);
})

test('Boot scene init', () => {
  const scene = new BootScene();
  scene.init({});
})

test('Boot scene preload', () => {
  baseSceneMockHelper.setup((proto) => {
    proto.load.image = jest.fn();
  })

  const scene = new BootScene();
  scene.preload();

  expect(baseSceneMockHelper.get().load.image).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().load.image).toHaveBeenCalledWith('background', 'images/background.png');
})

test('Boot scene create', () => {
  baseSceneMockHelper.setup((proto) => {
    proto.scene.start = jest.fn();
  })

  const scene = new BootScene();
  scene.create({});

  expect(baseSceneMockHelper.get().scene.start).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().scene.start).toHaveBeenCalledWith(PRELOAD_SCENE_KEY);
})

test('Boot scene update', () => {
  const scene = new BootScene();
  scene.update(0, 0);
})
