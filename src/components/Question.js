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

    const upVote = (thisId) => {
        setUserVote(true)
        if(!localStorage.getItem(`${thisId}`)) {
            localStorage.setItem(`${thisId}`, true);
        }
        let plusOne = questionVotes
        axios.put(`http://localhost:5800/questions/upvote/${thisId}`, {
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
            <button className="vote" onClick={() => upVote(id)} disabled={localStorage.getItem(`${id}`)}><img style={{border: localStorage.getItem(`${id}`) || userVote ? "3px solid green" : "3px solid black"}}  src="https://img.icons8.com/ios-filled/2x/up.png"  /></button>
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