import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { difficulties } from "./constants/difficulties";

describe("App Component", () => {
	test("renders Minesweeper title and difficulty selector", () => {
		render(<App />);
		expect(screen.getByText(/minesweeper/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
	});
	
	test("renders the gameboard with default easy difficulty", async () => {
		render(<App />);
		
		const { gridSize } = difficulties["easy"];
		const expectedCells = gridSize[0] * gridSize[1];
		
		await waitFor(() => {
			const cellElements = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cellElements.length).toBe(expectedCells);
		});
	});
	
	test("updates gameboard when difficulty is changed", async () => {
		render(<App />);
		
		const select = screen.getByLabelText(/difficulty/i);
		fireEvent.change(select, { target: { value: "medium" } });
		
		const { gridSize } = difficulties["medium"];
		const expectedCells = gridSize[0] * gridSize[1];
		
		await waitFor(() => {
			const cellElements = [
				...screen.getAllByTestId("cell"),
				...screen.getAllByTestId("cell-mine")
			];
			expect(cellElements.length).toBe(expectedCells);
		});
	});
});
