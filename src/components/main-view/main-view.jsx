import React, { Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, deleteUser } from '../../actions/actions';
import { LoginView } from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import MoviesList from '../movies-list/movies-list';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';

// Import statement to indicate that you need to bundle `./index.scss`
import './main-view.scss';
import { Col, Row, Navbar, Container } from 'react-bootstrap';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getMovies(accessToken);
        }
    }


    onLoggedIn(authData) {
        this.props.setUser(authData.user);

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.deleteUser(null);
        window.open(`/`, "_self");
    }

    getMovies(token) {
        axios.get('https://ismauy-myflix.herokuapp.com/movies', {
            // axios.get('http://localhost:8080/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let { movies, user } = this.props;

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
                                        <Link to={`/users/${user._id}`} >{user.Username}</Link>
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
                            return <MoviesList movies={movies} />;
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
                        {user ?
                            <Route path={`/users/${user._id}`} render={({ history }) => {
                                if (!user) return <Redirect to="/" />
                                return <Col>
                                    <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                                </Col>
                            }} /> : ''}
                    </Row>
                </Container>
            </Router>

        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser, deleteUser })(MainView);