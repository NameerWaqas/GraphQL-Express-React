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
    return (
        <context.Provider value={[query,setQuery]}>
            {props.children}
        </context.Provider>
    )
}