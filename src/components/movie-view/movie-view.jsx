import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';


class MovieView extends React.Component {

    constructor() {
        super();
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

    addFavoriteMovie(e, movie, user) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.patch(`https://ismauy-myflix.herokuapp.com/users/${user._id}/favorites/${movie._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                const modifiedUser = response.data;
                this.props.setUser(modifiedUser);
                alert("Movie Added!");
            })
            .catch(function (error) {
                console.log(error);
            })


    }

    render() {
        const { movie, onBackClick, user } = this.props;
        const isFavorite = user.FavoriteMovies.some(m => m === movie._id);


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
                                <Button variant="danger" onClick={e => this.removeFavoriteMovie(e, movie, user)}>Remove Favorite</Button> :
                                <Button variant="primary" onClick={e => this.addFavoriteMovie(e, movie, user)}>Add Favorite</Button>
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


let mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(MovieView);