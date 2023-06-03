import React from "react";
import designOne from './assets/mainDesign1.svg'
import designTwo from './assets/mainDesign2.svg'
import { useEffect, useState } from 'react'

export default function Hero(props){
    const [buttonDisabled, setButtonDisabled] = useState(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
          setButtonDisabled(false);
        }, 1000);
        return () => clearTimeout(timeout);
      }, []);
    return(
        <main className='hero'>
            <img className='designOne' src={designOne} alt="" />
            <img className='designTwo' src={designTwo} alt="" />
            <h1>Quizzical</h1>
            <p>Test your knowledge on vehicles from our vehicle quizzes.</p>
            <button disabled={buttonDisabled} onClick={props.handleStart}>Start Quiz</button>
        </main>
    )
}