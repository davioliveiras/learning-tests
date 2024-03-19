import { Band } from "./band";
import { kiko, rafael } from "../libs/data-tests";
import { expect, test } from "vitest";


test('Create a band', () => {
    expect(() => {
        return new Band('Angra', 1991, 'Brazil', 'angra.net', [kiko])
    }).toThrow()
})