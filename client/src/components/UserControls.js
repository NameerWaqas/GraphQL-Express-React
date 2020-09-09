import React, { useContext, useEffect } from 'react'
import { context } from './ContextAPI'
import { Checkbox } from "antd"

export default function UserControls(props) {
    return (
        <div>
            <h1>User Controls</h1>
            <CheckBoxGroup />
            <QueryDispaly />
        </div>
    )
}

function CheckBoxGroup(props) {
    const [query, setQuery] = useContext(context)
    return (
        <div style={{ height: '20vh' }}>
            <Checkbox checked disabled>ID</Checkbox>
            <Checkbox checked disabled>Name</Checkbox><br />
            <Checkbox defaultChecked name="username" onChange={()=>setQuery(p=>({...p,username:!p.username}))}
            >User Name</Checkbox>
            <Checkbox defaultChecked onChange={()=>setQuery(p=>({...p,email:!p.email}))}
            >Email</Checkbox><br />
            <Checkbox defaultChecked onChange={()=>setQuery(p=>({...p,phone:!p.phone}))}
            >Phone</Checkbox>
            <Checkbox defaultChecked onChange={()=>setQuery(p=>({...p,website:!p.website}))}
            >Website</Checkbox><br />
            <Checkbox defaultChecked onChange={()=>setQuery(p=>({...p,company:!p.company}))}
            >Company</Checkbox>
            <Checkbox defaultChecked onChange={()=>setQuery(p=>({...p,address:!p.address}))}
            >Address</Checkbox>
        </div>
    )
}

function QueryDispaly(props) {
    return (
        <div id="QueryDisplay">

        </div>
    )
}