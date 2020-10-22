import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
const Question = ({question, id, answer, description, vote}) => {
    const [votes, setVotes] = useState([])
  
        if (answer === 1){
            answer = 'yes'
        }else{
            answer = 'no'
        }

        


    const upVote = () => {
        axios.put(`https://facts-right-now.herokuapp.com/questions/${id}`)
        .then(res => {
            // console.log('request', res)
            setVotes(res.data.votes)
           
        })
        .catch(err => {
            console.log('error', err)
        })
    }
    const upVoteColor = (className) => {
        document.getElementsByClassName(className).border = "3px solid green"
        
    }


    
    return (


        <div className="QuestionCard">
            <div className="questionTop">
             <div className="tanong">
            <p>
            question: {question}
            </p>  
            </div>
            <div className="buttons">
            <h5 className="answer">
            {answer}
            </h5>
            <img className="vote" src="https://www.flaticon.com/svg/static/icons/svg/20/20901.svg" onClick={upVote}/>
             
            </div>
            </div>
            <p className="description">
            description: {description}
            </p>
            <p className="votes">
            votes: {vote}
            </p>
        </div>
    ) 
}

export default Question