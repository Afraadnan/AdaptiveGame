/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react'; 
import Grid from '@mui/material/Grid';   

const Footer: React.FC  = ( ) => {    
    return ( 
        <Grid container style={{borderTop:'solid 1px #dddddd', marginTop:'0px'}}>
            <Grid item xs={12} md={12} lg={12} className="flex-center">
                <Grid container maxWidth="lg" style={{padding:'20px 30px'}}>
                    <Grid item xs={12} md={4}>
                        <Grid container>
                            <Grid item xs={12} md={5} className="footer-sect-st" >
                                <a href=""><p className='footer-logo'>limbic</p></a>
                            </Grid>
                            <Grid item xs={12} md={7} className="footer-sect-st"> 
                                <p className='footer-tab'>Dashboard</p>
                                <a href="">What is limbic?</a>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Grid container>
                            <Grid item xs={12} md={4} sx={{textAlign:{md:'right', xs:'center'}}}>
                                <p className='footer-tab'>Course</p>
                                <a href="" className='footer-link'>Mathematic</a>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{textAlign:{md:'right', xs:'center'}}}>
                                <p className='footer-tab'>Help</p>
                                <a href="" className='footer-link'>Help</a>
                                <a href="" className='footer-link'>Email</a>
                                <a href="" className='footer-link'>Contact Number</a>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{textAlign:{md:'right', xs:'center'}}}>
                                <p className='footer-tab'>Company</p>
                                <a href="" className='footer-link'>About us</a>
                                <a href="" className='footer-link'>Support Center</a>                                
                                <a href="" className='footer-link'>Terms</a>
                                <a href="" className='footer-link'>Privacy</a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
            <Grid item xs={12} md={12} lg={12} className="flex-center">
                <Grid container maxWidth="lg" style={{padding:'10px 30px'}}>
                    <Grid item xs={12} md={6} sx={{textAlign:{md:'left', xs:'center'}}}>
                        <p>limbic is commited to helping reduce carbon emissions</p>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{textAlign:{md:'right', xs:'center'}}}>
                        <p>Made with &lt; 3 by limbic development | ©2022</p>
                    </Grid> 
                </Grid>
            </Grid>     
        </Grid> 
    );
} 
export default Footer;
