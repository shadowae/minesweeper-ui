// Gameboard.tsx
import { useEffect, useState } from "react";
import getMap, {Coordinate, Grid} from "./utils/getMap";
// import "./Gameboard.css";

interface GameBoardProps {
	gridSize: Coordinate;  // e.g., [rows, columns]
	minePositions: Coordinate[];   // e.g., [[1,1], [2,2]]
}

function Gameboard({ gridSize, minePositions }: GameBoardProps) {
	const [map, setMap] = useState<Grid>([]);
	
	useEffect(() => {
		// Generate the grid using the provided grid size and mine positions.
		setMap(getMap(gridSize, minePositions));
	}, [gridSize, minePositions]);
	
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${map[0]?.length || 0}, 40px)`,
			}}
		>
			{map.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<div
						key={`${rowIndex}-${colIndex}`}
						data-testid={cell === "*" ? "cell-mine" : "cell"}
						style={{
							width: "40px",
							height: "40px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: "2px solid lightblue",
							backgroundColor: "peachpuff",
							color: "black",
						}}
					>
						{cell === "." ? "" : cell}
					</div>
				))
			)}
		</div>
	);
}

export default Gameboard;
