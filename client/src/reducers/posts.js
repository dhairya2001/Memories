// states is set to posts


export default (posts=[],action)=>{
    
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload; // this includes actual posts from db
        case 'CREATE':    
            return [...posts, action.payload];
        default:
            return posts;
    }
};