
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const Comments = (props) => {
  const user = useSelector((state) => state.user);
  const [ showForm, setShowForm ] = useState(false);
  const [ text, setText ] = useState('');
  const [ comments, setComments ] = useState([])

  const getComments = () => {
    fetch(`/api/v1/posts/${props.postId}/comments`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        setComments(data)
      }
    })
  }

  useEffect(() => {
    getComments();
  }, [props.postId])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/posts/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text
      }),
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        alert('comment submitted');
        getComments();
      }
    })
  }

  return (
    <div>
      <div>
        {
          comments.map((comment, index) => {
            return (
              <div key={index}>
              <p>{comment.text}</p>
              <h6>{comment.User.username}</h6>
            </div>
            )
            
          })
        }
      </div>
      { user && (
        <div>
          { showForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control type='text' placeholder='comment text' name='comment' value={text} required onChange={(e) => setText(e.target.value)}/>
          </Form.Group>
          <Button type="submit">Submit Comment</Button>
        </Form>
      ) : (
        <Button onClick={() => setShowForm(!showForm)}>Add Comment</Button>
      )}
        </div>
      )}
      
    </div>
  )
}

export default Comments
