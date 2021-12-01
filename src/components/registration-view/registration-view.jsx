import React, { Fragment, useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import './registration-view.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        axios.post('https://ismauy-myflix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                setErrorMsg(null);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log(e.response.data)
                const errors = e.response.data.errors;
                const message = errors.map(function (error) {
                    return error['msg'] + ' - ';
                });
                console.log(message);
                setErrorMsg(message);
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
                                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row><br></br></Row>
                        {errorMsg ?
                            <Fragment>
                                <Row style={{ backgroundColor: '#F1948A', textAlign: 'center', margin: '10px' }}>
                                    <span>{errorMsg}</span>

                                </Row> <Row><br></br></Row> </Fragment> : ""
                        }
                        <Row id='text'>
                            <Col>
                                <Button variant="primary" type="submit" onClick={handleSubmit} id='button1'>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card>
        </Container >
    );
}


