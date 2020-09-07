import React, { useContext, useEffect } from 'react'
import { context } from './ContextAPI';
import {Button} from 'antd'

export default function IntroGQL(props) {
    const [query, setQuery, gqlSlider, setSlider] = useContext(context)

    return (
        <div id={gqlSlider ? 'SlideIn' : 'SlideOut'}>
            <h1>Intro to GQL</h1>
            <Button  style={{position:"fixed",bottom:"1vw",right:"1vh"}}
            type="primary" shape="circle">B</Button>

        </div>
    )
}