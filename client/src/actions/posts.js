import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actiontypes';
import * as api from '../api/index.js'

// Action creator

export const getPosts=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        dispatch({type:FETCH_ALL, payload:data}) // instead of returning we will use dispatch to send action to reducer
    } catch (error) {
        console.log(error.message)
    }
    
};

export const createPost =(post)=>async(dispatch)=>{
    try {
        const {data}=await api.createPost(post);
        dispatch({type:CREATE ,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}