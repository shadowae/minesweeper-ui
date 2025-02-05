export function generateMinePositions(
	[rows, cols]: [number, number],
	numMines: number
): number[][] {
	const positions = new Set<string>();
	
	while (positions.size < numMines) {
		const row = Math.floor(Math.random() * rows);
		const col = Math.floor(Math.random() * cols);
		positions.add(`${row},${col}`);
	}
	
	return Array.from(positions).map((pos) => pos.split(",").map(Number));
}
