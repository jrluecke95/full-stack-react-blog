import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Comments from '../components/Comments';

const Home = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    fetch('/api/v1/posts')
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    })
  }, [])

  return (
    <div>
      <h1>React Blog Posts</h1>
      {
        posts.map(post => {
          return (
            <Container key={post.id}>
              <h3>{post.title}</h3>
              <h5>{post.User.username}</h5>
              <p>{post.content}</p>
              <Comments postId={post.id}/>
            </Container>
          )
        })
      }
    </div>
  )
}

export default Home