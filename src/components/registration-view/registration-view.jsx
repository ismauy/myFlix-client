import React, { useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
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
                        <Row>
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday: </Form.Label>
                                    <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
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
                            <a href="">Register me</a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container >
    );
}


