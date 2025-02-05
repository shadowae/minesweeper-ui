import React, { useState, useMemo } from "react";
import Gameboard from "./Gameboard";
import {difficulties, DifficultyLevel} from "./constants/difficulties";
import { generateMinePositions } from "./utils/generateMinePositions";
import "./App.css";
import {Coordinate} from "./utils/getMap.tsx";

function App() {
    const [difficulty, setDifficulty] = useState<DifficultyLevel>("easy");
    const { gridSize, mines } = difficulties[difficulty];
    
    const minePositions :Coordinate[] = useMemo(() => {
        return generateMinePositions(gridSize, mines);
    }, [gridSize, mines]);
    
    const handleDifficultyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDifficulty(event.target.value as DifficultyLevel);
    };
    
    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1>Minesweeper</h1>
            <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="difficulty-select">Difficulty: </label>
                <select
                    id="difficulty-select"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                >
                    {Object.keys(difficulties).map((level) => (
                        <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <Gameboard gridSize={gridSize} minePositions={minePositions} />
        </div>
    );
}

export default App;
