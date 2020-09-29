import React, { useState } from 'react';
import {  Col, Container, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import './Home.css';
import {Link} from "react-router-dom";
import fakeData from '../../FakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Home = () => {

  const places = fakeData;
    const [showPlace, setShowPlace] = useState(places[0]);

    return (
      
      <section id="home" className="text-white">
      <Container>
          <Row className="pb-5">
          <Col lg={4} className="text-center text-lg-left">
                  <h1 className="placeName my-3">{showPlace.name}</h1>
                  <p className="text-justify">{showPlace.shortDescription}</p>
                  <Link to={`/booking/${showPlace.name}`}>
                      <Button style={{backgroundColor: '#F9A51A'}}> <b> Book Now </b> <FontAwesomeIcon icon={faArrowRight} /> </Button>
                  </Link>
              </Col>
              <Col lg={8}>
                  <Row>
                      {
                          places.map(place =>
                          <Col className="placePhoto" sm={4} key={place.name}>
                              <div onClick={() => setShowPlace(place)} className="small text-white text-center d-block bg-transparent">
                                  <img src={place.image} alt="" className="photo" />
                                  {place.name}
                              </div>
                          </Col>)
                      }
                  </Row>
              </Col>
          </Row>
      </Container>
  </section>
  
      

    );
};

export default Home;