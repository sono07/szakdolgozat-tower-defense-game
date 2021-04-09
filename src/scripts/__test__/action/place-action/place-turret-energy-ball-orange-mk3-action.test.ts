import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { PlaceTurretEnergyBallOrangeMk3Action } from "../../../impl/action/place-action/place-turret-energy-ball-orange-mk3-action.class";
import { PlaceAction } from "../../../impl/action/place-action/__abstract__/place-action.abstract";
import { ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3 } from "../../../impl/game-constants";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/action/place-action/__abstract__/place-action.abstract');
const placeActionMockHelper = new MockHelper(PlaceAction.prototype)

beforeEach(() => {
    placeActionMockHelper.reset()
})

test('Test place turret energy ball orange mk3 construct', () => {
    placeActionMockHelper.setup((proto) => { })

    const group = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        turretEnergyBallOrangeMk3sGroup: group
    } as any))();

    const action = new PlaceTurretEnergyBallOrangeMk3Action(gameStateStore);

    expect(action != null).toStrictEqual(true);
    expect(placeActionMockHelper.get().constructor).toBeCalledTimes(1);
    expect(placeActionMockHelper.get().constructor).toBeCalledWith(gameStateStore, group);
})

test('Test place turret energy ball orange mk3 action key', () => {
    placeActionMockHelper.setup((proto) => { })

    const group = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        turretEnergyBallOrangeMk3sGroup: group
    } as any))();

    const action = new PlaceTurretEnergyBallOrangeMk3Action(gameStateStore);

    expect(action.actionKey).toStrictEqual(ACTION_KEY_PLACE_TURRET_ENERGY_BALL_ORANGE_MK3);  
})
