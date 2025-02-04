import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";

describe("App Component", () => {
	test("renders the Minesweeper title", () => {
		render(<App />);
		const title = screen.getByText(/minesweeper/i);
		expect(title).toBeInTheDocument();
	});
	
	test("renders the game board with the correct number of cells", async () => {
		render(<App />);
		
		// Wait for GameBoard's useEffect to complete and the grid to be rendered
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(9); // 3 x 3 grid = 9 cells
		});
	});
});
