import { Phaser } from '../../../api/__helper__/phaser.export';
import { ENEMY_HEALTH_BAR_OFFSET_PX, ENEMY_Z_INDEX } from '../../../impl/game-constants';
import { BaseObject } from '../../../impl/object/__abstract__/base.object.abstract';
import { EnemyObject } from '../../../impl/object/enemy/enemy.object.class';
import { HealthBarObject } from '../../../impl/object/misc/health-bar.object.class';
import { MockHelper } from '../../__helper__/mock.helper';
import { ENEMY_DAMAGE_TO_PLAYER, ENEMY_MONEY_VALUE } from '../../../impl/game-config';

jest.mock('phaser', () => ({
    Physics: {
        Matter: {
            Sprite: jest.fn(),
        }
    },
    Math: {
        Vector2: jest.fn(),
        GetSpeed: jest.fn(),
        Angle: {
            BetweenPoints: jest.fn(),
        },
    }
}));
const phaserMatterSpriteMockHelper = new MockHelper(Phaser.Physics.Matter.Sprite.prototype);
const phaserVector2MockHelper = new MockHelper(Phaser.Math.Vector2.prototype);

jest.mock('../../../impl/object/__abstract__/base.object.abstract');
const baseObjectMockHelper = new MockHelper(BaseObject.prototype)

jest.mock('../../../impl/object/misc/health-bar.object.class');
const healthBarObjectMockHelper = new MockHelper(HealthBarObject.prototype)

jest.mock('../../../impl/game-config', () => {
    return {
        ENEMY_DAMAGE_TO_PLAYER: 22,
        ENEMY_MONEY_VALUE: 33,
    };
})

beforeEach(() => {
    jest.clearAllMocks();
    phaserMatterSpriteMockHelper.reset();
    phaserVector2MockHelper.reset();
    baseObjectMockHelper.reset();
    healthBarObjectMockHelper.reset();
})

test('Enemy object construct', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;
    })
    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    expect(object != null).toBe(true);
    expect(baseObjectMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseObjectMockHelper.get().constructor).toBeCalledWith(scene, "enemy", "001");

    expect(baseObjectMockHelper.get().setSensor).toBeCalledTimes(1);
    expect(baseObjectMockHelper.get().setSensor).toBeCalledWith(true);

    expect(baseObjectMockHelper.get().setDepth).toBeCalledTimes(1);
    expect(baseObjectMockHelper.get().setDepth).toBeCalledWith(ENEMY_Z_INDEX);

    expect(healthBarObjectMockHelper.get().constructor).toBeCalledTimes(1);
    expect(healthBarObjectMockHelper.get().constructor).toBeCalledWith(pScene);
})

test('Enemy object init', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;

        proto.init = jest.fn((params) => {
            if(params.cb) params.cb();
        })
        proto.play = jest.fn();
        proto.anims.timeScale = 0;
    })
    healthBarObjectMockHelper.setup((proto) => {
        proto.init = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    const pos = new Phaser.Math.Vector2(1,1);
    const path = {
        getPoint: jest.fn((a, b) => {b.x = pos.x; b.y = pos.y})
    };
    const gameStateStore = jest.fn();
    const cb = jest.fn();

    object.init({
        health: 2000,
        speed: 1000,
        path: path as any,
        gameStateStore: gameStateStore as any,
        cb: cb,
    })

    expect(baseObjectMockHelper.get().init).toBeCalledTimes(1);

    expect(object.health).toStrictEqual(2000);
    expect(object.speed).toStrictEqual(1000);
    expect(object.path).toStrictEqual(path);
    expect(object.pathT).toStrictEqual(0);
    expect(object.effects).toStrictEqual([]);

    expect(healthBarObjectMockHelper.get().init).toBeCalledTimes(1);
    expect(healthBarObjectMockHelper.get().init).toBeCalledWith(
        new Phaser.Math.Vector2(pos.x, pos.y - ENEMY_HEALTH_BAR_OFFSET_PX),
        expect.anything(),
        expect.anything(),
        expect.anything(),
        2000,
        2000,
    );

    expect(baseObjectMockHelper.get().play).toBeCalledTimes(1);
    expect(baseObjectMockHelper.get().play).toBeCalledWith(expect.objectContaining({
        key: 'enemy-walk-animation'
    }));

    expect(object.anims.timeScale).toStrictEqual(1);

    expect(object.position).toStrictEqual(pos);

    expect(cb).toBeCalledTimes(1);
})

test('Enemy object add effect', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;

        proto.init = jest.fn((params) => {
            if(params.cb) params.cb();
        })
        proto.play = jest.fn();
        proto.anims.timeScale = 0;
    })
    healthBarObjectMockHelper.setup((proto) => {
        proto.init = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    const pos = new Phaser.Math.Vector2(1,1);
    const path = {
        getPoint: jest.fn((a, b) => {b.x = pos.x; b.y = pos.y})
    };
    const gameStateStore = jest.fn();
    const cb = jest.fn();

    object.init({
        health: 2000,
        speed: 1000,
        path: path as any,
        gameStateStore: gameStateStore as any,
        cb: cb,
    })

    const effect = jest.fn();

    object.addEffect(effect as any);

    expect(object.effects).toContain(effect);
})

test('Enemy object update', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;

        proto.init = jest.fn((params) => {
            if(params.cb) params.cb();
        })
        proto.play = jest.fn();
        proto.anims.timeScale = 0;
        proto.remove = jest.fn();
    })
    healthBarObjectMockHelper.setup((proto) => {
        proto.init = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    const pos = new Phaser.Math.Vector2(1,1);
    const rot = new Phaser.Math.Vector2(0, 1);
    const path = {
        getPoint: jest.fn((a, b) => { b.x = pos.x; b.y = pos.y }),
        getLength: jest.fn(() => 31),
        getTangent: jest.fn((a, b) => { b.x = rot.x, b.y = rot.y}),
    };
    const gameStateStore = {
        receiveMoney: jest.fn(),
        receiveDamage: jest.fn(),
    };
    const cb = jest.fn();

    object.init({
        health: 2000,
        speed: 1000,
        path: path as any,
        gameStateStore: gameStateStore as any,
        cb: cb,
    })

    jest.clearAllMocks();

    object.speed = 500;
    object.health = 1250;
    pos.x = 777;
    pos.y = 888;
    (Phaser.Math.GetSpeed as jest.Mock).mockReturnValue(56);
    (Phaser.Math.Angle.BetweenPoints as jest.Mock).mockReturnValue(99);
    
    object.update(2933, 133);

    expect(Phaser.Math.GetSpeed).toBeCalledTimes(1);
    expect(Phaser.Math.GetSpeed).toBeCalledWith(500/31, 1)

    expect(object.pathT).toStrictEqual(0 + 56*133)

    expect(object.anims.timeScale).toStrictEqual(0.5);

    expect(path.getPoint).toBeCalledTimes(1);
    expect(path.getPoint).toBeCalledWith(56*133, expect.anything())
    expect(object.position).toStrictEqual(pos)

    expect(path.getPoint).toBeCalledTimes(1);
    expect(path.getPoint).toBeCalledWith(56*133, expect.anything())

    expect(path.getTangent).toBeCalledTimes(1);
    expect(path.getTangent).toBeCalledWith(object.pathT, expect.anything());
    expect(Phaser.Math.Angle.BetweenPoints).toBeCalledTimes(1);
    expect(Phaser.Math.Angle.BetweenPoints).toBeCalledWith(new Phaser.Math.Vector2(0, 0), rot)
    expect(object.rotation).toStrictEqual(99 - Math.PI/2)

    expect(healthBarObjectMockHelper.get().update).toBeCalledTimes(1);
    expect(healthBarObjectMockHelper.get().update).toBeCalledWith(
        new Phaser.Math.Vector2(pos.x, pos.y - ENEMY_HEALTH_BAR_OFFSET_PX),
        1250
    );
})

test('Enemy object update effect', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;

        proto.init = jest.fn((params) => {
            if(params.cb) params.cb();
        })
        proto.play = jest.fn();
        proto.anims.timeScale = 0;
        proto.remove = jest.fn();
    })
    healthBarObjectMockHelper.setup((proto) => {
        proto.init = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    const pos = new Phaser.Math.Vector2(1,1);
    const rot = new Phaser.Math.Vector2(0, 1);
    const path = {
        getPoint: jest.fn((a, b) => { b.x = pos.x; b.y = pos.y }),
        getLength: jest.fn(() => 31),
        getTangent: jest.fn((a, b) => { b.x = rot.x, b.y = rot.y}),
    };
    const gameStateStore = {
        receiveMoney: jest.fn(),
        receiveDamage: jest.fn(),
    };
    const cb = jest.fn();

    object.init({
        health: 2000,
        speed: 1000,
        path: path as any,
        gameStateStore: gameStateStore as any,
        cb: cb,
    })

    jest.clearAllMocks();

    const effect1Mck = {
        update: jest.fn(),
        isDestroyed: true,
    }

    const effect2Mck = {
        update: jest.fn(),
        isDestroyed: false,
    }

    object.speed = 500;
    object.health = 1250;
    object.effects.push(effect1Mck as any)
    object.effects.push(effect2Mck as any)
    pos.x = 777;
    pos.y = 888;
    (Phaser.Math.GetSpeed as jest.Mock).mockReturnValue(56);
    (Phaser.Math.Angle.BetweenPoints as jest.Mock).mockReturnValue(99);
    
    object.update(2933, 133);

    expect(effect1Mck.update).toBeCalledTimes(1);
    expect(effect1Mck.update).toBeCalledWith(2933, 133, object);
    expect(effect2Mck.update).toBeCalledTimes(1);
    expect(effect2Mck.update).toBeCalledWith(2933, 133, object);
    
    expect(object.effects).not.toContain(effect1Mck)
    expect(object.effects).toContain(effect2Mck)
})

test('Enemy object update die', () => {
    type TestCheckFnType = (removeMock: jest.Mock,  receiveMoneyMock: jest.Mock, receiveDamageMock: jest.Mock) => void;
    const testWithParameters = (newHealth: number, newPathT: number, check: TestCheckFnType) => {
        jest.clearAllMocks();

        const pScene = jest.fn();
        baseObjectMockHelper.setup((proto) => {
            proto.setSensor = jest.fn();
            proto.setDepth = jest.fn();
            (proto as any).scene = pScene;
    
            proto.init = jest.fn((params) => {
                if(params.cb) params.cb();
            })
            proto.play = jest.fn();
            proto.anims.timeScale = 0;
            proto.remove = jest.fn();
        })
        healthBarObjectMockHelper.setup((proto) => {
            proto.init = jest.fn();
        })
        phaserVector2MockHelper.setup((proto) => {
            (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
        })
    
        const scene: Phaser.Scene = jest.fn() as any;
    
        const object = new EnemyObject(scene);
    
        const pos = new Phaser.Math.Vector2(1,1);
        const rot = new Phaser.Math.Vector2(0, 1);
        const path = {
            getPoint: jest.fn((a, b) => { b.x = pos.x; b.y = pos.y }),
            getLength: jest.fn(() => 31),
            getTangent: jest.fn((a, b) => { b.x = rot.x, b.y = rot.y}),
        };
        const gameStateStore = {
            receiveMoney: jest.fn(),
            receiveDamage: jest.fn(),
        };
        const cb = jest.fn();
    
        object.init({
            health: 2000,
            speed: 1000,
            path: path as any,
            gameStateStore: gameStateStore as any,
            cb: cb,
        })
    
        jest.clearAllMocks();
    
        const effect1Mck = {
            update: jest.fn(),
            isDestroyed: true,
        }
    
        const effect2Mck = {
            update: jest.fn(),
            isDestroyed: false,
        }
    
        object.speed = 500;
        object.health = newHealth;
        object.pathT = newPathT;
        object.effects.push(effect1Mck as any)
        object.effects.push(effect2Mck as any)
        pos.x = 777;
        pos.y = 888;
        (Phaser.Math.GetSpeed as jest.Mock).mockReturnValue(0);
        (Phaser.Math.Angle.BetweenPoints as jest.Mock).mockReturnValue(99);
        
        jest.clearAllMocks();
        object.update(2933, 133);

        check(baseObjectMockHelper.get().remove as jest.Mock, gameStateStore.receiveMoney, gameStateStore.receiveDamage);
    }

    const checkDiesHealth: TestCheckFnType = (removeMock, receiveMoneyMock, receiveDamageMock) => {
        expect(removeMock).toBeCalledTimes(1);
        expect(receiveMoneyMock).toBeCalledTimes(1);
        expect(receiveMoneyMock).toBeCalledWith(ENEMY_MONEY_VALUE);
        expect(receiveDamageMock).toBeCalledTimes(0);
    }
    const checkDiesPathT: TestCheckFnType = (removeMock, receiveMoneyMock, receiveDamageMock) => {
        expect(removeMock).toBeCalledTimes(1);
        expect(receiveMoneyMock).toBeCalledTimes(0);
        expect(receiveDamageMock).toBeCalledTimes(1);
        expect(receiveDamageMock).toBeCalledWith(ENEMY_DAMAGE_TO_PLAYER);
    }
    const checkNothingHappen: TestCheckFnType = (removeMock, receiveMoneyMock, receiveDamageMock) => {
        expect(removeMock).toBeCalledTimes(0);
        expect(receiveMoneyMock).toBeCalledTimes(0);
        expect(receiveDamageMock).toBeCalledTimes(0);
    }

    testWithParameters(1, 0.5, checkNothingHappen);
    testWithParameters(0, 0.5, checkDiesHealth);
    testWithParameters(-1, 0.5, checkDiesHealth)

    testWithParameters(1, 0, checkNothingHappen);
    testWithParameters(1, 1, checkDiesPathT);
    testWithParameters(1, 1.1, checkDiesPathT)
})

test('Enemy object remove', () => {
    const pScene = jest.fn();
    baseObjectMockHelper.setup((proto) => {
        proto.setSensor = jest.fn();
        proto.setDepth = jest.fn();
        (proto as any).scene = pScene;

        proto.init = jest.fn((params) => {
            if(params.cb) params.cb();
        });
        proto.play = jest.fn();
        proto.anims.timeScale = 0;

        proto.remove = jest.fn((cb) => {
            if(cb) cb();
        });
        proto.stop = jest.fn();
    })
    healthBarObjectMockHelper.setup((proto) => {
        proto.init = jest.fn();
        proto.remove = jest.fn();
    })
    phaserVector2MockHelper.setup((proto) => {
        (proto.constructor as jest.Mock).mockImplementation((x, y) => ({x, y}))
    })

    const scene: Phaser.Scene = jest.fn() as any;

    const object = new EnemyObject(scene);

    const pos = new Phaser.Math.Vector2(1,1);
    const path = {
        getPoint: jest.fn((a, b) => {b.x = pos.x; b.y = pos.y})
    };
    const gameStateStore = jest.fn();
    const cb = jest.fn();

    object.init({
        health: 2000,
        speed: 1000,
        path: path as any,
        gameStateStore: gameStateStore as any,
        cb: cb,
    })

    object.remove();

    expect(baseObjectMockHelper.get().remove).toBeCalledTimes(1);
    expect(baseObjectMockHelper.get().stop).toBeCalledTimes(1);
    expect(healthBarObjectMockHelper.get().remove).toBeCalledTimes(1);
})
