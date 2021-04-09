import { Phaser } from "../../../api/__helper__/phaser.export";
import { TURRET_ROCKET_MK1_COST } from "../../../impl/game-config";
import { TILE_TURRET_ROCKET_MK1 } from "../../../impl/game-constants";
import { TurretRocketMk1Group } from "../../../impl/group/turret/turret-rocket-mk1.group.class";
import { BaseTurretGroup } from "../../../impl/group/turret/__abstract__/base-turret.group.abstract";
import { TurretRocketMk1Object } from "../../../impl/object/turret/turret-rocket-mk1.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/turret/__abstract__/base-turret.group.abstract');
const baseTurretGroupMockHelper = new MockHelper(BaseTurretGroup.prototype)

beforeEach(() => {
    baseTurretGroupMockHelper.reset()
})

test('Turret rocket mk1 group construct', () => {
    baseTurretGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new TurretRocketMk1Group(sceneMock);

    expect(group != null).toBe(true);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledWith(
        sceneMock,
        TurretRocketMk1Object,
        TURRET_ROCKET_MK1_COST,
        TILE_TURRET_ROCKET_MK1
    );
})
