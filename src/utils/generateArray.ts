import {Cell, Grid} from "./getMap.tsx";

const generateArray = ([width, length]: [number, number], fillValue: string = '.'): Grid => {
	const array: Grid = [];
	if (length === 0 || width === 0) {
		return array;
	}
	
	for (let i = 0; i < length; i++) {
		array.push(new Array(width).fill(fillValue) as Cell[]); // Fills the array with "." initially
	}
	
	return array;
};

export default generateArray;
