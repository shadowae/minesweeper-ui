import { useEffect, useState } from "react";
import getMap, { Grid } from "./utils/getMap.tsx";
import './App.css'

function App() {
    const [map, setMap] = useState<Grid>([]);
    
    useEffect(() => {
        setMap(getMap([3, 3], [[1, 1]])); // Generates a 3x3 grid with a mine at [1, 1]
    }, []);
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>Minesweeper</h1>
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
                            data-testid={cell === "*" ? "cell-mine" : "cell"} // Differentiating mines and regular cells
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
                            {cell === "." ? "" : cell} {/* Show nothing for empty cells */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
