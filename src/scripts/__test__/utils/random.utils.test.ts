import { genRandomStr } from "../../impl/utils/random.utils";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const testCount = 1_000;

test('Test characters included', () => {
    for (let i = 0; i < testCount; i++) {
        const result = genRandomStr(10);

        result.split("").forEach(char => {
            expect(chars.includes(char))
        })
    }
})

test('Test string randomness', () => {
    const strings: string[] = [];
    for (let i = 0; i < testCount; i++) {
        const result = genRandomStr(10);
        expect(!strings.includes(result))
        strings.push(result);
    }
})

test('Test string length', () => {
    for (let i = 0; i < testCount; i++) {
        const result = genRandomStr(i);

        expect(result.length).toBe(i);
    }
})