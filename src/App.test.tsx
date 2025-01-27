import { render, screen } from '@testing-library/react';
import App from './App';
import Cell from './getMap.tsx'

describe('Minesweeper Field Rendering', () => {
	test('renders the Minesweeper field with the correct size', () => {
		// Render the App
		render(<App/>);
		
		// Check if the grid is rendered with the correct number of cells
		const cells = screen.getAllByTestId('cell'); // Assuming each cell has a `data-testid="cell"`
		expect(cells).toHaveLength(8); // For a 3x3 grid, there should be 8 cells that are normal
		const cellsBomb = screen.getAllByTestId('cell-mine')
		expect(cellsBomb).toHaveLength(1);
	});
	
	test('renders cells with the correct initial state', () => {
		render(<App />);
		
		// Ensure all cells are initially blank or represent the grid map's initial state
		const cells = screen.getAllByTestId('cell');
		cells.forEach((cell) => {
			expect(cell.textContent).toEqual(typeof Cell); // Initially, cells should be empty
		});
	});
});
