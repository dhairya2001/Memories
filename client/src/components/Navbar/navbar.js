import React, { useState,useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import memories from '../../images/memories.png'
import useStyles from './style'

const Navbar=()=> {
    const classes=useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();

    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

   
    const logout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/auth')
        setUser(null);
    }

    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodedToken=jwt_decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile'))); 
     },[location])
    console.log(user);
  return (
    <div>
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='icon' height='60'/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.givenName} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button className={classes.Logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <div>
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    </div>    
                )}
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar