/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react'; 
import Grid from '@mui/material/Grid'; 
import { Button, duration } from '@mui/material'; 
import { styled } from '@mui/material/styles'; 
import LinearProgress from '@mui/material/LinearProgress'; 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';  
import DialogActions from '@mui/material/DialogActions'; 
import DialogContentText from '@mui/material/DialogContentText'; 
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close'; 
import { Quizs } from '../src/components/quiz';
import toast, { Toaster } from 'react-hot-toast';
const mysql = require('mysql2');




const Main = styled('main', {})<{}>(({ theme }) => ({  
  backgroundColor: '#d9f9ff',  
  backgroundRepeat:'no-repeat, no-repeat', 
  display:'flex',
  justifyContent:'center',
  padding: '0 0px'
}));  

interface Props {}   

interface Quz {
    quiz:string,
    opt: string[],
    answer: number,
    sel: number
}

const Quiz: React.FC<Props> = ({}) => {     

    const [more, setMore] = useState(1)
    const [quizs, setQuizs] = useState<Quz[]>([]) 
    const [count, setCount] = useState(0)
    const [wrongCnt, setWrongCnt] = useState(0)
    const [rightCnt, setRightCnt] = useState(0)
    const [success, setSuccess] = useState(false)
    const [answerIdx, setAnswerIdx] = useState(10)
    const [start, setStart] = useState(0)
    const [ready, setReady] = useState('init')
    const [open, setOpen] = React.useState(false); 
    const [openBadge, setOpenBadge] = React.useState(false); 

    const askDiag = () => {
        setOpen(true);
    }; 
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseBadge = () => {
        setOpenBadge(false);
    };  

    useEffect(()=>{
        const randomNumbers:any = []; 
        while (randomNumbers.length < 10) {
            const randomNumber = Math.floor(Math.random() * Quizs.length);
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }  
        const tmp:Quz[] = [];
        randomNumbers.forEach((i:number)=>{
            const t:Quz = {
                quiz: Quizs[i].quiz,
                opt: Quizs[i].opt,
                answer: Quizs[i].answer,
                sel: 10
            }
            tmp.push(t)
        })     
        setQuizs(tmp) 
    },[])

    useEffect(()=>{
        const now = Date.now() 
        if(count == 10){
            setReady('summary')  
            if(now - start < 30000){ 
                setSuccess(false)
            }else{                
                if(rightCnt>=5){ 
                    setSuccess(true)
                    setOpenBadge(true)
                }else{ 
                    setSuccess(false)
                }
            } 
        }  
    },[count])


    const cancelTest = () => {
        setCount(0)
        setWrongCnt(0)
        setStart(0)
        setReady('init')
        setSuccess(false)
        setOpen(false)
    }

    const selectAnswers = () => {
        if(answerIdx == 10){
            toast.custom(
                <div className='msg-wrap skip-wrap' >
                    <PriorityHighIcon style={{fontSize:'60px', color:'white'}} />
                    <p className='msg-skip'>Select Answer</p>
                </div>,
                {
                    duration:800
                }
            )
            return
        }

        if(count<10){
            const tp = quizs;
            const now = Date.now(); // capture the end time
            const qid = tp[count].quiz; // capture the question id
            const isCorrect = tp[count].answer === answerIdx ? 1 : 0; // check if answer is correct or not
            if(isCorrect){
                setRightCnt(rightCnt+1)
                toast.custom(
                    <div className='msg-wrap skip-good' >
                        <CheckCircleIcon style={{fontSize:'60px', color:'white'}} />
                        <p className='msg-good'>Great job!</p>
                    </div>,
                    {
                        duration:800
                    }
                )
            }else{
                setWrongCnt(wrongCnt+1)
                toast.custom(
                    <div className='msg-wrap skip-wrong' >
                        <HighlightOffIcon style={{fontSize:'60px', color:'white'}} />
                        <div>
                            <p className='msg-wrong'>Correct Answer:</p>
                            <p className='msg-wrong'>{quizs[count].answer+1}</p>
                        </div>
                    </div>,
                    {
                        duration:800
                    }
                )
            }
            tp[count].sel =  answerIdx;
            const startTime = start;
            const endTime = now;
            const questionId = qid;
            handleAnswerSelection(123456,startTime, endTime, questionId, isCorrect)
            setQuizs([...tp])
            setAnswerIdx(10)
            setCount(count+1)
        }
        function handleAnswerSelection(studentID: number, startTime: number, endTime: number, questionId: string, isCorrect: number) {
            const formData = new FormData();
            formData.append('student_id', studentID.toString());
            formData.append('start_time', startTime.toString());
            formData.append('end_time', endTime.toString());
            formData.append('question_id', questionId);
            formData.append('is_correct', isCorrect.toString());

            fetch('/api/handle-answer-selection/', {
                method: 'POST',
                body: formData,
            }).then(response => {
                if (response.ok) {
                    console.log('Data saved successfully');
                } else {
                    console.error('Failed to save data');
                }
            }).catch(error => {
                console.error('Failed to save data', error);
            });
        }


    }

    const skipAnswers = () => { 
        if(count<10){
            setCount(count+1)  
            setAnswerIdx(10)
            setWrongCnt(wrongCnt+1)
            toast.custom(
                <div className='msg-wrap skip-wrap' >
                    <CheckCircleIcon style={{fontSize:'60px', color:'white'}} />
                    <p className='msg-skip'>Question Skipped</p>
                </div>,
                {
                    duration:800
                }
            )
        } 
    }

    const goStart = () => {
        setReady('started')
        setCount(0)
        setRightCnt(0)
        setWrongCnt(0)
        const now = Date.now() 
        setStart(now)  
    }

    const practiseAgain = () => {
        goStart()
    }

    const final = () => {
        if(success){
            localStorage.setItem('badge', '1')
            localStorage.setItem('read', '0')
            window.location.href = '/dashboard'
        }else{
            window.location.href = '/dashboard' 
        }

    }

    const finalKeep = () => {
    }

    
 
    return ( 
        <Main>  
            <Grid container maxWidth="lg" id="mycontainer" > 
                <Grid item xs={12} sm={12} md={12} lg={12} className="flex-center-start">
                    {
                        ready == "init" ?
                        <Grid container maxWidth="xl"> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="flex-center" style={{ marginTop:'150px', marginBottom:'20px', minHeight:'50vh'}}>
                                <PlayCircleOutlineIcon style={{fontSize:'200px', color:'#70C788', cursor:'pointer'}} onClick={()=>goStart()} />
                            </Grid>
                        </Grid> :
                        ready == "started"?
                        <Grid container maxWidth="xl"> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="flex-center" style={{ marginTop:'250px', marginBottom:'20px'}}>
                                <CloseIcon style={{cursor:'pointer'}} onClick={()=>askDiag()}/>
                                <LinearProgress color="success" className='process' variant="determinate" value={(6-wrongCnt)*16.66} />
                            </Grid>  
                            {
                                quizs.length>0 && count<10?
                                <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:'30px', marginBottom:'20px'}}>
                                        <p className="quiz-text">{quizs[count]?.quiz}</p>
                                    </Grid> 
                                    {quizs[count].opt.map((option, index)=>{
                                        return(
                                            <Grid key={index} item xs={12} sm={12} md={6} lg={6} className="padding-5">
                                                <div className={answerIdx == index?"choose active-choose flex-start":"choose flex-start"}  onClick={()=>setAnswerIdx(index)}>
                                                   <div className='a-index'>{index+1}</div>    {option}   
                                                </div>
                                            </Grid>  
                                        )
                                    })} 
                                </>:<></>
                            } 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 " style={{height:'100px', display:'flex', justifyContent:'space-between'}}>
                                <div>
                                    {count<10&&quizs[count].answer+1}
                                </div>
                                <div style={{textAlign:'right' }}>
                                    <Button className="limbic-btn btn-red mr-20" onClick={()=>skipAnswers()} >Skip</Button>
                                    <Button className="limbic-btn btn-blue" onClick={()=>selectAnswers()}>Continue</Button>
                                </div>
                                
                            </Grid> 
                        </Grid> :
                        ready == "summary"?
                        <Grid container maxWidth="lg" style={{padding:'10px'}}> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="flex-start" style={{ marginTop:'230px', marginBottom:'20px'}}>
                                <p className="summary">Session Summary ({success?"PASSED":"NOT PASSED"})</p>
                            </Grid> 
                            <Grid item xs={7} sm={7} md={7} lg={7} style={{ marginTop:'20px', marginBottom:'20px'}}>
                                <div style={{padding:'20px'}}>
                                    <p className="r-type">Correct Answers:</p>
                                    <p className="r-type">Incorrect Answers:</p>
                                    <p className="r-type">Overall Score:</p>
                                    <p className="r-type">XP Gained:</p>
                                </div> 
                            </Grid> 
                            <Grid item xs={5} sm={5} md={5} lg={5} style={{ marginTop:'20px', marginBottom:'20px'}}>
                                <div style={{background:'#fff', padding:'20px', borderRadius:'10px'}}>
                                    <p className="r-type">{rightCnt}</p>
                                    <p className="r-type">{wrongCnt}</p>
                                    <p className="r-type">{rightCnt} / 10</p>
                                    <p className="r-type">{success&&rightCnt>5? 10*rightCnt:'0'}</p>
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 " style={{height:'100px', textAlign:'right' }}>
                                <Button className="limbic-btn btn-green mr-10" onClick={()=>practiseAgain()} >Practise Again</Button>
                                <Button className="limbic-btn btn-blue" onClick={()=>final()}>Continue</Button>
                            </Grid> 
                        </Grid>:
                        ready == "ligs"?
                        <Grid container maxWidth="md" style={{padding:'10px'}}> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="flex-center-start" style={{ marginTop:'150px', marginBottom:'20px'}}>
                                <p className="ligs">Ligs Earned:</p>
                            </Grid>  
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:'20px', marginBottom:'20px'}}>
                                <div style={{background:'#fff', padding:'80px', textAlign:'center', borderRadius:'10px'}}>
                                     <span className='lig-plus'>+50 ligs</span>
                                </div>
                                <div style={{marginTop: '40px'}}>
                                    <p className="ligs">Keep up the good work!</p> 
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 " style={{height:'100px', textAlign:'right' }}>
                                <Button className="limbic-btn btn-blue" onClick={()=>finalKeep()}>Continue</Button>
                            </Grid> 
                        </Grid>:
                        <></>
                    } 
                </Grid>
            </Grid> 
            <Toaster />  
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > 
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p style={{fontSize:'22px', fontWeight:'900', margin:'20px 0'}}>Are you sure want to end this session?</p> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display:'flex', justifyContent:'space-evenly', marginBottom:'20px'}}>
                    <Button onClick={cancelTest} autoFocus variant="contained" color='error' className='diag-btn'>Yes</Button>
                    <Button onClick={handleClose} variant="contained" color="primary" className='diag-btn'>No</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openBadge}
                onClose={handleCloseBadge}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > 
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="flex-center-start" style={{ marginTop:'50px', marginBottom:'20px'}}>
                        <p className="ligs">Ligs Earned:</p>
                    </Grid>  
                    <Grid item xs={12} sm={12} md={12} lg={12}  >
                        <div style={{background:'#fff', padding:'40px', textAlign:'center', borderRadius:'10px'}}>
                            <span className='lig-plus'>+{rightCnt*10} ligs</span>
                        </div>
                        <div >
                            <p className="ligs">Keep up the good work!</p> 
                        </div>
                    </Grid> 
                    <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 " style={{height:'100px', textAlign:'center' }}>
                        <Button className="limbic-btn btn-blue" onClick={()=>handleCloseBadge()}>Continue</Button>
                    </Grid>   
                </Grid>
            </Dialog>
        </Main> 
    );
}

export default Quiz
 