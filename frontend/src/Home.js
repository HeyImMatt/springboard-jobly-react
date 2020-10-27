import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-5 pt-3">
        <Col className="text-center" md={8}>
          <h2 className="mt-5 display-3">Jobly</h2>
          <h5>All the jobs in one, convenient place.</h5>
          <Link to={"/login"} className="btn btn-primary mt-3">Login or Register</Link>
        </Col>
      </Row>
    </Container>
  )
}
