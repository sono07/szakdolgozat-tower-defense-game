import { Phaser } from '../../../api/__helper__/phaser.export';
import { ENEMY_HEALTH_BAR_BOX_Z_INDEX, ENEMY_HEALTH_BAR_BACKGROUND_INDICATOR_Z_INDEX, ENEMY_HEALTH_BAR_FOREGROUND_INDICATOR_Z_INDEX } from '../../../impl/game-constants';
import { HealthBarObject } from '../../../impl/object/misc/health-bar.object.class';

test('Test health bar object construct', () => {
    const setDepthMockFn = jest.fn();
    const setActiveMockFn = jest.fn();
    const setVisibleMockFn = jest.fn();
    const scene: Phaser.Scene = {
        add: {
            rectangle: jest.fn(() => ({
                setDepth: setDepthMockFn,
                setFillStyle: jest.fn(),
                setOrigin: jest.fn(),
                setActive: setActiveMockFn,
                setVisible: setVisibleMockFn,
            })) as any
        }
    } as any;

    const object = new HealthBarObject(scene);

    expect(object != null).toBe(true);

    expect(setDepthMockFn).toBeCalledTimes(3);
    expect(setDepthMockFn).toHaveBeenCalledWith(ENEMY_HEALTH_BAR_BOX_Z_INDEX);
    expect(setDepthMockFn).toHaveBeenCalledWith(ENEMY_HEALTH_BAR_BACKGROUND_INDICATOR_Z_INDEX);
    expect(setDepthMockFn).toHaveBeenCalledWith(ENEMY_HEALTH_BAR_FOREGROUND_INDICATOR_Z_INDEX);

    expect(setActiveMockFn).toBeCalledTimes(3);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(1, false);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(2, false);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(3, false);

    expect(setVisibleMockFn).toBeCalledTimes(3);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(1, false);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(2, false);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(3, false);
})

test('Test health bar object init', () => {
    const setDepthMockFn = jest.fn();
    const setActiveMockFn = jest.fn();
    const setVisibleMockFn = jest.fn();
    const setPositionMockFn = jest.fn();
    const setDisplaySizeMockFn = jest.fn();
    const scene: Phaser.Scene = {
        add: {
            rectangle: jest.fn(() => ({
                setDepth: setDepthMockFn,
                setFillStyle: jest.fn(),
                setOrigin: jest.fn(),
                setActive: setActiveMockFn,
                setVisible: setVisibleMockFn,
                setPosition: setPositionMockFn,
                setDisplaySize: setDisplaySizeMockFn,
            })) as any
        }
    } as any;

    const object = new HealthBarObject(scene);
    jest.resetAllMocks();
    object.init(new Phaser.Math.Vector2(20, 40), 200, 40, 1, 100, 50);

    expect(setPositionMockFn).toBeCalledTimes(3);
    expect(setPositionMockFn).toHaveBeenCalledWith(20, 40);
    expect(setPositionMockFn).toHaveBeenCalledWith((20 - 200/2 + 1), 40);

    expect(setDisplaySizeMockFn).toBeCalledTimes(3);
    expect(setDisplaySizeMockFn).toHaveBeenCalledWith(200, 40);
    expect(setDisplaySizeMockFn).toHaveBeenCalledWith((200-2*1) * (50/100), 40-2*1);

    expect(setActiveMockFn).toBeCalledTimes(3);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(1, true);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(2, true);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(3, true);

    expect(setVisibleMockFn).toBeCalledTimes(3);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(1, true);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(2, true);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(3, true);
})

test('Test health bar object update', () => {
    const setDepthMockFn = jest.fn();
    const setActiveMockFn = jest.fn();
    const setVisibleMockFn = jest.fn();
    const setPositionMockFn = jest.fn();
    const setDisplaySizeMockFn = jest.fn();
    const scene: Phaser.Scene = {
        add: {
            rectangle: jest.fn(() => ({
                setDepth: setDepthMockFn,
                setFillStyle: jest.fn(),
                setOrigin: jest.fn(),
                setActive: setActiveMockFn,
                setVisible: setVisibleMockFn,
                setPosition: setPositionMockFn,
                setDisplaySize: setDisplaySizeMockFn,
            })) as any
        }
    } as any;

    const object = new HealthBarObject(scene);
    object.init(new Phaser.Math.Vector2(20, 40), 200, 40, 1, 100, 50);
    jest.resetAllMocks();
    object.update(new Phaser.Math.Vector2(30, 50), 25);

    expect(setPositionMockFn).toBeCalledTimes(3);
    expect(setPositionMockFn).toHaveBeenCalledWith(30, 50);
    expect(setPositionMockFn).toHaveBeenCalledWith((30 - 200/2 + 1), 50);

    expect(setDisplaySizeMockFn).toBeCalledTimes(1);
    expect(setDisplaySizeMockFn).toHaveBeenCalledWith((200-2*1) * (25/100), 40-2*1);

    expect(setActiveMockFn).toBeCalledTimes(0);
    expect(setVisibleMockFn).toBeCalledTimes(0);
})

test('Test health bar object remove', () => {
    const setDepthMockFn = jest.fn();
    const setActiveMockFn = jest.fn();
    const setVisibleMockFn = jest.fn();
    const scene: Phaser.Scene = {
        add: {
            rectangle: jest.fn(() => ({
                setDepth: setDepthMockFn,
                setFillStyle: jest.fn(),
                setOrigin: jest.fn(),
                setActive: setActiveMockFn,
                setVisible: setVisibleMockFn,
            })) as any
        }
    } as any;

    const object = new HealthBarObject(scene);
    jest.resetAllMocks();
    object.remove();

    expect(setActiveMockFn).toBeCalledTimes(3);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(1, false);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(2, false);
    expect(setActiveMockFn).toHaveBeenNthCalledWith(3, false);

    expect(setVisibleMockFn).toBeCalledTimes(3);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(1, false);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(2, false);
    expect(setVisibleMockFn).toHaveBeenNthCalledWith(3, false);
})
