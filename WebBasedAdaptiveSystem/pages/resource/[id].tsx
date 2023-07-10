/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react'; 
import Grid from '@mui/material/Grid';  
import { styled } from '@mui/material/styles'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router'
import { Resources } from '../../src/components/resource';
import YouTube, { YouTubeProps } from 'react-youtube';
import axios from 'axios';

const Main = styled('main', {})<{}>(({ theme }) => ({  
  backgroundColor: '#d9f9ff',  
  backgroundRepeat:'no-repeat, no-repeat', 
  display:'flex',
  justifyContent:'center',
  padding: '0 10px'
}));  

interface Props {}  
 
const ResourceDetail: React.FC<Props> = ({}) => {    
    const router = useRouter()
    const { id } = router.query
    const [item, setItem] = useState(Resources[0])
    const [load, setLoad] = useState(false); 
    const [resource, setResource] = useState([])

    useEffect(()=>{
        axios.get('/api/data').then((res)=>{ 
            //setResource(res.data) 
            setItem(res.data[Number(id)])  
        })
    },[])



    const opts: YouTubeProps['opts'] = { 
        width: '100%',
        playerVars: { 
            autoplay: 1,
        },
    };

    return ( 
        <Main>  
            <Grid container maxWidth="lg" id="mycontainer" > 
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container maxWidth="xl"> 
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:'150px'}}>
                            <a href='/resource'><p className='flex-start back-btn'><ArrowBackIosIcon style={{fontSize:'16px'}} /><span>Resource Page</span></p></a>
                        </Grid> 
                        <Grid item xs={12} sm={12} md={12} lg={12} className='flex-between' style={{ marginTop:'20px', marginBottom:'20px'}}>
                            <p className='statistics'>{item.name}</p>
                            <div className='flex-center' style={{color:'#3199E1'}}>
                                <span>{item.rating}</span> <FavoriteBorderIcon style={{fontSize:'18px'}}/>
                            </div> 
                        </Grid> 
                        <Grid item xs={12} sm={12} md={12} lg={12} className="mb-40">
                            {/* <a href={item.url} target="_blank" rel="noreferrer" >
                                <img className='video-img' src='/assets/youtube.png' alt=""/> 
                            </a> */}
                            <YouTube className='youtube' videoId={item.id} opts={opts}/>
                             
                        </Grid>  
                    </Grid> 
                </Grid>
            </Grid>   
        </Main> 
    );
}

export default ResourceDetail
