/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles'; 
import InputBase from '@mui/material/InputBase'; 
import LinearProgress from '@mui/material/LinearProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import { padding } from '@mui/system';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow'; 
import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';

const ColorMark = styled('p')(({}) =>({ 
    backgroundColor: '#70C788', 
    borderRadius: '30px',  
    margin: '0px',
    color:'white',
    padding: '0px 15px',
    marginLeft: '10px',
    textTransform: 'capitalize'

}));

interface Props {
    master: boolean,
    title:string,
    opt: string,
}  
const SelectBox: React.FC<Props> = ({master, title, opt}) => {    
  
    const [opennetwork, setOpenNetwork] = React.useState(false);
    const anchorRefNetwork = React.useRef<HTMLButtonElement>(null);
    const [toggled, setToggled] = useState(false)   

    function handleListKeyDownNetwork(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenNetwork(false);
        } else if (event.key === 'Escape') {
            setOpenNetwork(false);
        }
    }  

    const handleToggleNetwork = () => {
        setToggled(true)
        setOpenNetwork((prevOpen) => !prevOpen);
    };  

    const handleSelectPage = (index:number) => {    
        setToggled(false) 
        setOpenNetwork(false);
        if(index == 1){
            window.location.href = '/quiz' 
        }
        if(index == 2){
            window.location.href = '/resource' 
        }
    };     

    return(
        <div className="dash-w" style={{padding:'10px 20px', display:'flex', justifyContent:'center'}}>
            <Button
                ref={anchorRefNetwork}
                id="composition-button"
                aria-controls={opennetwork ? 'composition-menu' : undefined}
                aria-expanded={opennetwork ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleNetwork}
                style={{
                    color:'#333333', 
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '10px', 
                    height:'50px', 
                    background:'white',
                    display:'flex',
                    justifyContent:'space-between',
                    padding: '10px 20px',  
                }} 
                sx={{width:{xs:'335px', sm:'500px', md:'700px', }}}
            >     
                {
                toggled?
                <> 
                    <div className="sel-data">
                        <span style={{fontWeight:'600', textTransform: 'capitalize', fontSize:'18px'}}>{title}</span>  
                    </div>      
                    <KeyboardArrowUpIcon style={{marginLeft:'5px', color:'#00a1ff', fontSize:'36px'}}  />
                </>:
                <>
                    <div className="sel-data">
                        <span className="topic">Topic: {title}</span> 
                        {master&&<ColorMark > Mastered</ColorMark>} 
                    </div>      
                    <KeyboardArrowDownIcon style={{marginLeft:'5px', color:'#00a1ff', fontSize:'36px'}}  />
                </>
                }
                
            </Button>
            <Popper
                open={opennetwork}
                anchorEl={anchorRefNetwork.current}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal 
                sx={{width:{xs:'335px', sm:'500px', md:'700px',}, zIndex:'2'}}
                
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'right top',
                            
                        }}
                        >
                        <Paper style={{marginTop:'2px'}}>
                            <ClickAwayListener onClickAway={()=>handleSelectPage(0)}>
                            <MenuList
                                autoFocusItem={opennetwork}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDownNetwork}
                                style={{width:'100%'}}
                            >
                                <MenuItem style={{width:'100%', color:'#888888' }} onClick={()=>handleSelectPage(1)}>
                                    <div className='lesson flex-between '>
                                        <p className='s-type'>Quiz</p>
                                        <img className='play-btn' src='assets/play-btn.png' alt=""/> 
                                    </div>                                        
                                </MenuItem>
                                <MenuItem style={{width:'100%', color:'#888888'}} onClick={()=>handleSelectPage(2)}>
                                    <div className='lesson flex-between '>
                                        <p className='s-type'>Resources</p>
                                        <img className='play-btn' src='assets/resource.png' alt=""/> 
                                    </div>  
                                </MenuItem> 
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
} 
export default SelectBox