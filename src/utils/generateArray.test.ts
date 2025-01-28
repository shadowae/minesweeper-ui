import generateArray from "./generateArray.ts";
import {Coordinate, Grid} from "./getMap.tsx";

const mapSize: Coordinate = [3,3];
const templateMap: Grid = [
	[".", ".", "."],
	[".", ".", "."],
	[".", ".", "."]
]

describe('Init Stage: ', () => {
	test('create init array', () => {
		expect(generateArray([0, 0])).toEqual([]);
	});
	
	test('correct array of 4,3 is generated', () => {
		expect(generateArray(mapSize)).toEqual(templateMap);
	})
});
