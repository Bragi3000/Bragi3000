import React from "react"
import Square from "./Square"


export default function Board({squares, size, onClick}) {

    const extendedStyle = {
        ...style,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gridTemplateColumns: `repeat(${size}, 1fr)`
    }

    return (
        <div style={extendedStyle}>
            {squares.map((square, i) => (
                    <Square value={square} key={i} onClick={() => onClick(i)}/>
                )
            )}
        </div>
    );
}

const style = {
    display: "grid",
    width: "500px",
    height: "500px",
};