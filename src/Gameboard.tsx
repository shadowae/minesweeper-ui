// Gameboard.tsx
import {useCallback, useEffect, useState} from "react";
import getMap, { Coordinate, Grid } from "./utils/getMap";
import { CellStatus } from "./types/cellStatus.ts";
import Confetti from "react-confetti";

interface GameBoardProps {
	gridSize: Coordinate;
	minePositions: Coordinate[];
}

function Gameboard({ gridSize, minePositions }: GameBoardProps) {
	const [map, setMap] = useState<Grid>([]);
	const [cellStates, setCellStates] = useState<CellStatus[][]>([]);
	const [showConfetti, setShowConfetti] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [gameWin, setGameWin] = useState(false);
	
	useEffect(() => {
		const newMap = getMap(gridSize, minePositions);
		setMap(newMap);
		const initialStates: CellStatus[][] = newMap.map((row) =>
			row.map((): CellStatus => "hidden")
		);
		setCellStates(initialStates);
		setShowConfetti(false);
		setGameOver(false);
		setGameWin(false);
	}, [gridSize, minePositions]);
	
	const checkWin = useCallback((states: CellStatus[][]): boolean => {
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j] === "*") {
					if (states[i][j] !== "flagged") return false;
				} else {
					if (states[i][j] !== "revealed") return false;
				}
			}
		}
		return true;
	}, [map]);
	
	useEffect(() => {
		if (!gameOver && !gameWin && cellStates.length > 0) {
			if (checkWin(cellStates)) {
				setGameWin(true);
			}
		}
	}, [cellStates, gameOver, gameWin, map]);
	
	function handleCellClick(rowIndex: number, colIndex: number) {
		if (map[rowIndex][colIndex] === "*") {
			setCellStates((prevStates) => {
				const newStates: CellStatus[][] = prevStates.map((row) =>
					row.map((): CellStatus => "revealed")
				);
				newStates[rowIndex][colIndex] = "exploded";
				return newStates;
			});
			setShowConfetti(true);
			setGameOver(true);
			return;
		}
		setCellStates((prevStates) => {
			if (prevStates[rowIndex][colIndex] === "flagged") return prevStates;
			const newStates = prevStates.map((row) => [...row]);
			newStates[rowIndex][colIndex] = "revealed";
			return newStates;
		});
	}
	
	function handleCellRightClick(e: React.MouseEvent<HTMLDivElement>, rowIndex: number, colIndex: number) {
		e.preventDefault();
		setCellStates((prevStates) => {
			const newStates = prevStates.map((row) => [...row]);
			const currentStatus = newStates[rowIndex][colIndex];
			if (currentStatus === "revealed" || currentStatus === "exploded") return prevStates;
			newStates[rowIndex][colIndex] = currentStatus === "flagged" ? "hidden" : "flagged";
			return newStates;
		});
	}
	
	function handleRestart() {
		const newMap = getMap(gridSize, minePositions);
		setMap(newMap);
		const initialStates: CellStatus[][] = newMap.map((row) =>
			row.map((): CellStatus => "hidden")
		);
		setCellStates(initialStates);
		setShowConfetti(false);
		setGameOver(false);
		setGameWin(false);
	}
	
	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${map[0]?.length || 0}, 40px)`
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
						} else if (status === "exploded") {
							content = "💥";
						}
						return (
							<div
								key={`${rowIndex}-${colIndex}`}
								data-testid={cell === "*" ? "cell-mine" : "cell"}
								onClick={() => !gameOver && handleCellClick(rowIndex, colIndex)}
								onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
								style={{
									width: "40px",
									height: "40px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									border: "2px solid lightblue",
									backgroundColor: status === "revealed" || status === "exploded" ? "peachpuff" : "gray",
									cursor: "pointer",
									userSelect: "none"
								}}
							>
								{content}
							</div>
						);
					})
				)}
			</div>
			{showConfetti && (
				<Confetti width={window.innerWidth} height={window.innerHeight} data-testid="confetti" />
			)}
			{(gameOver || gameWin) && (
				<div
					data-testid="game-modal"
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "20px",
						border: "2px solid black",
						zIndex: 1000
					}}
				>
					<p>{gameOver ? "Game Over!" : "You Win!"}</p>
					<button onClick={handleRestart}>Try Again?</button>
				</div>
			)}
		</>
	);
}

export default Gameboard;
