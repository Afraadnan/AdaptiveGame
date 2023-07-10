/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Button} from '@mui/material'; 
import { styled } from '@mui/material/styles'; 


const Main = styled('main', {})<{}>(({ theme }) => ({  
  backgroundColor: '#d9f9ff',  
  backgroundRepeat:'no-repeat, no-repeat', 
  display:'flex',
  justifyContent:'center',
  padding: '0 0px'
}));  

interface Props {}  
 
const Home: React.FC<Props> = ({}) => {    
 
    return ( 
        <Main>  
            <Grid container maxWidth="lg" id="mycontainer" style={{backgroundColor:'#d9f9ff'}}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container >  
                        <Grid item xs={12} sm={12} md={12} className="section-one flex-center">
                            <Grid container maxWidth="md" className="sec-one-inner">
                                <Grid item xs={12} md={5}> 
                                </Grid>
                                <Grid item xs={12} md={7} style={{textAlign:'center', marginBottom:'40px'}}>
                                    <p className='learn-more'>Learn more,</p>
                                    <p className='learn-more'>Learn Limbic</p> 
                                </Grid> 
                                <Grid item xs={12}  md={12}> 
                                    <p className='learn-sub'>
                                        We recognize that every one has their own way of learning. Our classes are tailored to your individual needs through the use of AI and Machine Learning and will provide a fruitful learning experience for all.
                                    </p>  
                                </Grid>
                            </Grid>                        
                        </Grid> 

                        <Grid item xs={12} md={12} className="flex-center">
                            <Grid container maxWidth="md">
                                <Grid item xs={12}  md={12}> 
                                    <p className='learn-sub-center-1'>
                                        The Limbic System is one of the parts of the brain that assists in short and long-term memory
                                    </p>
                                    <p className='learn-sub-center-2'>
                                        Also reacts to emotionally significant processes (like interactive games!!)
                                    </p>
                                </Grid>
                            </Grid>  
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className="section-two flex-center mt-60">
                            <Grid container maxWidth="md"  className="sec-two-inner">
                                <Grid item xs={12} md={6} className="mauto"> 
                                    <div className="limbic-text">
                                        <p className="titles">What is Limbic</p>
                                        <p className="explain">We are a nonprofit organization with the mission to provide and accommodate for people with all learning backgrounds and experience.</p>
                                        <p className="explain">Limbic uses complex artificial intelligence to learn about you and change your learning experience according to your needs. </p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}> 
                                    <img className="limbic-img" style={{width:'100%'}} src='assets/section2.png' alt=""/>
                                </Grid> 
                            </Grid>                        
                        </Grid> 

                        <Grid item xs={12} sm={12} md={12} className="section-two flex-center mt-60">
                            <Grid container maxWidth="md"  className="sec-two-inner">
                                <Grid item xs={12} md={6} className="order-one"> 
                                    <img className="way-img" style={{width:'100%'}} src='assets/section3.png' alt=""/>
                                </Grid>
                                <Grid item xs={12} md={6} className="mauto order-two"> 
                                    <div className="way-text">
                                        <p className="titles">The Limbic Way</p>
                                        <p className="explain">Learn faster with interactive experiences. Our gamified interface promotes a playful yet educational environment for our users.</p> 
                                    </div>
                                </Grid>
                                
                            </Grid>                        
                        </Grid>

                        <Grid item xs={12} md={12} className="flex-center mt-60">
                            <Grid container maxWidth="md">
                                <Grid item xs={12}  md={12}> 
                                    <p className='learn-sub-center-22'>
                                        Our top of the line AI methods guarantee a deep and solid understanding in Mathematics.
                                    </p>
                                    <p className='learn-sub-center-12'>
                                        Every child deserves a chance to learn and limbic will dynamically cater for the needs of ever learner.
                                    </p>
                                </Grid>
                            </Grid>  
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className="section-four flex-center">
                            <Grid container maxWidth="lg">
                                <Grid item md={12} style={{position:'relative', minHeight:'450px'}}>
                                    <img className='section4-img' src='assets/section4.png' alt="" />
                                    <div className="adaptive-learn"> 
                                        <p className="titles">Adaptive Learning & Gamification</p>
                                        <p className="explain">Adaptive Learning uses AI and algorithms to create a unique interaction with the learner to deliver customized learning activities for the each learner</p> 
                                        <p className="explain">Gamification on the other hand, supports Adaptive learning! It creates a fun and lively environment for the user to absorb information in.</p> 
                                    </div>
                                </Grid>
                            </Grid>         
                        </Grid> 

                        <Grid item xs={12} sm={12} md={12} className="section-five flex-center">
                            <Grid container maxWidth="lg">
                                <Grid item md={12} style={{position:'relative', minHeight: '300px'}}>
                                    <img className='section4-img' src='assets/teamback.png' alt="" />
                                    <div className="expect-from"> 
                                        <p className="expect-title">Meet the team behind Limbic</p> 
                                        <img className='section4-img' src='assets/team.png' alt="" />
                                    </div>
                                </Grid>
                            </Grid>         
                        </Grid> 

                        <Grid item xs={12} sm={12} md={12} className="section-five flex-center ">
                            <Grid container maxWidth="lg">
                                <Grid item md={12} style={{position:'relative'}}>
                                    <img className='section4-img' src='assets/section-end.png' alt=""/> 
                                </Grid>
                            </Grid>         
                        </Grid>   
                    </Grid> 

                </Grid>
            </Grid>   
        </Main> 
    );
}

export default Home
