import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {
            UserId: null,
            FavoriteMovies: []
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
                this.setState({
                    UserId: response.data._id,
                    FavoriteMovies: response.data.FavoriteMovies
                });

            })

            .catch(function (error) {
                console.log(error);
            });
    };

    removeFavoriteMovie(e, movie) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.delete(`https://ismauy-myflix.herokuapp.com/users/${this.state.UserId}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this.componentDidMount();
                alert("Movie Removed!");
            })
            .catch(function (error) {
                console.log(error);
            })


    }


    addFavoriteMovie(e, movie) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.patch(`https://ismauy-myflix.herokuapp.com/users/${this.state.UserId}/favorites/${movie._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this.componentDidMount();
                alert("Movie Added!");
            })
            .catch(function (error) {
                console.log(error);
            })


    }

    render() {
        const { movie, onBackClick } = this.props;
        const isFavorite = this.state.FavoriteMovies.some(m => m === movie._id);


        return (

            <Card>
                <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                        {movie.Description}
                    </Card.Text>
                    <Row>
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">Director</Button>
                        </Link>

                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col>
                            {isFavorite ?
                                <Button variant="danger" onClick={e => this.removeFavoriteMovie(e, movie)}>Remove Favorite</Button> :
                                <Button variant="primary" onClick={e => this.addFavoriteMovie(e, movie)}>Add Favorite</Button>
                            }
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </Col>
                    </Row>
                </Card.Body>

            </Card>

        );
    }
}




MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
