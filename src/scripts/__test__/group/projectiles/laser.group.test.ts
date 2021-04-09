import { Phaser } from "../../../api/__helper__/phaser.export";
import { LaserGroup } from "../../../impl/group/projectiles/laser.group.class";
import { BaseGroup } from "../../../impl/group/__abstract__/base.group.abstract";
import { LaserObject } from "../../../impl/object/projectile/laser.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/__abstract__/base.group.abstract');
const baseGroupMockHelper = new MockHelper(BaseGroup.prototype)

beforeEach(() => {
    baseGroupMockHelper.reset()
})

test('Laser group construct', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new LaserGroup(sceneMock);

    expect(group != null).toBe(true);
    expect(baseGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, LaserObject);
})
