import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function CompanyCard(props) {
  const { title, salary, equity } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Salary: ${salary}
          <br />
          Equity: {equity}
          <Button className="d-block ml-auto" variant="danger" type="button">
            APPLY
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}