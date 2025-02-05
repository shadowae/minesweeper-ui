import { useEffect, useState } from "react";
import getMap, {Coordinate, Grid} from "./utils/getMap";
// import "./Gameboard.css";
import {CellStatus} from "./types/cellStatus.ts";

interface GameBoardProps {
	gridSize: Coordinate;
	minePositions: Coordinate[];
}

function Gameboard({ gridSize, minePositions }: GameBoardProps) {
	const [map, setMap] = useState<Grid>([]);
	const [cellStates, setCellStates] = useState<CellStatus[][]>([]);
	
	useEffect(() => {
		const newMap = getMap(gridSize, minePositions);
		setMap(getMap(gridSize, minePositions));
		
		const initialStates: CellStatus[][] = newMap.map((row) =>
			row.map(() => 'hidden')
		);
		setCellStates(initialStates);
	}, [gridSize, minePositions]);
	
	function handleCellClick(rowIndex: number, colIndex: number) {
		const newStates = cellStates.map((row) => [...row]);
		newStates[rowIndex][colIndex] = "revealed";
		setCellStates(newStates);
	}
	
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${map[0]?.length || 0}, 40px)`,
			}}
		>
			{map.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					const status = cellStates[rowIndex]?.[colIndex] || "hidden";
					
					let content = "";
					if (status === "revealed") {
						content = cell === "." ? "" : cell.toString();
					} else if (status === "flagged") {
						content = "🚩";
					}
					
					return (
						<div
							key={`${rowIndex}-${colIndex}`}
							data-testid={cell === "*" ? "cell-mine" : "cell"}
							onClick={() => handleCellClick(rowIndex, colIndex)}
							
							style={{
								width: "40px",
								height: "40px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								border: "2px solid lightblue",
								backgroundColor: status === "revealed" ? "peachpuff" : "gray",
								cursor: "pointer",
								userSelect: "none",
							}}
						>
							{content}
						</div>
					);
				})
			)}
		</div>
	);
}

export default Gameboard;
