import {describe, expect, test} from '@jest/globals';
import {Sample} from "./src/Sample.ts";

describe('sum module', () => {
    test('3 to equal 3', () => {
        expect(3).toEqual(3);
    });
});

describe("Sample test suite", () => {
    test("Initial test", () => {
        expect(2).toEqual(2);
    });
    test("hello world output", () => {
        let s = new Sample();
        expect(s.hello("Ivan")).toEqual("Hello Ivan");  
    });
});
