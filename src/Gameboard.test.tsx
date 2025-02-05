// Gameboard.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Gameboard from "./Gameboard";
import { Coordinate } from "./utils/getMap";

describe("Gameboard Component", () => {
	test("renders a 3x3 grid with 1 mine and all non-mine cells are hidden", async () => {
		const gridSize: [number, number] = [3, 3];
		const minePositions: Coordinate[] = [[1, 1]];
		
		render(<Gameboard gridSize={gridSize} minePositions={minePositions} />);
		
		await waitFor(() => {
			const cells = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cells.length).toBe(9);
		});
		
		const nonMineCells = screen.getAllByTestId("cell");
		// Initially, every non-mine cell is hidden so its text is empty.
		nonMineCells.forEach((cell) => {
			expect(cell.textContent).toBe("");
			expect(cell).toHaveStyle("background-color: rgb(128, 128, 128)");
		});
	});
	
	test("renders a 5x5 grid with 2 mines and all non-mine cells are hidden", async () => {
		render(<Gameboard gridSize={[5, 5]} minePositions={[[1, 1], [3, 3]]} />);
		
		await waitFor(() => {
			const cells = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cells.length).toBe(25);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(2);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(23);
		
		nonMineCells.forEach((cell) => {
			expect(cell.textContent).toBe("");
			expect(cell).toHaveStyle("background-color: rgb(128, 128, 128)");
		});
	});
	
	test("renders a 7x7 grid with 3 mines and all non-mine cells are hidden", async () => {
		render(<Gameboard gridSize={[7, 7]} minePositions={[[1, 1], [3, 3], [5, 5]]} />);
		
		await waitFor(() => {
			const cells = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cells.length).toBe(49);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(3);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(46);
		
		nonMineCells.forEach((cell) => {
			expect(cell.textContent).toBe("");
			expect(cell).toHaveStyle("background-color: rgb(128, 128, 128)");
		});
	});
	
	test("renders an 8x8 grid with 5 mines and all non-mine cells are hidden", async () => {
		render(
			<Gameboard
				gridSize={[8, 8]}
				minePositions={[[1, 1], [5, 5], [4, 3], [4, 4], [4, 5]]}
			/>
		);
		
		await waitFor(() => {
			const cells = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cells.length).toBe(64);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(5);
		
		const nonMineCells = screen.getAllByTestId("cell");
		expect(nonMineCells.length).toBe(59);
		
		nonMineCells.forEach((cell) => {
			expect(cell.textContent).toBe("");
			expect(cell).toHaveStyle("background-color: rgb(128, 128, 128)");
		});
	});
	
	test("left click reveals a non-mine cell", async () => {
		const gridSize: [number, number] = [3, 3];
		const minePositions: Coordinate[] = []; // no mines
		
		render(<Gameboard gridSize={gridSize} minePositions={minePositions} />);
		
		await waitFor(() => {
			const cells = [
				...screen.getAllByTestId("cell"),
				...screen.queryAllByTestId("cell-mine")
			];
			expect(cells.length).toBe(9);
		});
		
		const cell00 = screen.getAllByTestId("cell")[0];
		expect(cell00).toHaveStyle("background-color: rgb(128, 128, 128)");
		
		fireEvent.click(cell00);
		
		await waitFor(() => {
			expect(cell00).toHaveStyle("background-color: rgb(255, 218, 185)");
		});
		
		// Optionally, if getMap returns a number or non "." value for the cell,
		// you could check that cell00.textContent is not empty. For now, we assume it may be empty.
	});
});
