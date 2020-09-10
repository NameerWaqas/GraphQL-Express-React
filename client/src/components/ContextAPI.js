import React, { useState } from 'react';

export const context = React.createContext()

export  function ContextProvider(props) {
    const [query, setQuery] = useState(() => ({
        name: true,
        username: true,
        id: true,
        email: true,
        phone: true,
        website: true,
        company: true,
        address: true
    }))

    const [gqlSilder,setSlider] = useState(false)

    const [querySnap,setSnap] = useState("")

    return (
        <context.Provider value={[query,setQuery,gqlSilder,setSlider,querySnap,setSnap]}>
            {props.children}
        </context.Provider>
    )
}