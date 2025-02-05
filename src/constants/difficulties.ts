import {Coordinate} from "../utils/getMap.tsx";

export type DifficultyLevel = "easy" | "medium" | "hard";

interface DifficultySettings {
	gridSize: [number, number];
	mines: number;
}
export const difficulties: Record<DifficultyLevel, DifficultySettings> = {
	easy: { gridSize: [9, 9] as Coordinate, mines: 10 },
	medium: { gridSize: [16, 16] as Coordinate, mines: 25 },
	hard: { gridSize: [30, 30] as Coordinate, mines: 40 },
};

