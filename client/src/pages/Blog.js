import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Blog = () => {
  const [form, setForm] = useState({
    title: '',
    content: ''
  })
  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: form.title,
        content: form.content,
      }),
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        history.push('/')
      }
    })
  }
  
  return (
    <div>
      <h1>Blog</h1>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control onChange={handleChange} required  name='title' placeholder="title" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control onChange={handleChange} name='content' required as="textarea" rows={3} />
            </Form.Group>
            <Button type="submit" varient='primary'>Submit</Button>
          </Form>
        </Container>
      
      
    </div>
  );
};

export default Blog;
