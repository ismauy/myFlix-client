import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        axios.post('https://ismauy-myflix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };


    return (

        <Container>
            <Card id='loginCard'>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username: </Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password: </Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row><br></br></Row>
                        <Row id='text'>
                            <Col>
                                <Button variant="primary" type="submit" onClick={handleSubmit} id='button1'>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row><br></br></Row>
                    <Row id='text'>
                        <Col>
                            <Link to={`/register`}>
                                <Button variant="link">Register</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container >

    );
}



LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
