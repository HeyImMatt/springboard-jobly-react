import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import UserContext from "./UserContext";

export default function Company() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
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

  const applyHandler = async (id) => {
    await JoblyApi.applyToJob(id);
    setCurrentUser({
      ...currentUser,
      jobs: [...currentUser.jobs, { id }]
    });
  }

  const checkAppliedFor = (id) => {
    for (let [k, v] of Object.entries(currentUser.jobs)) {
      if (v.id === id) {
        return true;
      }
    }
    return false;
  }

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
            appliedFor={checkAppliedFor(job.id)}
            applyHandler={applyHandler}
            equity={job.equity}
            id={job.id}
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
