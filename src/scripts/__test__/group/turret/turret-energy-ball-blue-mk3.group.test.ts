import { Phaser } from "../../../api/__helper__/phaser.export";
import { TURRET_ENERGY_BALL_BLUE_MK3_COST } from "../../../impl/game-config";
import { TILE_TURRET_ENERGY_BALL_BLUE_MK3 } from "../../../impl/game-constants";
import { TurretEnergyBallBlueMk3Group } from "../../../impl/group/turret/turret-energy-ball-blue-mk3.group.class";
import { BaseTurretGroup } from "../../../impl/group/turret/__abstract__/base-turret.group.abstract";
import { TurretEnergyBallBlueMk3Object } from "../../../impl/object/turret/turret-energy-ball-blue-mk3.object.class";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/group/turret/__abstract__/base-turret.group.abstract');
const baseTurretGroupMockHelper = new MockHelper(BaseTurretGroup.prototype)

beforeEach(() => {
    baseTurretGroupMockHelper.reset()
})

test('Turret energy ball blue mk3 group construct', () => {
    baseTurretGroupMockHelper.setup((proto) => {
    })

    const sceneMock = jest.fn<Phaser.Scene, any[]>((...args: any[]) => ({} as any))();
    const group = new TurretEnergyBallBlueMk3Group(sceneMock);

    expect(group != null).toBe(true);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledTimes(1);
    expect(baseTurretGroupMockHelper.get().constructor).toBeCalledWith(
        sceneMock,
        TurretEnergyBallBlueMk3Object,
        TURRET_ENERGY_BALL_BLUE_MK3_COST,
        TILE_TURRET_ENERGY_BALL_BLUE_MK3
    );
})
