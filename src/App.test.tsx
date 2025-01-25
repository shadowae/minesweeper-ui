import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Minesweeper Field Rendering', () => {
	test('renders the Minesweeper field with the correct size', () => {
		// Render the App
		render(<App />)
		
		// Assuming the grid will be rendered later; update this test once your grid exists
		const links = screen.getAllByRole('link') // Example to test the links for now
		expect(links).toHaveLength(2) // Checks the two links in the template
	})
	
	test('renders cells with the correct initial state', () => {
		render(<App />)
		
		// Ensure a placeholder test for now; update when cells are implemented
		const heading = screen.getByRole('heading', { name: /Vite \+ React/i })
		expect(heading).toBeInTheDocument()
	})
})

describe('Cell Interactions', () => {
	test('increments count on button click', () => {
		render(<App />)
		
		const button = screen.getByRole('button', { name: /count is 0/i })
		fireEvent.click(button)
		expect(button).toHaveTextContent(/count is 1/i) // Confirms button click changes count
	})
})
