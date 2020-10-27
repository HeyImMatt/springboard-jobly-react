import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './CompanyCard.css'

export default function CompanyCard(props) {
  const { name, description } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-inline-block">{name}</Card.Title>
        <Image className="d-inline-block ml-auto" src="https://cdn.pixabay.com/photo/2016/11/24/14/31/palaces-1856388_1280.png" alt={`Logo for ${name}`} />
        <Card.Text className="d-inline-block">{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}