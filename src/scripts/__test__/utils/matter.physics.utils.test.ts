import { convertOverlapParams } from "../../impl/utils/matter.physics.utils";

test('Test convertion', () => {
    let a = {type: "A"};
    let b = {type: "B"};

    let result = convertOverlapParams({gameObject: a}, {gameObject: b});

    expect(result.length).toBe(2);
    expect(result[0]).toBe(a);
    expect(result[1]).toBe(b);
})
