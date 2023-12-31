import React,{useState,useEffect} from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getPosts } from '../../actions/posts'
import Form from '../Form/form'
import Posts from '../Posts/posts'

export const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    
    useEffect(()=>{
        dispatch(getPosts());
        console.log("useEffect App.js")
    },[currentId,dispatch])
  return (
    <Grow in>
        <Container>
            <Grid container justifyContent='space-between' alignItems='center' spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}
