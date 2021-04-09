import { Phaser } from "../../../api/__helper__/phaser.export";
import { TURRET_LASER_MK1_COST } from "../../../impl/game-config";
import { TILE_TURRET_LASER_MK1 } from "../../../impl/game-constants";
import { TurretLaserMk1Group } from "../../../impl/group/turret/turret-laser-mk1.group.class";
import { BaseTurretGroup } from "../../../impl/group/turret/__abstract__/base-turret.group.abstract";
import { TurretLaserMk1Object } from "../../../impl/object/turret/turret-laser-mk1.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/turret/__abstract__/base-turret.group.abstract');
const baseTurretGroupMockHelper = new MockHelper(BaseTurretGroup.prototype)

beforeEach(() => {
    baseTurretGroupMockHelper.reset()
})

test('Turret laser mk1 group construct', () => {
    baseTurretGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new TurretLaserMk1Group(sceneMock);

    expect(group != null).toBe(true);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledWith(
        sceneMock,
        TurretLaserMk1Object,
        TURRET_LASER_MK1_COST,
        TILE_TURRET_LASER_MK1
    );
})
