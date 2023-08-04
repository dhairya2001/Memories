import axios from "axios";

const url= "http://localhost:5000/posts";

export const fetchPosts=async()=>{
    return axios.get(url);
}
export const createPost = async(newPost)=>{
    return axios.post(url,newPost)
}
export const updatePost=async(id,updatedPost)=>{
    return  axios.patch(`${url}/${id}`,updatedPost)
}
export const deletePost=async(id)=>{
    console.log("deleted")
    return axios.delete(`${url}/${id}`);
}
export const likePost=async(id)=>{
    return axios.patch(`${url}/${id}/likePost`)
}