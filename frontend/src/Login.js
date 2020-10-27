import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import JoblyApi from './JoblyApi';

export default function Login({ setToken }) {
  const history = useHistory();
  const [activeView, setActiveView] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    errors: []
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let data;
    let endpoint;

    if (activeView === "register") {
      data = {
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName || undefined,
        last_name: formData.lastName || undefined,
        email: formData.email || undefined
      };
      endpoint = "register";
    } else {
      data = {
        username: formData.username,
        password: formData.password
      };
      endpoint = "login";
    }

    let token;

    try {
      token = await JoblyApi[endpoint](data);
    } catch (errors) {
      return setFormData(data => ({ ...data, errors }));
    }

    setToken(token);
    history.push("/jobs");
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-5 pt-3">
        <Col className="mt-5" md={6}>
          <ButtonGroup className="d-flex justify-content-end">
            <Button 
              variant="info" 
              className={activeView === 'login' ? 'active' : ''}
              onClick={() => setActiveView('login')}>
                Login
            </Button>
            <Button 
              variant="info" 
              className={activeView === 'register' ? 'active' : ''}
              onClick={() => setActiveView('register')}>
                Register
            </Button>
          </ButtonGroup>
          <Card>
            <Card.Body>
              <Form className="mt-2" onSubmit={submitHandler}>
                <Form.Group className="w-100">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    className="mb-2"
                    onChange={changeHandler} 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    />
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    className="mb-2"
                    onChange={changeHandler} 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    />
                  {activeView === 'register' &&
                  <>                
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      className="mb-2"
                      onChange={changeHandler} 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      className="mb-2"
                      onChange={changeHandler} 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      />
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      className="mb-2"
                      onChange={changeHandler} 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      />
                  </>}
                </Form.Group>
                {formData.errors.length > 0 &&
                <Alert variant="danger">{formData.errors}</Alert>}
                <Button className="d-block ml-auto" variant="info" type="submit">
                  {activeView === 'login' ? 'Login' : 'Register'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
