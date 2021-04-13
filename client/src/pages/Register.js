import React, { useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Register = () => {
  const [ form, setForm ] = useState({
    username: '',
    password: ''
  })

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        alert('user registered!');
        history.push('/login')
      }
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name='username' onChange={handleChange}/>
            <Form.Text className="text-muted">
              text goes here
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
