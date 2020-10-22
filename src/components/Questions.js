import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Question from './Question'

const initialAsked = {
    askedQuestions: ''
}


const Questions = (props) => {
    const [questions, setQuestions] = useState([])
    const [ask, setAsk] = useState(initialAsked)
    console.log(questions)
    
    
const addQuestion = () => {}


    useEffect(() => {
    axios.get(`https://facts-right-now.herokuapp.com/questions`)
    .then(res => {
        // console.log('request', res)
        setQuestions(res.data)
       
    })
    .catch(err => {
        console.log('error', err)
    })
}, [])


const changeHandler = e => {
    e.persist()
    setAsk({...ask, [e.target.name]: e.target.value})
}

const formSubmit = e => {
    e.preventDefault()
    console.log("form submitted")
    
//   props.editItem(ask, id)
       

    
    }

    return (
        <div className="questions">
            <h1>FactsRightNow</h1>
            <input 
            type="text"
            name="ask"
            />
            <div className="tabs">
            </div>
 
            {questions.map((question, index) => (

            <Question id={question.id} question={question.question} answer={question.answer} description={question.description} vote={question.votes}/>
    ))}
        </div>
    )
    }
export default Questions