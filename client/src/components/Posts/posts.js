import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/post'
import useStyles from './style'

const Posts=()=> {
  const classes=useStyles();
  const posts=useSelector((state)=>state.posts);
  console.log(posts);
  return (
    <div>
        Posts
        <Post/>
    </div>
  )
}

export default Posts