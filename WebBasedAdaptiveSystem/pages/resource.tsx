import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import axios from 'axios';

const Main = styled('main', {})<{}>(({ theme }) => ({
    backgroundColor: '#d9f9ff',
    backgroundRepeat:'no-repeat, no-repeat',
    display:'flex',
    justifyContent:'center',
    padding: '0 0px'
}));

interface Resource {
    name: string;
    url: string;
    rating: number;
    id: string;
    idx: number;
}

const Resource: React.FC = () => {
    const [load, setLoad] = useState<boolean>(false)
    const [more, setMore] = useState<number>(1)
    const [resource, setResource] = useState<Resource[]>([])

    useEffect(()=>{
        axios.get<Resource[]>('/api/data').then((res)=>{
            const r = res.data
            setResource(r.sort((a: Resource, b: Resource) => b.rating - a.rating))
            setLoad(true)
        })
    },[])

    const beautyText = (str: string): string => {
        return str.substring(0, 25) + " ...";
    }

    return (
        <Main>
            <Grid container maxWidth="lg" id="mycontainer" >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container maxWidth="xl">
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:'150px', marginBottom:'20px'}}>
                            <p className='statistics'>Resources for Equations</p>
                        </Grid>
                        {
                            load && resource.map((item: Resource, index: number)=>{
                                const link = '/resource/'+item.idx;
                                const thumnail_url = 'http://img.youtube.com/vi/'+ item.id +'/0.jpg'
                                if(index<more*8){
                                    return(
                                        <Grid key={item.name} item xs={12} sm={6} md={3} lg={3}>
                                            <Link  href={link} >
                                                <div className="video-item">
                                                    <img className='video-img' src={thumnail_url} alt=""/>
                                                    <div className='flex-between'>
                                                        <p>{beautyText(item.name)}</p>
                                                        <div className='flex-center' style={{color:'#3199E1'}}>
                                                            <span>{item.rating}</span> <FavoriteBorderIcon style={{fontSize:'18px'}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    )
                                }
                            })
                        }
                        <Grid item xs={12} sm={12} md={12} lg={12} className="mt-30 mb-40">
                            <Button variant="outlined" style={{width:'100%'}} onClick={()=>setMore(more+1)}>Load More</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Main>
    );
}

export default Resource;
