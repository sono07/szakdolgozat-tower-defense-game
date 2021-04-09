import { BaseCloneable } from "../../impl/common/cloneable.abstract";
import { MockHelper } from "../__helper__/mock.helper";

class TestClass extends BaseCloneable {
    public copy(obj: this): this {
        throw new Error("Method not implemented.");
    }
}

const testClassMockHelper = new MockHelper(TestClass.prototype)

beforeEach(() => {
    testClassMockHelper.reset()
})

test('Base cloneable clone', () => {
    testClassMockHelper.setup((proto) => {
        proto.copy = jest.fn();
    })

    const instance: BaseCloneable = new TestClass();
    expect(instance != null).toStrictEqual(true);

    const cloneInstance = instance.clone();
    expect(cloneInstance != null).toStrictEqual(true);
    expect(testClassMockHelper.get().copy).toBeCalledTimes(1);
    expect(testClassMockHelper.get().copy).toBeCalledWith(instance);
})
