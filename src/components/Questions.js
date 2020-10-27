import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Question from './Question'
import * as yup from 'yup'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
// const formSchema = yup.object().shape({
//     askedQuestions: yup.string()
//     .min(10, "")
//     .required("Please Enter Question"),
// })


const Questions = () => {
    const [questions, setQuestions] = useState([])
    const [ask, setAsk] = useState([])
    const [isDisabled, setDisabled] = useState(true)
 
    const [formState, setFormState] = useState({
        askedQuestions: "",
    })

    // const [errorState, setErrorState] = useState({
    //     askedQuestions: ""
    // })
    
    // const validate = (e) => {
    //     yup.reach(formSchema, e.target.name).validate(e.target.value)
    //     .then( valid => {
    //         setErrorState({
    //             ...errorState,
    //             [e.target.name]: ""
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err.errors)
    //         setErrorState({
    //             ...errorState,
    //             [e.target.name]: err.errors[0]
    //         })
    //     })
    // }

    // useEffect(() => {
    //     formSchema.isValid(formState).then(valid => {
    //         setDisabled(!valid);
    //         });
    // }, [formState])

    useEffect((item) => {
    axios.get(`https://facts-right-now.herokuapp.com/questions`)
    .then(res => {
        // console.log('request', res)
        setQuestions(res.data)
       
    })
    .catch(err => {
        console.log('error', err)
    })
}, [])

const inputChange = e => {
    e.persist()
    // validate(e)
    setFormState({...formState, [e.target.name]: e.target.value})
}


const formSubmit = (e) => {
    e.preventDefault()
    console.log("form submitted")
    
    axios.post('https://facts-right-now.herokuapp.com/questions/asked', formState)
    .then(res => {
        console.log(res.data)
        setAsk([...ask, res.data])
        setFormState({
            askedQuestions: ""
        })
        ToastsStore.success("Question Submitted")
    }
        )
    
}



    return (
        <div className="questions">
            <div className="title"> 

            
            <h1 className="titleOne"> FactsRight</h1><h1 className="titleTwo">Now</h1>
            </div>
            <form onSubmit={formSubmit}>
            <label htmlFor="askedQuestions">
                    <div className="inputBox">
                        <input
                        className="input"
                        type="text"
                        name="askedQuestions"
                        id="askedQuestions"
                        placeholder="Submit a question..."
                        value={formState.askedQuestions}
                        onChange={inputChange}
                        />
                        <img onClick={formSubmit} src="https://www.flaticon.com/svg/static/icons/svg/32/32213.svg"/>
                        {/* <Button disabled={isDisabled} onClick={() => ToastsStore.success("Question Submitted")}>Submit</Button> */}
                <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore} />
                
                        
                        {/* {errorState.askedQuesdtions ? <p>{errorState.askedQuestions}</p> : null} */}
                    </div>
                </label>
            
            </form>
            <div>
            </div>
 
            {questions.map((question, index) => (

            <Question key={question.key} id={question.id} question={question.question} answer={question.answer} description={question.description} vote={question.votes}/>
    ))}
        </div>
    )
    }
export default Questions

