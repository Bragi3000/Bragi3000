import React from 'react'

export default function Square({value, onClick}) {
    const extendedStyle = {
        ...style,
        color: value === "X" ? "red" : "blue",
    }
    return (
        <button className="Square" style={extendedStyle} onClick={onClick}>
            {value}
        </button>
    )
}

const style = {
    fontSize: "50px"
};
