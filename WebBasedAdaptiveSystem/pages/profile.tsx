/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase'; 
import LinearProgress from '@mui/material/LinearProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import { padding } from '@mui/system';


const Main = styled('main', {})<{}>(({ theme }) => ({  
  backgroundColor: '#d9f9ff',  
  backgroundRepeat:'no-repeat, no-repeat', 
  display:'flex',
  justifyContent:'center',
  padding: '0 0px'
}));  

interface Props {}  
 
const Profile: React.FC<Props> = ({}) => {   

    const [master, setMaster] = useState(false)

    useEffect(()=>{ 
        const b = localStorage.getItem('badge')
        if(b && b == '1'){
            setMaster(true)
        }
    }, [])
 
    return ( 
        <Main>  
            <Grid container maxWidth="lg" id="mycontainer" style={{backgroundColor:'#d9f9ff'}}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container maxWidth="xl">  
                        <Grid item xs={12} sm={12} md={12} className="section-profile flex-center-start">
                            <div className='flex-center-start' style={{minHeight:'380px', marginTop:'70px'}}>
                                <div className="profile-avatar">
                                </div> 
                                <div>
                                    <p className='profile-name'>Lig 999</p>
                                    <p className='profile-info mt-15'>1250 XP</p>
                                    <p className='profile-info'>Lvl 50</p>
                                </div>
                            </div>      
                        </Grid> 
                        <Grid item xs={12} sm={12} md={12} className='flex-center info-pos'>
                            <Grid container spacing={1} maxWidth="md">
                                <Grid item xs={12} md={5} className="padding-10">
                                    <div  className="s-wrap">
                                        <p className='statistics'>Statistics</p>
                                        <div className='mt-40'>
                                            <div className='flex-between bar-wrap'>
                                                <p className='s-type'>Addition</p>
                                                <img className='s-bar' src='assets/bar1.png' alt=""/> 
                                            </div>
                                            <div className='divider'></div>
                                        </div>
                                        <div className='mt-30'>
                                            <div className='flex-between bar-wrap'>
                                                <p className='s-type'>Subtraction</p>
                                                <img className='s-bar' src='assets/bar2.png' alt=""/> 
                                            </div>
                                            <div className='divider'></div>
                                        </div>
                                        <div className='mt-30'>
                                            <div className='flex-between bar-wrap'>
                                                <p className='s-type'>Division</p>
                                                <img className='s-bar' src='assets/bar3.png' alt=""/> 
                                            </div>
                                            <div className='divider'></div>
                                        </div>
                                        <div className='mt-30'>
                                            <div className='flex-between bar-wrap'>
                                                <p className='s-type'>Multiplication</p>
                                                <img className='s-bar' src='assets/bar4.png' alt=""/> 
                                            </div>
                                            <div className='divider'></div>
                                        </div>                                        
                                    </div>                                    
                                </Grid>
                                <Grid item xs={12} md={7} className="padding-10">
                                    <div  className="s-wrap">
                                        <p className='statistics'>Achievements</p>
                                        <div className='divider'></div>
                                        <div >
                                            <img className='achiv-img' src='assets/achive1.png' alt=""/> 
                                            <img className='achiv-img' src='assets/achive2.png' alt=""/> 
                                            {master&&<img className='achiv-img' src='assets/badge.png' alt=""/> }
                                        </div>
                                    </div>
                                    <div  className="s-wrap mt-15">
                                        <p className='statistics'>Coach</p>
                                        <p className='s-type mt-15'>Recommended Lessons:</p>
                                        <div className='lesson-list'>
                                            <div className='lesson flex-between '>
                                                <p className='s-type'>Multiplication, Lvl 1</p>
                                                <img className='play-btn' src='assets/play-btn.png' alt=""/> 
                                            </div>
                                            <div className='lesson flex-between mt-15'>
                                                <p className='s-type'>Division, Lvl 3</p>
                                                <img className='play-btn' src='assets/play-btn.png' alt=""/> 
                                            </div>
                                            <div className='lesson flex-between mt-15'>
                                                <p className='s-type'>Subtraction, Lvl 4</p>
                                                <img className='play-btn' src='assets/play-btn.png' alt=""/> 
                                            </div>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        </Grid>
  

                           
                    </Grid> 

                </Grid>
            </Grid>   
        </Main> 
    );
}

export default Profile
