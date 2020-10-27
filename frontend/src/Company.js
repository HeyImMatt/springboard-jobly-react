import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';

export default function Company() {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      console.log(handle)
      let company = await JoblyApi.getCompany(handle);
      console.log(company)
      setCompany(company);
      setJobs(company.jobs);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center pt-3">
        <Col md={8}>
          <h4 className="mt-5">{company.name}</h4>
          <p>{company.description}</p>
          {jobs.map(job => (<JobCard 
            equity={job.equity}
            key={job.id}
            salary={job.salary}
            title={job.title}
          />))}
          {jobs === [] && <p>No Jobs Found</p>}
        </Col>
      </Row>
    </Container>
  )
}
