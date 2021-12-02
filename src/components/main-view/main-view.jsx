import React, { Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';

// Import statement to indicate that you need to bundle `./index.scss`
import './main-view.scss';
import { Col, Row, Navbar, Container } from 'react-bootstrap';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open(`/`, "_self");
    }

    getMovies(token) {
        axios.get('https://ismauy-myflix.herokuapp.com/movies', {
            // axios.get('http://localhost:8080/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        return (

            <Router>
                <Navbar>
                    <Container>
                        <Navbar.Brand>{user ? <Link style={{ textDecoration: 'none', color: 'black' }} to={'/'}><span> myFlix app </span></Link> : <span> Welcome to myFlix Movies App </span>} </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                {user ?
                                    <Fragment>
                                        <span> User: </span>
                                        <Link to={`/users/${user}`} >{user}</Link>
                                        <Button variant="link" onClick={() => this.onLoggedOut()} >Log Out</Button>
                                    </Fragment>
                                    : ''}

                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    <Row className="justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            return <Col md={8} >
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route exact path="/genres/:name" render={({ match, history }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={4}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={4}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path={`/users/${user}`} render={({ history }) => {
                            if (!user) return <Redirect to="/" />
                            return <Col>
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                    </Row>
                </Container>
            </Router>

        );
    }
}

export default MainView;