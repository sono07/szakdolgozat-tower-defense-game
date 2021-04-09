import { Phaser } from "../../../api/__helper__/phaser.export";
import { EnergyBallOrangeGroup } from "../../../impl/group/projectiles/energy-ball-orange.group.class";
import { BaseGroup } from "../../../impl/group/__abstract__/base.group.abstract";
import { EnergyBallOrangeObject } from "../../../impl/object/projectile/moving-projectile/penetrating-moving-projectile/energy-ball-orange.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/__abstract__/base.group.abstract');
const baseGroupMockHelper = new MockHelper(BaseGroup.prototype)

beforeEach(() => {
    baseGroupMockHelper.reset()
})

test('Energy ball orange group construct', () => {
    baseGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new EnergyBallOrangeGroup(sceneMock);

    expect(group != null).toBe(true);
    expect(baseGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseGroupMockHelper.get().constructor).toBeCalledWith(sceneMock, EnergyBallOrangeObject);
})
