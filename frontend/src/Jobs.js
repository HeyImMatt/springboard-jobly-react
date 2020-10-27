import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobCard from './JobCard';
import SearchForm from './SearchForm';
import JoblyApi from './JoblyApi';

export default function Jobs() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ search: '' })

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getJobs();
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
    const searchResults = await JoblyApi.getJobs(formData.search);
    setJobs(searchResults);
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
          {jobs.map(job => (<JobCard 
            equity={job.equity}
            key={job.id}
            salary={job.salary}
            title={job.title}
          />))}
          {jobs !== [] && <p>No Jobs Found</p>}
        </Col>
      </Row>
    </Container>
  )
}
