import { Phaser } from "../../api/__helper__/phaser.export";
import { EnemyGroup } from "../../impl/group/enemy.group.class";
import { BaseGroup } from "../../impl/group/__abstract__/base.group.abstract";
import { EnemyObject } from "../../impl/object/enemy/enemy.object.class";
import { MockHelper } from "../__helper__/mock.helper";

jest.mock('../../impl/group/__abstract__/base.group.abstract');
const baseGroupMockHelper = new MockHelper(BaseGroup.prototype)

beforeEach(() => {
    baseGroupMockHelper.reset()
})

test('Enemy group construct', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new EnemyGroup(sceneMock);

    expect(group != null).toBe(true);
    expect(baseGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, EnemyObject);
})
