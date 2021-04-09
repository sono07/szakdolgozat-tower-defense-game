import { Phaser } from "../../../api/__helper__/phaser.export";
import { RocketGroup } from "../../../impl/group/projectiles/rocket.group.class";
import { BaseGroup } from "../../../impl/group/__abstract__/base.group.abstract";
import { RocketObject } from "../../../impl/object/projectile/moving-projectile/rocket.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/__abstract__/base.group.abstract');
const baseGroupMockHelper = new MockHelper(BaseGroup.prototype)

beforeEach(() => {
    baseGroupMockHelper.reset()
})

test('Rocket group construct', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new RocketGroup(sceneMock);

    expect(group != null).toBe(true);
    expect(baseGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, RocketObject);
})
