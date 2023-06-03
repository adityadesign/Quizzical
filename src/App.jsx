import { useEffect, useState } from 'react'
import Hero from './Hero.jsx'
import Quiz from './Quiz.jsx'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'
import designOne from './assets/mainDesign1.svg'
import designTwo from './assets/mainDesign2.svg'

function App() {
  const [start, setStart] = useState(false)
  const [quizArray, setQuizArray] = useState([])
  const [correctCount, setCorrectCount] = useState([])
  const [submit, setSubmit] = useState(false)
  const [rerun, setRerun] = useState(false)

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=10&category=28&type=multiple')
      .then(res => res.json())
      .then(data => setQuizArray(data.results))
  },[rerun]) 

  function addAnswerArray(){
    const updatedQuizArray=[...quizArray]
    for(let i=0; i<updatedQuizArray.length; i++){
      const answer = `${updatedQuizArray[i].incorrect_answers},${updatedQuizArray[i].correct_answer}`
      //shuffle answer array 
      function shuffleArray(array) {
        const n = array.length
        for (let i = n - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return decode(array)      
      }
      updatedQuizArray[i].answer = shuffleArray(answer.split(','))
      updatedQuizArray[i].key = nanoid()
      updatedQuizArray[i].question = decode(updatedQuizArray[i].question)
      
    }
    setQuizArray(updatedQuizArray)
  }

  function handleStart(){
    setStart(true)
    addAnswerArray()
  }

  const quizElements = quizArray && quizArray.map(item => {
    return (
      <Quiz 
        questions = {item.question}
        key = {item.key}
        answers = {item.answer}
        correct = {item.correct_answer}
        id =  {item.key}
        submit = {submit}
      />
    )})

  function handleSubmit(e){
    e.preventDefault() 
    let count =0
    for(let i=0; i<quizArray.length; i++){
      const selectedAnswer = e.target[quizArray[i].key].value
      if(selectedAnswer === quizArray[i].correct_answer){
        count++
      }
    }
    setCorrectCount(count)
    setSubmit(prev=> !prev)
    if(submit && start){
      setStart(false)
      setRerun(prev=> !prev)
    }
  }

  return (
    <>
      {!start ? <Hero handleStart={handleStart}/> : 
        <div className='quizBody'>
          <img className='designOne' src={designOne} alt="" />
          <img className='designTwo' src={designTwo} alt="" />
        <form className='quizMain' onSubmit={handleSubmit}>
          {quizElements}
          <div className='btnQuiz'>
            {submit && <p className='displayScore'>You scored {correctCount}/{quizArray.length} correct answers</p>}
            <input type='submit' className='submit' value={submit ? 'Play again' : 'Check answers'}/>
          </div>
        </form>
      </div>
      }
    </>
  )
}

export default App
