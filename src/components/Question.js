import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
const Question = ({question, id, answer, description, vote}) => {
    const [questionVotes, setVotes] = useState(vote)
    const [userVote, setUserVote] = useState(false)
    // let property = document.getElementsByClassName('answer')
  
        if (answer === 1){
            answer = 'yes'
            // setColor()
            // property.style.color = 'green'
        }
        else if(answer === null){
            answer = '?'
        }else{
            answer = 'no'
        }

    const upVote = () => {
        let plusOne = questionVotes
        axios.put(`http://localhost:5800/questions/${id}`, {
            votes: plusOne++
        })
        .then(res => {
            console.log('request', res)
            
            setVotes((res.data.votes) + 1)
            
           
        })
        .catch(err => {
            console.log('error', err)
        })
    }

    const toggle = () => {
        setUserVote(true) 
    }


    
    return (


        <div className="QuestionCard">
            <div className="questionTop">
             <div className="tanong">
            <p>
            {question}
            </p>  
            </div>
            <div className="buttons">
            <h5 style={{ border: answer === 'yes' ? "3px solid green" : '3px solid red'}} className="answer">
            {answer}
            </h5>
            {/* <form>
            <input
            type="button"
            id="button"
            value="button"
            style="color:black"
            onClick="setColor('button', 'green')" />
            </form> */}
            <h5 className="vote" style={{border: userVote === true ? "3px solid green" : "3px solid black"}} onClick={upVote, toggle}>⬆</h5>
            {/* <img  id="button" value="button"  className="vote" src="https://www.flaticon.com/svg/static/icons/svg/20/20901.svg" onClick={upVote}/> */}
             
            </div>
            </div>
            <p className="description">
            description: {description}
            </p>
            <p className="votes">
            votes: {questionVotes}
            </p>
        </div>
    ) 
}

export default Question