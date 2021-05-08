import { Phaser } from '../../../api/__helper__/phaser.export';
import { BaseObject } from '../../../impl/object/__abstract__/base.object.abstract';
import { MockHelper } from '../../__helper__/mock.helper';

jest.mock('phaser', () => ({
    Physics: {
        Matter: {
            Sprite: jest.fn(),
        }
    },
    Math: {
        Vector2: jest.fn(),
    }
}));
const phaserMatterSpriteMockHelper = new MockHelper(Phaser.Physics.Matter.Sprite.prototype);
const phaserVector2MockHelper = new MockHelper(Phaser.Math.Vector2.prototype);

beforeEach(() => {
    phaserMatterSpriteMockHelper.reset();
    phaserVector2MockHelper.reset();
})

test('Test base object construct', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class extends BaseObject {
    }(scene, '1', '2', cb)

    expect(object != null).toStrictEqual(true);

    expect(phaserMatterSpriteMockHelper.get().constructor).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().constructor).toBeCalledWith(world, 0, 0, '1', '2');

    expect(phaserVector2MockHelper.get().constructor).toBeCalledTimes(1);
    expect(phaserVector2MockHelper.get().constructor).toBeCalledWith(11, 22);

    expect(phaserMatterSpriteMockHelper.get().setSensor).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setSensor).toBeCalledWith(true);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith(object);
})

test('Test base object get pos', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    expect(object.position).toStrictEqual(new Phaser.Math.Vector2(11, 22))
})

test('Test base object set pos', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    object.position = new Phaser.Math.Vector2(33, 44);

    expect(object.position).toStrictEqual(new Phaser.Math.Vector2(33, 44))
    expect(object.x).toStrictEqual(33);
    expect(object.y).toStrictEqual(44);
})

test('Test base object set pos 2', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setPosition = jest.fn();
        proto.setSensor = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    object.setPosition(33, 44)

    expect(object.position).toStrictEqual(new Phaser.Math.Vector2(33, 44))
    expect(object.x).toStrictEqual(33);
    expect(object.y).toStrictEqual(44);
})

test('Test base object init', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
        proto.setPosition = jest.fn();

        proto.setActive = jest.fn();
        proto.setVisible = jest.fn();
        proto.scene.matter.world.add = jest.fn();
        proto.scene.matter.world.remove = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    jest.resetAllMocks();
    object.init({cb})

    expect(cb).toBeCalledTimes(1);

    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledWith(true);

    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledWith(true);

    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.add).toBeCalledTimes(0);
    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.remove).toBeCalledTimes(0);
})

test('Test base object init & remove', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
        proto.setPosition = jest.fn();

        proto.setActive = jest.fn();
        proto.setVisible = jest.fn();
        proto.scene.matter.world.add = jest.fn();
        proto.scene.matter.world.remove = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    object.init({cb})
    jest.resetAllMocks();

    object.remove(cb);

    expect(cb).toBeCalledTimes(1);

    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledWith(false);

    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledWith(false);

    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.add).toBeCalledTimes(0);

    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.remove).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.remove).toBeCalledWith(object.body);
})

test('Test base object init & remove & init', () => {
    phaserMatterSpriteMockHelper.setup((proto) => {
        proto.x = 11;
        proto.y = 22;
        proto.setSensor = jest.fn();
        proto.setPosition = jest.fn();

        proto.setActive = jest.fn();
        proto.setVisible = jest.fn();
        proto.scene.matter.world.add = jest.fn();
        proto.scene.matter.world.remove = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const world = jest.fn();
    const cb = jest.fn();
    const scene: Phaser.Scene = {
        matter: {
            world: world,
        }
    } as any;

    const object: BaseObject = new class TestClass extends BaseObject {
    }(scene, '1', '2', cb)

    object.init({cb})
    object.remove(cb);

    jest.resetAllMocks();
    object.init({cb})


    expect(cb).toBeCalledTimes(1);

    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setActive).toBeCalledWith(true);

    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().setVisible).toBeCalledWith(true);

    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.add).toBeCalledTimes(1);
    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.add).toBeCalledWith(object.body);
    
    expect(phaserMatterSpriteMockHelper.get().scene.matter.world.remove).toBeCalledTimes(0);
})
