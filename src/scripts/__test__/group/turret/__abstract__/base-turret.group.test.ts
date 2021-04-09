import { IGameStateStore } from '../../../../api/game-state/game-state-store.interface';
import { ITurretObject } from '../../../../api/object/turret-object/turret-object.interface';
import { Phaser } from '../../../../api/__helper__/phaser.export';
import { BaseTurretGroup } from '../../../../impl/group/turret/__abstract__/base-turret.group.abstract';
import { BaseGroup } from '../../../../impl/group/__abstract__/base.group.abstract';
import { MockHelper } from '../../../__helper__/mock.helper';

jest.mock('../../../../impl/group/__abstract__/base.group.abstract');
const baseGroupMockHelper = new MockHelper(BaseGroup.prototype)

beforeEach(() => {
    baseGroupMockHelper.reset()
})

test('Base turret group construct', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    class TestClass extends Phaser.GameObjects.GameObject implements ITurretObject {
        position!: Phaser.Math.Vector2;
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
        init(params: { position: Phaser.Math.Vector2; gameStateStore: IGameStateStore; ignoreUpdate?: boolean | undefined; }): void {
            throw new Error('Method not implemented.');
        }
        showRange(): void {
            throw new Error('Method not implemented.');
        }
        hideRange(): void {
            throw new Error('Method not implemented.');
        }
        remove(): void {
            throw new Error('Method not implemented.');
        }
    };

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const priceValueMock = 343;
    const tileValueMock = 22;

    const group: BaseTurretGroup<TestClass> = new class extends BaseTurretGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass, priceValueMock, tileValueMock);
        }
    }();

    expect(group != null).toBe(true);
    expect(baseGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, TestClass);
})

test('Base turret group get price', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    class TestClass extends Phaser.GameObjects.GameObject implements ITurretObject {
        position!: Phaser.Math.Vector2;
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
        init(params: { position: Phaser.Math.Vector2; gameStateStore: IGameStateStore; ignoreUpdate?: boolean | undefined; }): void {
            throw new Error('Method not implemented.');
        }
        showRange(): void {
            throw new Error('Method not implemented.');
        }
        hideRange(): void {
            throw new Error('Method not implemented.');
        }
        remove(): void {
            throw new Error('Method not implemented.');
        }
    };

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const priceValueMock = 343;
    const tileValueMock = 22;

    const group: BaseTurretGroup<TestClass> = new class extends BaseTurretGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass, priceValueMock, tileValueMock);
        }
    }();

    expect(group.getPrice()).toStrictEqual(priceValueMock);
})

test('Base turret group get tile value', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    class TestClass extends Phaser.GameObjects.GameObject implements ITurretObject {
        position!: Phaser.Math.Vector2;
        constructor(scene: Phaser.Scene) {
            super(scene, '')
        }
        init(params: { position: Phaser.Math.Vector2; gameStateStore: IGameStateStore; ignoreUpdate?: boolean | undefined; }): void {
            throw new Error('Method not implemented.');
        }
        showRange(): void {
            throw new Error('Method not implemented.');
        }
        hideRange(): void {
            throw new Error('Method not implemented.');
        }
        remove(): void {
            throw new Error('Method not implemented.');
        }
    };

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const priceValueMock = 343;
    const tileValueMock = 22;

    const group: BaseTurretGroup<TestClass> = new class extends BaseTurretGroup<TestClass> {
        constructor() {
            super(sceneMock, TestClass, priceValueMock, tileValueMock);
        }
    }();

    expect(group.getTile()).toStrictEqual(tileValueMock);
})
