import {Coordinate} from "./getMap.tsx";

export function generateMinePositions(
	[rows, cols]: [number, number],
	numMines: number
): Coordinate[] {
	const positions = new Set<string>();
	
	while (positions.size < numMines) {
		const row = Math.floor(Math.random() * rows);
		const col = Math.floor(Math.random() * cols);
		positions.add(`${row},${col}`);
	}
	
	return Array.from(positions).map((pos) => {
		const parts = pos.split(",").map(Number);
		return [parts[0], parts[1]] as [number, number];
	});
}
