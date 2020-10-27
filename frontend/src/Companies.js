import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import JoblyApi from './JoblyApi';

export default function Companies() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ search: '' })

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const searchResults = await JoblyApi.getCompanies(formData.search);
    setCompanies(searchResults);
    setFormData({ search: '' });
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center pt-3">
        <Col md={8}>
          <SearchForm 
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            formData={formData}
          />
          {companies.map(company => (<CompanyCard
            description={company.description}
            handle={company.handle}
            key={uuidv4()}
            name={company.name}
          />))}
          {companies === [] && <p>No Companies Found</p>}
        </Col>
      </Row>
    </Container>
  )
}
