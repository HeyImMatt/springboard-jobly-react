import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function JobCard(props) {
  const { applyHandler, appliedFor, id, title, salary, equity } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Salary: ${salary}
          <br />
          Equity: {equity}
          <Button 
            className="d-block ml-auto"
            disabled={appliedFor} 
            onClick={() => applyHandler(id)}
            variant="danger" 
            type="button">
            {appliedFor ? 'APPLIED' : 'APPLY'}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}