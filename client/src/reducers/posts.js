// states is set to posts
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actiontypes';

export default (posts=[],action)=>{
    
    switch (action.type) {
        case FETCH_ALL:
            return action.payload; // this includes actual posts from db
        case CREATE:    
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post)=>post._id!==action.payload);
        case LIKE:
            return posts.map((post)=>post._id===action.payload?action.payload:post);
        default:
            return posts;
    }
};