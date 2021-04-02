import { Phaser } from '../../../api/__helper__/phaser.export';
import { BaseScene } from '../../../impl/scene/__abstract__/base.scene.abstract';
import { MockHelper } from '../../__helper__/mock.helper';

jest.mock('phaser', () => ({
  Scene: jest.fn()
}));
const phaserSceneMockHelper = new MockHelper(Phaser.Scene.prototype)

beforeEach(() => {
  phaserSceneMockHelper.reset() 
})

test('Boot scene construct', () => {
  phaserSceneMockHelper.setup((proto) => {
  })

  const key = "VALAMI";
  const scene: BaseScene = new class extends BaseScene {
    public init(data: object): void {}
    public preload(): void {}
    public create(data: object): void {}
    public update(time: number, delta: number): void {}
  }(key);

  expect(scene != null).toBe(true);
  expect(phaserSceneMockHelper.get().constructor).toBeCalledTimes(1);
  expect(phaserSceneMockHelper.get().constructor).toBeCalledWith({key: key});
})
