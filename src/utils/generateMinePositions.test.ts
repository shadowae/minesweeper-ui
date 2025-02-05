// generateMinePositions.test.ts
import { generateMinePositions } from "./generateMinePositions";

describe("generateMinePositions", () => {
	test("returns the correct number of mine positions", () => {
		const gridSize: [number, number] = [5, 5];
		const numMines = 5;
		const positions = generateMinePositions(gridSize, numMines);
		expect(positions.length).toBe(numMines);
	});
	
	test("returns unique mine positions", () => {
		const gridSize: [number, number] = [5, 5];
		const numMines = 10;
		const positions = generateMinePositions(gridSize, numMines);
		
		const uniquePositions = new Set(positions.map(([row, col]) => `${row},${col}`));
		expect(uniquePositions.size).toBe(numMines);
	});
	
	test("all generated positions are within the grid bounds", () => {
		const gridSize: [number, number] = [5, 5];
		const numMines = 5;
		const positions = generateMinePositions(gridSize, numMines);
		
		positions.forEach(([row, col]) => {
			expect(row).toBeGreaterThanOrEqual(0);
			expect(row).toBeLessThan(gridSize[0]);
			expect(col).toBeGreaterThanOrEqual(0);
			expect(col).toBeLessThan(gridSize[1]);
		});
	});
	
	test("handles a grid with a single cell", () => {
		const gridSize: [number, number] = [1, 1];
		const numMines = 1;
		const positions = generateMinePositions(gridSize, numMines);
		expect(positions).toEqual([[0, 0]]);
	});
	
	test("returns an empty array if no mines are requested", () => {
		const gridSize: [number, number] = [5, 5];
		const numMines = 0;
		const positions = generateMinePositions(gridSize, numMines);
		expect(positions.length).toBe(0);
	});
});
