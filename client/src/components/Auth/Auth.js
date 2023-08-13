import React,{useState,useEffect} from 'react'
import {Avatar,Button,Typography,Container,Paper,Grid, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import { loadGapiInsideDOM } from "gapi-script";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'

import Input from './input'
import useStyles from './style'
import Icon from './icon'
import {signUp,signIn} from '../../actions/auth'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

export const Auth = () => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [isSignedUp,setIsSignedUp]=useState(false);
    const [showPass,setShowPass]=useState(false);
    const [formData,setFormData]=useState(initialState);

    useEffect(() => {
        (async () => {
          await loadGapiInsideDOM();
        })();
      });

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        if(isSignedUp){
            dispatch(signUp(formData,navigate))
        } else {
            dispatch(signIn(formData,navigate))
        }

    }
    const handleChange=(e)=>{
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value})
        // console.log(formData)
    }
    const handleShowPassword=()=>{
        setShowPass((prevState)=>!prevState);
    }
    const switchMode=()=>{
        setFormData(initialState);
        setIsSignedUp((prevState)=>!prevState);
        setShowPass(false);
    }
    const googleSuccess=async(res)=>{
        // console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenObj.access_token;
        try {
            dispatch({type:'AUTH',data:{result,token}});
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }   
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
  return (
    <Container component="main" maxWidth='xs' >
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignedUp?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                {
                    isSignedUp && (
                        <>
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                        </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type="email"/>
                <Input name='password' label='password' handleChange={handleChange} type={showPass?"text":"password"} handleShowPassword={handleShowPassword}/>
                {isSignedUp && <Input name='confirmPassword' label='Repeat password' handleChange={handleChange} type='password'/>}
                </Grid>
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignedUp?'Sign Up':'Sign In'}
                </Button>
                <GoogleLogin 
                    clientId="203058521177-fqfp2984mvmldigggnhrvacq9faj7ps8.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                    )}
                    
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignedUp?"Already have an Account ? Sign In":"Don't have an account Sign Up"}
                        </Button>
                    </Grid>   
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

