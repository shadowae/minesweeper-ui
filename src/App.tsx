// App.tsx
import Gameboard from "./Gameboard";
import './App.css';
import {Coordinate} from "./utils/getMap.tsx";

function App() {
    // Hardcoded configuration for now (3x3 grid with one mine at [1,1])
    const gridSize: [number, number] = [3, 3];
    const minePositions: Coordinate[] = [[1, 1]];
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Minesweeper</h1>
            <Gameboard gridSize={gridSize} minePositions={minePositions} />
        </div>
    );
}

export default App;
