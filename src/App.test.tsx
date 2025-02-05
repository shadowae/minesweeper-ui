import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component with Difficulty Ladder", () => {
	test("renders default (easy) difficulty board", async () => {
		render(<App />);
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(81);
		});
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(10);
	});
	
	test("updates board when difficulty changes", async () => {
		render(<App />);
		const select = screen.getByLabelText(/difficulty/i);
		
		fireEvent.change(select, { target: { value: "medium" } });
		
		// Wait for new board to render
		await waitFor(() => {
			const totalCells =
				screen.getAllByTestId("cell").length +
				screen.getAllByTestId("cell-mine").length;
			expect(totalCells).toBe(256);
		});
		const mineCells = screen.getAllByTestId("cell-mine");
		expect(mineCells.length).toBe(25);
	});
});
