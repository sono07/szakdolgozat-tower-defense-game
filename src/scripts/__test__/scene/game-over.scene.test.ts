import { Phaser } from '../../api/__helper__/phaser.export';
import { GameOverScene, GAME_OVER_SCENE_KEY } from '../../impl/scene/game-over.scene';
import { BaseScene } from '../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../__helper__/mock.helper';

jest.mock('../../impl/scene/__abstract__/base.scene.abstract');
const baseSceneMockHelper = new MockHelper(BaseScene.prototype)

beforeEach(() => {
  baseSceneMockHelper.reset() 
})

test('GameOver scene construct', () => {
  const scene = new GameOverScene();

  expect(scene != null).toBe(true);
  expect(baseSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(baseSceneMockHelper.get().constructor).toBeCalledWith(GAME_OVER_SCENE_KEY);
})

test('GameOver scene init', () => {
  const scene = new GameOverScene();
  scene.init({});
})

test('GameOver scene preload', () => {
  const scene = new GameOverScene();
  scene.preload();
})

test('GameOver scene create', () => {
  const scoreValue = 342;
  const rectangleOnClickMockFn = jest.fn();

  baseSceneMockHelper.setup((proto) => {
    proto.cameras.main.width = 0;
    proto.cameras.main.height = 0;
    proto.add.image = jest.fn((): any => ({
      setScale: jest.fn(),
      setAlpha: jest.fn(),
    }));
    proto.add.rectangle = jest.fn((): any => ({
      setOrigin: jest.fn(),
      setInteractive: jest.fn(),
      on: rectangleOnClickMockFn,
    }))
    proto.make.text = jest.fn((): any => ({
      setOrigin: jest.fn(),
    }));
  })

  
  const scene = new GameOverScene();
  scene.create({score: scoreValue});

  expect(baseSceneMockHelper.get().make.text).toBeCalledWith(expect.objectContaining({
    text: 'Score: ' + scoreValue
  }))
  expect(rectangleOnClickMockFn).toBeCalledWith(Phaser.Input.Events.POINTER_DOWN, expect.anything());
})

test('GameOver scene update', () => {
  const scene = new GameOverScene();
  scene.update(0, 0);
})
