import React, { useState, Fragment } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            UserId: null,
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
            errorMsg: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.getUserData(token);

    }

    getUserData(token) {
        const username = localStorage.getItem('user');

        axios.get(`https://ismauy-myflix.herokuapp.com/users/${username} `, {
            // axios.get('http://localhost:8080/users', {
            headers: { Authorization: `Bearer ${token} ` }
        })
            .then(response => {
                // Assign the result to the state
                console.log(response.data);
                this.setState({
                    UserId: response.data._id,
                    Username: response.data.Username,
                    Password: '',
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });

            })

            .catch(function (error) {
                console.log(error);
            });
    };

    removeFavoriteMovie(e, movie) {
        console.log(movie);
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.delete(`https://ismauy-myflix.herokuapp.com/users/${this.state.UserId}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response.data);
                this.componentDidMount();
                alert("Movie Removed!");
            })
            .catch(function (error) {
                console.log(error);
            })


    }

    removeUser() {
        const token = localStorage.getItem('token');

        axios.delete(`https://ismauy-myflix.herokuapp.com/users/${this.state.UserId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response.data);
                alert("User Removed!");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            })


    }

    editUser(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put(`https://ismauy-myflix.herokuapp.com/users/${this.state.UserId}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    errorMsg: null
                });
                localStorage.setItem('user', this.state.Username);
                const data = response.data;
                console.log(data);
                alert("Done!");
            })
            .catch(e => {
                console.log(e.response.data)
                const errors = e.response.data.errors;
                const message = errors.map(function (error) {
                    return error['msg'] + ' - ';
                });
                console.log(message);
                this.setState({
                    errorMsg: message
                });
            });
    }

    setUsername(value) {
        this.state.Username = value;
    }

    setPassword(value) {
        this.state.Password = value;
    }

    setEmail(value) {
        this.state.Email = value;
    }

    setBirthday(value) {
        this.state.Birthday = value;
    }

    setFavoriteMovies(value) {
        this.state.FavoriteMovies = value;
    }

    setErrorMsg(value) {
        this.state.errorMsg = value;
    }

    render() {

        const { movies } = this.props;

        const favoriteMovies = movies.filter(m => {
            return this.state.FavoriteMovies.includes(m._id)
        });


        return (


            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <span>Profile</span>
                        </Card.Title>
                        <Card.Text>
                            <div>
                                <span>Username: </span>
                                <span>{this.state.Username}</span>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div>
                                <span>Email: </span>
                                <span>{this.state.Email}</span>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div>
                                <span>Birthday: </span>
                                <span>{this.state.Birthday}</span>
                            </div>
                        </Card.Text>
                        <div>
                            <Button variant="danger" onClick={() => this.removeUser()} >Delete User</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card id='loginCard'>
                    <Card.Body>
                        <Form onSubmit={(e) => this.editUser(e)}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username: </Form.Label>
                                        <Form.Control placeholder="New Username" type="text" onChange={e => this.setUsername(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password: </Form.Label>
                                        <Form.Control placeholder="New Password" type="password" onChange={e => this.setPassword(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control placeholder="New Email" type="text" onChange={e => this.setEmail(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>Birthday: </Form.Label>
                                        <Form.Control placeholder="New Birthday" type="date" onChange={e => this.setBirthday(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row><br></br></Row>
                            {this.state.errorMsg ?
                                <Fragment>
                                    <Row style={{ backgroundColor: '#F1948A', textAlign: 'center', margin: '10px' }}>
                                        <span>{this.state.errorMsg}</span>

                                    </Row> <Row><br></br></Row> </Fragment> : ""
                            }
                            <Row id='text'>
                                <Col>
                                    <Button variant="primary" type="submit" id='button1'>
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                    </Card.Body>
                </Card>
                <Card>
                    <Card.Title>
                        Favorite Movies
                    </Card.Title>
                    <Card.Body>
                        <Row>
                            {
                                favoriteMovies.map(movie => (
                                    <Col md={4} xs={12} sm={6} lg={3} key={movie._id}>
                                        <Card id='movieCard'>
                                            <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                                            <Card.Body>
                                                <Card.Title>{movie.Title}</Card.Title>
                                                <Card.Text>{movie.Description}</Card.Text>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Button variant="link">Open</Button>
                                                </Link>
                                                <Button variant="link" onClick={e => this.removeFavoriteMovie(e, movie)} >Delete</Button>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Card.Body>

                </Card>
            </Container >
        );
    }
}


