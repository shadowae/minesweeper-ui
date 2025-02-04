import { render, screen, waitFor } from "@testing-library/react";
import Gameboard from "./Gameboard";

describe("Gameboard Component", () => {
	test("renders a 3x3 grid with 1 mine correctly", async () => {
		// Configure a 3x3 grid with one mine at [1, 1]
		render(<Gameboard gridSize={[3, 3]} minePositions={[[1, 1]]} />);
		
		// Wait for the useEffect to run and the grid to be rendered.
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(9);
		});
		
		// Assert the mine count is correct
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(1);
	});
	
	test("renders a 5x5 grid with 2 mines correctly", async () => {
		// Configure a 5x5 grid with mines at [1,1] and [3,3]
		render(<Gameboard gridSize={[5, 5]} minePositions={[[1, 1], [3, 3]]} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(25);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(2);
	});
	
	test("renders a 7x7 grid with 3 mines correctly", async () => {
		// Configure a 7x7 grid with mines at [1,1], [3,3] and [5,5]
		render(<Gameboard gridSize={[7, 7]} minePositions={[[1, 1], [3, 3], [5, 5]]} />);
		
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(49);
		});
		
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(3);
	});
});
