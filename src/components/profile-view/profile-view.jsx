import React, { useState, Fragment } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, deleteUser } from '../../actions/actions';

class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            Username: '',
            Password: '',
            Email: '',
            Birthday: '',
            errorMsg: null
        };
    }

    removeFavoriteMovie(e, movie, user) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.delete(`https://ismauy-myflix.herokuapp.com/users/${user._id}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                const modifiedUser = response.data;
                this.props.setUser(modifiedUser);
                alert("Movie Removed!");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    removeUser(user) {
        const token = localStorage.getItem('token');

        axios.delete(`https://ismauy-myflix.herokuapp.com/users/${user._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                alert("User Removed!");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.props.deleteUser(null);
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    editUser(e, user) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put(`https://ismauy-myflix.herokuapp.com/users/${user._id}`,
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
                const modifiedUser = response.data;
                this.props.setUser(modifiedUser);
                localStorage.setItem('user', modifiedUser.Username);
                this.setState({
                    Username: '',
                    Password: '',
                    Email: '',
                    Birthday: ''
                });
                alert("Done!");
            })
            .catch(e => {
                const errors = e.response.data.errors;
                const message = errors.map(function (error) {
                    return error['msg'] + ' - ';
                });
                this.setState({
                    errorMsg: message
                });
            });
    }

    setUsername(value) {
        this.setState({ Username: value });
    }

    setPassword(value) {
        this.setState({ Password: value });
    }

    setEmail(value) {
        this.setState({ Email: value });
    }

    setBirthday(value) {
        this.setState({ Birthday: value });
    }

    setErrorMsg(value) {
        this.setState({ ErrorMsg: value });
    }

    render() {

        const { movies, user } = this.props;

        const favoriteMovies = movies.filter(m => {
            return user.FavoriteMovies.includes(m._id)
        });


        return (


            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <span>Profile</span>
                        </Card.Title>
                        <Card.Text>

                            <span>Username: </span>
                            <span>{user.Username}</span>

                        </Card.Text>
                        <Card.Text>

                            <span>Email: </span>
                            <span>{user.Email}</span>

                        </Card.Text>
                        <Card.Text>

                            <span>Birthday: </span>
                            <span>{user.Birthday}</span>

                        </Card.Text>

                        <Button variant="danger" onClick={() => this.removeUser(user)} >Delete User</Button>

                    </Card.Body>
                </Card>
                <Card id='loginCard'>
                    <Card.Body>
                        <Form onSubmit={(e) => this.editUser(e, user)}>
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
                                                <Button variant="link" onClick={e => this.removeFavoriteMovie(e, movie, user)} >Delete</Button>

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


let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setUser, deleteUser })(ProfileView);