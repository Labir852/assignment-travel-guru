import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fakeData from '../../FakeData';
import './Booking.css';
import { UserContext } from '../../App';

const Booking = () => {
    const {placeName} = useParams();
    const destination = fakeData.find(place => placeName === place.name);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
 

    // difference of days
    const [stay, setStay] = useState({from:0, to:0});
    const fromDay = new Date(stay.from);
    const toDay = new Date(stay.to);
    const diff = toDay - fromDay;
    const totalDays = (((diff/1000)/3600)/24);
    const disable = totalDays < 1;

    return (
        <section className="destination text-white">
            <Container>
                <Row className="align-items-center">
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <h3 className="placeName text-center text-md-left my-4">{destination.name}</h3>
                        <p className="text-justify">{destination.longDescription}</p>
                    </Col>

                    <Col lg={2} className="d-none d-lg-block"></Col>

                    <Col lg={5} className="bg-info mb-5 mb-lg-0">
                        <h2 className="text-center mb-3">Booking</h2>
                        <Form className="text-dark" style={{alignItems:'center'}}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <TextField id="standard-basic" label="Destination" readOnly value={destination.name} required/>
                                </InputGroup.Prepend>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <TextField required name="from" type="date" onChange={(e) => {
                                    const newFrom = {...stay};
                                    newFrom.from = e.target.value;
                                    setStay(newFrom)
                                    }} />
                                </InputGroup.Prepend>
                                
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <TextField required name="to" type="date" onChange={(e) => {
                                    const newTo = {...stay};
                                    newTo.to = e.target.value;
                                    setStay(newTo)
                                    }} />
                                </InputGroup.Prepend>
                                
                            </InputGroup>

                             <Link className="link" to={`/Search/${placeName}`}>
                                <Button disabled={disable} variant="warning" type="submit" className="btn-large btn-block">
                                    {
                                        disable ?
                                        'Booking cannot be done for less then 1 day' :
                                        `Book For ${totalDays} Days`
                                    }
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Booking;