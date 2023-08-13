import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const fetchPosts=async()=>{
    return API.get('/posts');
}
export const createPost = async(newPost)=>{
    return API.post('/posts',newPost)
}
export const updatePost=async(id,updatedPost)=>{
    return  API.patch(`/posts/${id}/`,updatedPost)
}
export const deletePost=async(id)=>{
    return API.delete(`/posts/${id}`);
}
export const likePost=async(id)=>{
    return API.patch(`/posts/${id}/likePost`)
}

export const signIn = async (formData) =>{
    return API.post('/user/signin',formData);    
}
export const signUp = async(formData) =>{
    return API.post('/user/signup',formData);
}
