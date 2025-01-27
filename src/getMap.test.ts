/* eslint-env jest */
import {generateArray, addMines, validCoordinates, Coordinate, Grid} from './getMap'
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

describe('validCoordinates check: ', () => {
	const map = generateArray(mapSize)
	test.each([
		{x: 0, y: 0, expected: true},
		{x: 0, y: 1, expected: true},
		{x: 0, y: 2, expected: true},
		{x: 1, y: 0, expected: true},
		{x: 1, y: 1, expected: true},
		{x: 1, y: 2, expected: true},
		{x: 2, y: 0, expected: true},
		{x: 2, y: 1, expected: true},
		{x: 2, y: 2, expected: true},
		{x: 3, y: 0, expected: false},
		{x: 0, y: 3, expected: false},
	])('isValid coordinates, x: $x, y:$y => $expected', ({x, y, expected}) => {
		expect(validCoordinates(map, [x,y])).toBe(expected);
	});
});

describe('Adding mines: ', () => {
	let map: Grid, expectedResult: Grid ;
	beforeEach(() => {
		map = generateArray(mapSize)
		expectedResult = generateArray(mapSize)
	})
	describe('mine coordinates are valid', () => {
		beforeEach(() => {
			map = generateArray(mapSize)
			expectedResult = generateArray(mapSize)
		})
		test('mine coordinates 0,0', () => {
			addMines(map, [0,0])
			expectedResult[0][0] = "*";
			expectedResult[0][1] = 1;
			expectedResult[1][0] = 1;
			expectedResult[1][1] = 1;
			expect(map).toEqual(expectedResult);
		})
		test('mine coordinates 0,1', () => {
			addMines(map, [0,1])
			expectedResult[0][1] = "*";
			expectedResult[0][0] = 1;
			expectedResult[0][2] = 1;
			expectedResult[1][0] = 1;
			expectedResult[1][1] = 1;
			expectedResult[1][2] = 1;
			expect(map).toEqual(expectedResult);
		})
		test('mine coordinates 0,2', () => {
			addMines(map, [0,2])
			expectedResult[0][2] = "*";
			expectedResult[0][1] = 1;
			expectedResult[1][1] = 1;
			expectedResult[1][2] = 1;
			expect(map).toEqual(expectedResult);
		})
		
		test('mine coordinates 1,0', () => {
			addMines(map, [1,0])
			expectedResult[1][0] = "*";
			expectedResult[0][0] = 1;
			expectedResult[0][1] = 1;
			expectedResult[1][1] = 1;
			expectedResult[2][0] = 1;
			expectedResult[2][1] = 1;
			expect(map).toEqual(expectedResult);
		})
		
		test('mine coordinates 1,1', () => {
			addMines(map, [1,1])
			expectedResult[1][1] = "*";
			expectedResult[0][0] = 1;
			expectedResult[0][1] = 1;
			expectedResult[0][2] = 1;
			expectedResult[1][0] = 1;
			expectedResult[1][2] = 1;
			expectedResult[2][0] = 1;
			expectedResult[2][1] = 1;
			expectedResult[2][2] = 1;
			expect(map).toEqual(expectedResult);
		})
		
		test('mine coordinates 1,2', () => {
			addMines(map, [1,2])
			expectedResult[1][2] = "*";
			expectedResult[0][1] = 1;
			expectedResult[0][2] = 1;
			expectedResult[1][1] = 1;
			expectedResult[2][1] = 1;
			expectedResult[2][2] = 1;
			expect(map).toEqual(expectedResult);
		});
		
		test('mine coordinates 2,0', () => {
			addMines(map, [2,0])
			expectedResult[2][0] = "*";
			expectedResult[1][0] = 1;
			expectedResult[1][1] = 1;
			expectedResult[2][1] = 1;
			expect(map).toEqual(expectedResult);
		});
		
		test('mine coordinates 2,1', () => {
			addMines(map, [2,1])
			expectedResult[2][1] = "*";
			expectedResult[1][0] = 1;
			expectedResult[1][1] = 1;
			expectedResult[1][2] = 1;
			expectedResult[2][0] = 1;
			expectedResult[2][2] = 1;
			expect(map).toEqual(expectedResult);
		});
		
		test('mine coordinates 2,2', () => {
			addMines(map, [2,2])
			expectedResult[2][2] = "*";
			expectedResult[1][1] = 1;
			expectedResult[1][2] = 1;
			expectedResult[2][1] = 1;
			expect(map).toEqual(expectedResult);
		});
	});
	
	
	test('mine coordinates are invalid', () => {
		expect(() => addMines(map, [5,6])).toThrow(Error)
		expect(() => addMines(map, [5,6])).toThrow(`Invalid mine position: (5, 6)`);
		
		expect(() => addMines(map, [0,6])).toThrow(Error)
		expect(() => addMines(map, [8,1])).toThrow(Error)
		expect(() => addMines(map, [1,-1])).toThrow(Error)
	})
});







