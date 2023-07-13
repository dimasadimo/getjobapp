import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input, Button, Card, CardBody, 
  CardTitle, ListGroupItem, ListGroup, Spinner } from 'reactstrap';
import moment from 'moment';

const url_job_page = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=1';
const url_job_search = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=python&location=berlin'

const JOB_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

const JobList = () => {

  const [jobs, setJobs] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if(!jobs) getJobs().then(jobs => {
      setJobs(jobs);
      setIsLoading(false);
      setErr(false);
    });
  }, [jobs]);

  async function getJobs() {
    try{
      setIsLoading(true);
      const response = await fetch(JOB_URL)
      const jobs = await response.json();
      return jobs;
     }
     catch(err){
      setErr(true);
     }
   }

  return (
    <Container className="mx-auto mt-5 mb-5" style={{width: '1000', maxWidth: 'calc(100% - 30%)'}}>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="jobdescription">
              Job Description
            </Label>
            <Input
              id="jobdescription"
              name="description"
              placeholder="Filter by title, benefits, etc..."
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="location">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Filter by city, state, etc..."
            />
          </FormGroup>
        </Col>
        <Col md={2} className="pt-3">
          <FormGroup check className="mt-4">
            <Input type="checkbox" />
            <Label check>
              Full Time Only
            </Label>
          </FormGroup>
        </Col>
        <Col md={2} className="pt-2">
          <Button className="mt-4" style={{width: '90%'}}>
            Search
          </Button>
        </Col>
      </Row>
      { !jobs ?
      <div className="d-flex justify-content-center mt-5">
        <Spinner
          color="secondary"
          type="grow"
          size="sm"
        />
        <Spinner
          color="secondary"
          type="grow"
          style={{marginLeft: '10px'}}
          size="sm"
        />
        <Spinner
          color="secondary"
          type="grow"
          style={{marginLeft: '10px'}}
          size="sm"
        />
      </div>
      :
      <Row className="mt-4">
        <Card
        >
          <CardBody>
            <CardTitle tag="h3">
              Job List
            </CardTitle>
          </CardBody>
          <ListGroup flush>
            {jobs.map((item,i) => 
              <ListGroupItem>
                <Row>
                  <Col md={12} className="d-flex justify-content-between" style={{paddingTop: '10px'}}>
                    <div>
                      <Link to={`/jobs/${item.id}`} style={{textDecoration: 'none', color: "#4181BF"}}>
                        <h4>{item.title}</h4>
                      </Link>
                      <p style={{color: "#979797"}}>{item.company} -
                        <span style={{color: "green", fontWeight: '700'}}>
                          {" "}{item.type}
                        </span>
                      </p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p>{item.location}</p>
                      <p style={{color: "#979797"}}>{moment().diff(item.created_at, 'days')} days ago</p>
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
          </ListGroup>
        </Card>
      </Row>}
    </Container>
  )
}

export default JobList