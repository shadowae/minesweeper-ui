import { render, screen } from '@testing-library/react';
import App from './App';

describe('Minesweeper Field Rendering', () => {
	test('renders the Minesweeper field with the correct size', () => {
		// Render the App
		render(<App />);
		
		// Check if the grid is rendered with the correct number of normal cells
		const cells = screen.getAllByTestId('cell');
		expect(cells.length + screen.getAllByTestId('cell-mine').length).toBe(9); // Ensure total 3x3 grid exists
		
		// Check if one mine exists
		const cellsBomb = screen.getAllByTestId('cell-mine');
		expect(cellsBomb).toHaveLength(1);
	});
	
	test('renders cells with the correct initial state', () => {
		render(<App />);
		
		// Ensure all normal cells contain either empty (.) or a number (1-8)
		const cells = screen.getAllByTestId('cell');
		cells.forEach((cell) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const cellContent:string = cell.textContent?.trim(); // Trim whitespace to avoid issues
			
			if (cellContent === '') {
				expect(cellContent).toBe(''); // Empty cells remain empty
			} else {
				expect(/^\d+$/.test(cellContent)).toBe(true); // Ensure only numbers appear (adjacent mine count)
			}
		});
		
		// Ensure mines are displayed correctly
		const mines = screen.getAllByTestId('cell-mine');
		mines.forEach((mine) => {
			expect(mine.textContent?.trim()).toBe('*'); // Mines should be marked as "*"
		});
	});
});
