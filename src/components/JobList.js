import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input, Button, Card, CardBody, 
  CardTitle, ListGroupItem, ListGroup, Spinner } from 'reactstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment'

const JOB_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';
const JOB_SEARCH_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json?';

const JobList = () => {

  const [jobs, setJobs] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingPage, setloadingPage] = useState(false);
  const [errPage, setErrPage] = useState(false);

  const getJobsPage = (newPage) => {
    setTimeout(() => {
      setloadingPage(true);
      fetch(JOB_URL + '/?page=' + newPage.toString())
        .then(res => {
            if(res.status !== 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(newJobs => {
          setJobs(jobs => [...jobs, ...newJobs]);
          setloadingPage(false);
          setErrPage(false);
          setPage(page + 1);
        },
        err => { 
          setloadingPage(false);
          setErrPage(true);
    });
    }, 3000);
  }

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
      const response = await fetch(JOB_URL + '/?page=' + page.toString())
      let jobs = await response.json();
      return jobs;
    }
    catch(err){
    setErr(true);
    setIsLoading(false);
    }
  }

  const changeDescription = (e) => setDescription(e.target.value);

  const changeLocation = (e) => setLocation(e.target.value);

  const changeCheckbox = (e) => setIsCheck(e.target.checked);

  const onSearch = () => {
    getJobSearch().then(jobs => {
      let newJobs;
      if(isCheck) newJobs = jobs.filter((item) => item.type === 'Full Time');
      setJobs(isCheck ? newJobs : jobs);
      setIsLoading(false);
      setErr(false);
      setIsSearch(true);
    });;
  }

  async function getJobSearch() {

    let url_search;
    if (description) url_search = JOB_SEARCH_URL + 'description=' + description.toString();
    if (location) url_search = JOB_SEARCH_URL + 'location=' + location.toString();
    if (description && location) url_search = JOB_SEARCH_URL + 'description=' + description.toString() + '&' + 'location=' + location.toString();
    
    try{
      setIsLoading(true);
      const response = await fetch(url_search)
      const jobs = await response.json();
      return jobs;
    }
    catch(err){
      setErr(true);
      setIsLoading(false);
    }
  }
  
  return (
    <Container className="mx-auto mt-5 mb-5" style={{width: '1000', maxWidth: 'calc(100% - 30%)'}} >
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
              onChange={changeDescription}
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
              onChange={changeLocation}
            />
          </FormGroup>
        </Col>
        <Col md={2} className="pt-3">
          <FormGroup check className="mt-4">
            <Input type="checkbox" onChange={changeCheckbox}/>
            <Label check>
              Full Time Only
            </Label>
          </FormGroup>
        </Col>
        <Col md={2} className="pt-2">
          <Button className="mt-4" style={{width: '90%'}} onClick={onSearch}>
            Search
          </Button>
        </Col>
      </Row>
      { !jobs || isLoading || loadingPage ?
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
            { !isSearch ?
            <CardTitle tag="h3">
              Job List
            </CardTitle>:
            <CardTitle tag="h3">
              Showing {jobs.length} jobs
            </CardTitle>
            }
          </CardBody>
          <ListGroup flush>
            <InfiniteScroll
              dataLength={jobs.length}
              next={() => getJobsPage(page + 1)}
              hasMore={!errPage}
              loader={
                <div className="d-flex justify-content-center mt-3 mb-3">
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
              }
            >
              {jobs.map((item,i) => item ?
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
                </ListGroupItem> : null
              )}
            </InfiniteScroll>
          </ListGroup>
        </Card>
      </Row>}
    </Container>
  )
}

export default JobList