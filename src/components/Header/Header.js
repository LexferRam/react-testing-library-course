import React from 'react'
import "./Header.css"

export default function Header({
    title
}) {
    return (
        <>
            <h1 className="header">{title}</h1>
            <h1 title="Header" className="header">hello2</h1>
            <h3 data-testid="header-2" className="header">Hello</h3>
        </>
    )
}
