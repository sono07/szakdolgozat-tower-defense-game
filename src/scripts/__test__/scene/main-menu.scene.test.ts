import { Phaser } from '../../api/__helper__/phaser.export';
import { MainMenuScene, MAIN_MENU_SCENE_KEY } from '../../impl/scene/main-menu.scene';
import { BaseScene } from '../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../__helper__/mock.helper';

jest.mock('../../impl/scene/__abstract__/base.scene.abstract');
const baseSceneMockHelper = new MockHelper(BaseScene.prototype)

beforeEach(() => {
  baseSceneMockHelper.reset() 
})

test('MainMenu scene construct', () => {
  const scene = new MainMenuScene();

  expect(scene != null).toBe(true);
  expect(baseSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().constructor).toBeCalledWith(MAIN_MENU_SCENE_KEY);
})

test('MainMenu scene init', () => {
  const mokcFn = jest.fn();

  baseSceneMockHelper.setup((proto) => {
    proto.cameras.main.width = 0;
    proto.cameras.main.height = 0;
    proto.add.image = jest.fn((): any => ({
      setScale: jest.fn(),
      setAlpha: jest.fn(),
    }));
    proto.add.dom = jest.fn((): any => ({
      createFromCache: jest.fn((): any => ({
        setOrigin: jest.fn(),
        getChildByID: jest.fn((): any => ({
          addEventListener: jest.fn(),
        })),
      }))
    }))
    proto.add.rectangle = jest.fn((): any => ({
      setOrigin: jest.fn(),
      setInteractive: jest.fn(),
      on: mokcFn,
    }))
    proto.make.text = jest.fn((): any => ({
      setOrigin: jest.fn(),
    }));
  })

  const scene = new MainMenuScene();
  scene.init({});

  expect(mokcFn).toBeCalledWith(Phaser.Input.Events.POINTER_DOWN, expect.anything());
})

test('MainMenu scene preload', () => {
  const scene = new MainMenuScene();
  scene.preload();
})

test('MainMenu scene create', () => {
  const scene = new MainMenuScene();
  scene.create({});
})

test('MainMenu scene update', () => {
  const scene = new MainMenuScene();
  scene.update(0, 0);
})
