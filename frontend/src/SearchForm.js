import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchForm({ changeHandler, submitHandler, formData }) {
  return (
    <Form inline className="my-4 justify-content-center" onSubmit={submitHandler}>
      <Form.Group controlId="searchForm" className="w-75">
        <Form.Control 
          className="w-100"
          onChange={changeHandler} 
          type="text" 
          name="search" 
          value={formData.search} 
          placeholder="Enter search term..." />
      </Form.Group>
      <Button variant="info" type="submit">
        Submit
      </Button>
    </Form>
  )
}