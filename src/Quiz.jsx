import React, { useEffect, useState } from "react";

export default function Quiz(props){
    const [selectedAnswer, setSelectedAnswer] = useState("")

    function handleChange(e){
        setSelectedAnswer(e.target.value)
    }

    const answerArray = props.answers.map((item,index) =>{
        return (
            <div key={index}>
                <label className={`individualAnswer 
                    ${props.submit && `${item === props.correct ? 'correct' : ''}`}
                    ${!props.submit ? `${selectedAnswer === item ? `checked` : ""}` : `${selectedAnswer === item ? `${item === props.correct ? 'correct' : 'incorrect'}` : ''}`} 
                    `}>
                    <input type="radio" 
                        name={props.id} 
                        value={item} 
                        checked={selectedAnswer === item}
                        onChange={handleChange}/>
                            {item}
                </label>
            </div>
        )
    })
    return(
        <div className="quizElements">
            <div className="quizQuestion">{props.questions}</div>
            <div className="quizAnswer">{answerArray}</div>
        </div>
    )
}