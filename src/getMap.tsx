type Cell = '.' | '*' | number; // A cell can be empty ('.'), a mine ('*'), or a number (neighboring mines)
export type Grid = Cell[][]; // The map is a 2D array of cells
export type Coordinate = [number, number]; // Coordinates are represented as tuples of [x, y]

export const generateArray = ([width, length]: [number, number]): Grid => {
	const array: Grid = [];
	if (length === 0 || width === 0) {
		return array;
	}
	
	for (let i = 0; i < length; i++) {
		array.push(new Array(width).fill('.') as Cell[]); // Fills the array with "." initially
	}
	
	return array;
};

export const validCoordinates = (map: Grid, [x, y]: Coordinate): boolean => {
	const validX = x >= 0 && x < map.length; // Ensure x is within bounds
	const validY = y >= 0 && y < map[0].length; // Ensure y is within bounds
	
	return validX && validY;
};

export const updateMineNeighbour = (map: Grid, mine: Coordinate): void => {
	const [mineX, mineY] = mine;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (validCoordinates(map, [mineX + i, mineY + j]) && !(i === 0 && j === 0)) {
				const x = mineX + i;
				const y = mineY + j;
				
				if (map[x][y] === '.') {
					map[x][y] = 1; // Set neighboring cell to 1 if it was empty
				} else if (typeof map[x][y] === 'number') {
					map[x][y]++; // Increment the count for neighboring mines
				}
			}
		}
	}
};

export const addMines = (map: Grid, mine: Coordinate): void => {
	const [mineX, mineY] = mine;
	if (validCoordinates(map, mine)) {
		map[mineX][mineY] = '*'; // Place a mine at the specified coordinates
		updateMineNeighbour(map, mine); // Update neighboring cells
	} else {
		throw new Error(`Invalid mine position: (${mineX}, ${mineY})`);
	}
};

const getMap = (gridSize: [number, number], mines: Coordinate[]): Grid => {
	const map = generateArray(gridSize); // Generate the base grid
	if (mines.length === 0) return map;
	
	for (const mine of mines) {
		addMines(map, mine); // Add each mine to the map
	}
	
	return map; // Return the completed map
};

export default getMap;
