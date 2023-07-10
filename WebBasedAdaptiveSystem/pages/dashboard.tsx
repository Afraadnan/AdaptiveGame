/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import SelectBox from '../src/components/SelectBox';
import axios from 'axios';
 
const Main = styled('main', {})<{}>(({ theme }) => ({  
  backgroundColor: '#d9f9ff',  
  backgroundRepeat:'no-repeat, no-repeat', 
  display:'flex',
  justifyContent:'center',
  padding: '0 0px'
}));  

interface Props {}  

 
const ColorMark = styled('p')(({}) =>({ 
    backgroundColor: '#70C788', 
    borderRadius: '30px',  
    margin: '0px',
    color:'white',
    padding: '0px 15px',
    marginLeft: '10px',

}));  
 
const Dashboard: React.FC<Props> = ({}) => {   

    const [open, setOpen] = React.useState(false);  
    const [master, setMaster] = useState(false)
    const [more, setMore] = useState(1) 
    const [resource, setResource] = useState([])
    const [voted, setVoted] = useState<number[]>([])

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const a = localStorage.getItem('read')
        if(a && a == '0'){
            console.log(">>")
            localStorage.setItem('read', '1')
            setOpen(true)
        }
        const b = localStorage.getItem('badge')
        if(b && b == '1'){
            setMaster(true)
        }
    }, [])

    const beautyText = (str:string) => {
        return str.substring(0, 25) + " ...";
    }

    const reset = () => {
        setMaster(false)
        localStorage.setItem('badge', '0')
    } 

    useEffect(()=>{
        axios.get('/api/data').then((res)=>{ 
            const r = res.data
            setResource(r.sort((a:any, b:any)=>b['rating'] - a['rating']))
        })
    },[])

    const vote = (index:number) => {
        if(!voted.includes(index)){
            axios.post('/api/data', {index}).then((res)=>{ 
                const r = res.data
                setResource(r.sort((a:any, b:any)=>b['rating'] - a['rating'])) 
                setVoted([...voted, index])
            }) 
        } 
    }

    return ( 
        <Main>   
            <Grid container maxWidth="lg" style={{backgroundColor:'#d9f9ff'}}>  
                <Grid item xs={12} sm={12} md={12} className="section-dash flex-center-start">
                    <Grid container>
                        <Grid item xs={12} md={12} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <p className='welcome-back dash-w'>Welcome back,</p>
                            <SelectBox master={master} title={"Equations"} opt="Addition" />
                            {master&&<SelectBox master={false} title={"Trigonometry"} opt="Equations" />} 
                        </Grid>   
                    </Grid>
                </Grid>  
                <Grid item xs={12} md={12} style={{textAlign:'right', marginBottom:'50px'}}>
                    <Button className="limbic-btn btn-blue mr-20" onClick={()=>reset()} >Reset</Button>                            
                </Grid>  
            </Grid>  
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > 
                <Grid container maxWidth="xl" style={{padding:'20px'}}> 
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:'20px', marginBottom:'10px', textAlign:'right' }}>
                         <CloseIcon style={{cursor:'pointer'}} onClick={handleClose} />
                    </Grid> 
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom:'20px'}}>
                        <p className='statistics'>Vote the resources, recommend to others.</p>
                    </Grid> 
                    {
                        resource.map((item, index)=>{
                            const link = '/resource/'+index;
                            const thumnail_url = 'http://img.youtube.com/vi/'+ item['id'] +'/0.jpg'
                            if(index<more*8){
                                return(                                    
                                    <Grid key={item['name']} item xs={12} sm={6} md={3} lg={3}> 
                                        <div className="video-item">
                                            <img className='video-img' src={thumnail_url} alt=""/> 
                                            <div className='flex-between'>
                                                <p>{beautyText(item['name'])}</p>
                                                <div className='flex-center' style={{color:'#3199E1'}}>
                                                    <span>{item['rating']}</span> <FavoriteBorderIcon style={{fontSize:'18px'}} onClick={()=>vote(item['idx'])}/>
                                                </div> 
                                            </div>
                                        </div>  
                                    </Grid>                                     
                                )
                            }
                            
                        })
                    }  
                    <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 mb-40">
                            <Button variant="outlined" style={{width:'100%'}} onClick={()=>setMore(more+1)}>Load More</Button>
                    </Grid> 
                </Grid> 
                
            </Dialog>
        </Main> 
    );
}

export default Dashboard
