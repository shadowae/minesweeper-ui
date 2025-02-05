import { render, screen, waitFor } from "@testing-library/react";
import Gameboard from "./Gameboard";
import { Coordinate } from "./utils/getMap";

describe("Gameboard Component", () => {
	test("renders a 3x3 grid with 1 mine and all non-mine cells are hidden", async () => {
		const gridSize: [number, number] = [3, 3];
		const minePositions: Coordinate[] = [[1, 1]];
		
		render(<Gameboard gridSize={gridSize} minePositions={minePositions} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(9);
		});
		
		const nonMineCells = screen.getAllByTestId("cell");
		const distribution: Record<string, number> = {};
		nonMineCells.forEach((cell) => {
			const content = cell.textContent || "";
			distribution[content] = (distribution[content] || 0) + 1;
		});
		
		expect(nonMineCells.length).toBe(8);
		// Since all non-mine cells are hidden, their content is ""
		expect(distribution[""]).toBe(8);
	});
	
	test("renders a 5x5 grid with 2 mines and all non-mine cells are hidden", async () => {
		render(<Gameboard gridSize={[5, 5]} minePositions={[[1, 1], [3, 3]]} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(25);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(2);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(23);
		
		const distribution: Record<string, number> = {};
		nonMineCells.forEach((cell) => {
			const content = cell.textContent || "";
			distribution[content] = (distribution[content] || 0) + 1;
		});
		
		expect(distribution[""]).toBe(23);
	});
	
	test("renders a 7x7 grid with 3 mines and all non-mine cells are hidden", async () => {
		render(<Gameboard gridSize={[7, 7]} minePositions={[[1, 1], [3, 3], [5, 5]]} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(49);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(3);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(46);
		
		const distribution: Record<string, number> = {};
		nonMineCells.forEach((cell) => {
			const content = cell.textContent || "";
			distribution[content] = (distribution[content] || 0) + 1;
		});
		
		expect(distribution[""]).toBe(46);
	});
	
	test("renders an 8x8 grid with 5 mines and all non-mine cells are hidden", async () => {
		render(<Gameboard gridSize={[8, 8]} minePositions={[[1, 1], [5, 5], [4, 3], [4, 4], [4, 5]]} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(64);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(5);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(59);
		
		const distribution: Record<string, number> = {};
		nonMineCells.forEach((cell) => {
			const content = cell.textContent || "";
			distribution[content] = (distribution[content] || 0) + 1;
		});
		
		expect(distribution[""]).toBe(59);
	});
});
