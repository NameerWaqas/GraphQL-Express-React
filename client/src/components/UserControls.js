import React, { useContext, useEffect } from 'react'
import { context } from './ContextAPI'
import { Checkbox } from "antd"

export default function UserControls(props) {
    const [query, setQuery, gqlSlider, setSlider] = useContext(context)
    let handleClick = () => {
        setSlider(prevVal => !prevVal)
    }
    console.log(gqlSlider)
    return (
        <div>
            <h1>User Controls</h1>
            <CheckBoxGroup />
            <QueryDispaly />
            <button id="SlideInBtn" onClick={handleClick}>Don't know GraphQL?</button>
        </div>
    )
}

function CheckBoxGroup(props) {
    return (
        <div style={{ height: '20vh' }}>
            <Checkbox checked disabled>ID</Checkbox>
            <Checkbox checked disabled>Name</Checkbox><br />
            <Checkbox>User Name</Checkbox>
            <Checkbox>Email</Checkbox><br />
            <Checkbox>Phone</Checkbox>
            <Checkbox>Website</Checkbox><br />
            <Checkbox>Company</Checkbox>
            <Checkbox>Address</Checkbox>
        </div>
    )
}

function QueryDispaly(props) {
    return (
        <div id="QueryDisplay">

        </div>
    )
}