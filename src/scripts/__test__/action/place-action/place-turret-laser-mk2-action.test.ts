import { IGameStateStore } from "../../../api/game-state/game-state-store.interface";
import { PlaceTurretLaserMk2Action } from "../../../impl/action/place-action/place-turret-laser-mk2-action.class";
import { PlaceAction } from "../../../impl/action/place-action/__abstract__/place-action.abstract";
import { ACTION_KEY_PLACE_TURRET_LASER_MK2 } from "../../../impl/game-constants";
import { MockHelper } from "../../__helper__/mock.helper";

jest.mock('../../../impl/action/place-action/__abstract__/place-action.abstract');
const placeActionMockHelper = new MockHelper(PlaceAction.prototype)

beforeEach(() => {
    placeActionMockHelper.reset()
})

test('Test place turret laser mk2 construct', () => {
    placeActionMockHelper.setup((proto) => { })

    const group = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        turretLaserMk2sGroup: group
    } as any))();

    const action = new PlaceTurretLaserMk2Action(gameStateStore);

    expect(action != null).toStrictEqual(true);
    expect(placeActionMockHelper.get().constructor).toBeCalledTimes(1);
    expect(placeActionMockHelper.get().constructor).toBeCalledWith(gameStateStore, group);
})

test('Test place turret laser mk2 action key', () => {
    placeActionMockHelper.setup((proto) => { })

    const group = jest.fn();
    const gameStateStore = jest.fn<IGameStateStore, any[]>((...args: any[]) => ({
        turretLaserMk2sGroup: group
    } as any))();

    const action = new PlaceTurretLaserMk2Action(gameStateStore);

    expect(action.actionKey).toStrictEqual(ACTION_KEY_PLACE_TURRET_LASER_MK2);  
})
