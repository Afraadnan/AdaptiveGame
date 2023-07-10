/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from 'react'; 
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useRouter } from 'next/router'; 
import Grid from '@mui/material/Grid'; 
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Typography } from '@mui/material';   
  

interface AppBarProps extends MuiAppBarProps {
}

const AppBar = styled(MuiAppBar, {})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
})); 
  

const Header: React.FC  = ( ) => {   

    const router = useRouter()     
    const [user, setUser] = useState('')

    useEffect(()=>{ 
        if(router.route.includes('resource')){
            setUser('')
        }
    },[router])

    const dashboard = () => {
        window.location.href = '/dashboard' 
    }
    const profile = () => {
        window.location.href = '/profile' 
    }

    return (
        <AppBar id="appbar" position="fixed" sx={{ backgroundColor: 'var(--background)', color: '#000', left:'50%' , transform: 'translate(-50%, 0%)'}}>
            <Grid container  spacing={2} sx={{ justifyContent: "space-between", margin:"-16px auto 0", height:'100px', maxWidth:'1200px' }}>
                <Grid item sx={{ width: '80px', paddingLeft: '30px !important', display: 'flex', alignItems: 'center' }} xs={1} md={2}>
                    <a href='/'>
                        <div style={{display:'flex', alignItems:'center'}}> 
                            <Typography  style={{margin:'0', fontSize:'36px', fontWeight:'700', marginLeft:'5px'}}><span>limbic</span></Typography> 
                        </div>  
                    </a> 
                </Grid> 
                <Grid item xs={1} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', border:'solid 2px black', borderRadius:'40px', padding:'3px 5px', marginRight:'20px'}}>
                        <AccountCircleOutlinedIcon style={{fontSize:'28px', cursor:'pointer', marginRight:'5px'}} onClick={()=>profile()}/>
                        <p style={{margin:'0', fontSize:'18px', marginRight:'10px', cursor:'pointer'}} onClick={()=>dashboard()}>Guest{user}</p>
                    </div>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default Header;
