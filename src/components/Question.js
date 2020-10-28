import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const Question = ({question, id, answer, description, vote}) => {
    const [questionVotes, setVotes] = useState(vote)
    const [userVote, setUserVote] = useState(false)
    const [modalIsOpen,setIsOpen] = useState(false);
    var subtitle;
  
        if (answer === 1){
            answer = 'Yes'
        }
        else if(answer === null){
            answer = '?'
        }else{
            answer = 'No'
        }

    const upVote = (thisId) => {
        setUserVote(true)
        if(!localStorage.getItem(`${thisId}`)) {
            localStorage.setItem(`${thisId}`, true);
        }
        let plusOne = questionVotes
        axios.put(`https://facts-right-now.herokuapp.com/questions/upvote/${thisId}`, {
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

    function openModal() {
        setIsOpen(true);
      }
     
      function afterOpenModal() {
      }
     
      function closeModal(){
        setIsOpen(false);
      }

    
    return (


        <div className="QuestionCard">

            <div className="questionTop">

                <div  onClick={openModal} className="tanong">
                    <p>
                    {question}
                    </p>  
                </div>
            <div className="buttons">
                <h5 style={{ border: answer === 'Yes' ? "3px solid green" : '3px solid red'}} className="answer">
                {answer}
                </h5>
    
                <button className="vote" onClick={() => upVote(id)} disabled={localStorage.getItem(`${id}`) } style={{border: localStorage.getItem(`${id}`) || userVote ? "3px solid green" : "3px solid black"}} ><img src="https://img.icons8.com/ios-filled/2x/up.png"  /></button>

            </div>
            </div>
            <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className="QuestionCardModal"
          contentLabel="Example Modal"
        >
            <div>
               
     
            <div className="questionTop">

                <div className="tanong">
                    <p>
                    {question}
                    </p>  
                 </div>
                <div className="buttons">
                    <h5 style={{ border: answer === 'Yes' ? "3px solid green" : '3px solid red'}} className="answer">
                    {answer}
                    </h5>

                    <button className="vote" onClick={() => upVote(id)} disabled={localStorage.getItem(`${id}`) } style={{border: localStorage.getItem(`${id}`) || userVote ? "3px solid green" : "3px solid black"}} ><img src="https://img.icons8.com/ios-filled/2x/up.png"  /></button>
                 
                </div>
                
                </div>
                <p className="description">
                description: {description}
                </p>
                {/* <p className="votes">
                votes: {questionVotes}
                </p> */}
                {/* <button onClick={closeModal}>close</button> */}
                <button className="closeButton" onClick={closeModal} type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
           
             </Modal>
           
        </div>
    ) 
}

export default Question