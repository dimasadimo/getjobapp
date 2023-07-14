import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, Spinner, ListGroup, CardLink} from 'reactstrap';
import { BiArrowBack } from 'react-icons/bi';

const JOB_DETAIL_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions/'

const JobDetails = () => {

  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if(id && !jobDetail) getJobDetail().then(jobs => {
      
      setJobDetail(jobs);
      setIsLoading(false);
      setErr(false);
    });
    
  }, [jobDetail, id]);

  async function getJobDetail() {
    try{
      setIsLoading(true);
      const response = await fetch(JOB_DETAIL_URL + id)
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
        <Col md={12} >
          <span className="d-flex justify-content-start">
            <Link className="link-job d-flex justify-content-start" to="/">
              <BiArrowBack style={{marginTop: '5px'}}/>
              <p style={{marginLeft: '10px'}}>Back</p>
            </Link>
          </span>
          { !jobDetail ?
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
          <Card>
            <CardBody>
              <CardTitle style={{marginLeft: '20px'}}>
                <p style={{color: "#979797", size: '12px'}}>
                  {jobDetail.type} / {jobDetail.location}
                </p>
                <h2>{jobDetail.title}</h2>
              </CardTitle>
            </CardBody>
            <ListGroup flush>
              <Row>
                <Col md={7} className='p-5'>
                  <div dangerouslySetInnerHTML={{__html: jobDetail.description}} />
                </Col>
                <Col md={5} className='p-5'>
                  <Card className='mb-5'>
                    <CardBody>
                      <CardTitle tag="p">
                        <strong>{jobDetail.company}</strong>
                      </CardTitle>
                    </CardBody>
                    <ListGroup flush>
                      <img
                        alt=""
                        src={jobDetail.company_logo}
                        width="100%"
                      />
                      <CardLink className='p-3'>
                        {jobDetail.company_url}
                      </CardLink>
                    </ListGroup>
                  </Card>
                  <Card>
                    <CardBody>
                      <CardTitle tag="p">
                        <strong>How to apply</strong>
                      </CardTitle>
                    </CardBody>
                    <ListGroup flush>
                      <div className='p-3' dangerouslySetInnerHTML={{__html: jobDetail.how_to_apply}} />
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </ListGroup>
          </Card> 
          }
        </Col>
      </Row>
    </Container>
  )
}

export default JobDetails