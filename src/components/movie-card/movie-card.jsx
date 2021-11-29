import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <Container id='cardContainer'>
                <Card id='movieCard'>
                    <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>

            </Container >

        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};