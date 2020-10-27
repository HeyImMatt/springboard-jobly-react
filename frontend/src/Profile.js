import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import JoblyApi from './JoblyApi';

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    first_name: currentUser.first_name || "",
    last_name: currentUser.last_name || "",
    email: currentUser.email || "",
    photo_url: currentUser.photo_url || "",
    username: currentUser.username,
    password: "",
    errors: [],
    saveConfirmed: false
  });

  const messageShownRef = useRef(false);
  useEffect(
    function() {
      if (userForm.saveConfirmed && !messageShownRef.current) {
        messageShownRef.current = true;
        setTimeout(function() {
          setUserForm(f => ({ ...f, saveConfirmed: false }));
          messageShownRef.current = false;
        }, MESSAGE_SHOW_PERIOD_IN_MSEC);
      }
    },
    [userForm]
  );

  async function submitHandler(e) {
    e.preventDefault();

    try {
      let profileData = {
        first_name: userForm.first_name || undefined,
        last_name: userForm.last_name || undefined,
        email: userForm.email || undefined,
        photo_url: userForm.photo_url || undefined,
        password: userForm.password
      };

      let username = userForm.username;
      let updatedUser = await JoblyApi.saveProfile(username, profileData);
      console.log("UPDATED USER", updatedUser)
      setUserForm(f => ({
        ...f,
        errors: [],
        saveConfirmed: true,
        password: ""
      }));
      setCurrentUser(updatedUser);
    } catch (errors) {
      setUserForm(f => ({ ...f, errors }));
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setUserForm(f => ({
      ...f,
      [name]: value,
      errors: []
    }));
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-5 pt-3">
        <Col className="mt-5" md={6}>
          <h2>Profile</h2>
          <Card>
            <Card.Body>
              <Form className="mt-2" onSubmit={submitHandler}>
                <Form.Group className="w-100">
                  <Form.Label className="mb-0"><h5>Username</h5></Form.Label>
                  <p>{currentUser.username}</p>               
                  <Form.Label className="mb-0"><h5>First Name</h5></Form.Label>
                  <Form.Control 
                    className="mb-3"
                    onChange={changeHandler} 
                    type="text" 
                    name="first_name" 
                    value={userForm.first_name} 
                    />
                  <Form.Label className="mb-0"><h5>Last Name</h5></Form.Label>
                  <Form.Control 
                    className="mb-3"
                    onChange={changeHandler} 
                    type="text" 
                    name="last_name" 
                    value={userForm.last_name} 
                    />
                  <Form.Label className="mb-0"><h5>Email</h5></Form.Label>
                  <Form.Control 
                    className="mb-3"
                    onChange={changeHandler} 
                    type="email" 
                    name="email" 
                    value={userForm.email} 
                    />
                  <Form.Label className="mb-0"><h5>Photo URL</h5></Form.Label>
                  <Form.Control 
                    className="mb-3"
                    onChange={changeHandler} 
                    type="text" 
                    name="photo_url" 
                    value={userForm.photo_url} 
                    />
                <Form.Label className="mb-0"><h5>Re-enter Password</h5></Form.Label>
                <Form.Control 
                  className="mb-3"
                  onChange={changeHandler} 
                  type="password" 
                  name="password" 
                  value={userForm.password} 
                  />
                </Form.Group>
                {userForm.errors.length > 0 &&
                <Alert variant="danger">{userForm.errors}</Alert>}
                <Button className="w-100" variant="info" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
