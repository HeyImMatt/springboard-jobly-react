import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';

export default function Companies() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState({});
  // const [formData, setFormData] = useState({ search: '' })

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.request('companies');
      setCompanies(companies.companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);
  console.log(companies);

  // const changeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((fdata) => ({
  //     ...fdata,
  //     [name]: value
  //   }));
  // }

  // const submitHandler = (e, type) => {
  //   e.preventDefault();
  //   const newItem = {
  //     ...formData,
  //     id: formData.name.toLowerCase().replace(/\s/g, '-')
  //   }
  //   const added = SnackOrBoozeApi.addNewItem(type, newItem);
  //   added ? history.push(`/${type}`) : alert('Something went wrong. Please try again.')
  //   setFormData(INIITIAL_FORM_DATA);
  // }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center pt-3">
        <Col md={8}>
          {companies.map(company => (<CompanyCard 
            description={company.description}
            key={uuidv4()}
            name={company.name}
            logoUrl={company.logo_url}
          />))}
        </Col>
      </Row>
    </Container>
  )
}
