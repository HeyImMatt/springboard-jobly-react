import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default function CompanyCard(props) {
  const { name, description, logoUrl } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-inline-block">{name}</Card.Title>
        <Image className="d-inline-block ml-auto" src={logoUrl} alt={`Logo for ${name}`} />
        <Card.Text className="d-inline-block">{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}