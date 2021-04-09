import { Phaser } from '../../../api/__helper__/phaser.export';
import { BaseGroup } from '../../../impl/group/__abstract__/base.group.abstract';
import { MockHelper } from '../../__helper__/mock.helper';

jest.mock('phaser', () => ({
    GameObjects: {
        GameObject: jest.fn(),
        Group: jest.fn(),
    }
}));
const phaserGroupMockHelper = new MockHelper(Phaser.GameObjects.Group.prototype)

beforeEach(() => {
    phaserGroupMockHelper.reset()
})

test('Base group construct', () => {
    phaserGroupMockHelper.setup((proto) => {
    })

    class TestClass extends Phaser.GameObjects.GameObject {
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
    };

    const updateListAddMockFn = jest.fn();
    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({
        sys: {
            updateList: {
                add: updateListAddMockFn
            }
        }
    } as any))();

    const group: BaseGroup<TestClass> = new class extends BaseGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass);
        }
    }();

    expect(group != null).toBe(true);
    expect(phaserGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(phaserGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, expect.objectContaining({
        runChildUpdate: true,
        classType: TestClass
    }));
    expect(updateListAddMockFn).toBeCalledTimes(1);
    expect(updateListAddMockFn).toBeCalledWith(group)
})

test('Base group get', () => {
    phaserGroupMockHelper.setup((proto) => {
        proto.get = jest.fn();
    })

    class TestClass extends Phaser.GameObjects.GameObject {
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
    };

    const updateListAddMockFn = jest.fn();
    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({
        sys: {
            updateList: {
                add: updateListAddMockFn
            }
        }
    } as any))();

    const group: BaseGroup<TestClass> = new class extends BaseGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass);
        }
    }();

    group.get();

    expect(phaserGroupMockHelper.get().get).toBeCalledTimes(1);
    expect(phaserGroupMockHelper.get().get).toBeCalledWith(undefined, undefined, undefined, undefined, undefined);

    group.get(1, 2, "3", "4", true);

    expect(phaserGroupMockHelper.get().get).toBeCalledTimes(2);
    expect(phaserGroupMockHelper.get().get).toBeCalledWith(1, 2, "3", "4", true);
})

test('Base group getChildren', () => {
    phaserGroupMockHelper.setup((proto) => {
        proto.getChildren = jest.fn();
    })

    class TestClass extends Phaser.GameObjects.GameObject {
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
    };

    const updateListAddMockFn = jest.fn();
    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({
        sys: {
            updateList: {
                add: updateListAddMockFn
            }
        }
    } as any))();

    const group: BaseGroup<TestClass> = new class extends BaseGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass);
        }
    }();

    group.getChildren();

    expect(phaserGroupMockHelper.get().getChildren).toBeCalledTimes(1);
    expect(phaserGroupMockHelper.get().getChildren).toBeCalledWith();
})
