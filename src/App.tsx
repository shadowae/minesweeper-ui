// App.tsx
import Gameboard from "./Gameboard";
import './App.css';
import {Coordinate} from "./utils/getMap.tsx";

function App() {
    const gridSize: [number, number] = [8, 8];
    const minePositions: Coordinate[] = [[1, 1],[5,5],[4,3],[4,4],[4,5]];
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Minesweeper</h1>
            <Gameboard gridSize={gridSize} minePositions={minePositions} />
        </div>
    );
}

export default App;
