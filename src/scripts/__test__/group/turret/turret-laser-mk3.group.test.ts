import { Phaser } from "../../../api/__helper__/phaser.export";
import { TURRET_LASER_MK3_COST } from "../../../impl/game-config";
import { TILE_TURRET_LASER_MK3 } from "../../../impl/game-constants";
import { TurretLaserMk3Group } from "../../../impl/group/turret/turret-laser-mk3.group.class";
import { BaseTurretGroup } from "../../../impl/group/turret/__abstract__/base-turret.group.abstract";
import { TurretLaserMk3Object } from "../../../impl/object/turret/turret-laser-mk3.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/turret/__abstract__/base-turret.group.abstract');
const baseTurretGroupMockHelper = new MockHelper(BaseTurretGroup.prototype)

beforeEach(() => {
    baseTurretGroupMockHelper.reset()
})

test('Turret laser mk3 group construct', () => {
    baseTurretGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new TurretLaserMk3Group(sceneMock);

    expect(group != null).toBe(true);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledWith(
        sceneMock,
        TurretLaserMk3Object,
        TURRET_LASER_MK3_COST,
        TILE_TURRET_LASER_MK3
    );
})
