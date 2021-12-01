import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieCard extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <div className="mv_card">
                <Container className="moviecardContainer" style={{ display: "inline" }}>
                    <Row>
                        <Col>
                            <CardGroup>
                                <Card className="main_img">
                                    <Card.Img
                                        crossOrigin="anonymous"
                                        className="movie_img"
                                        variant="top"
                                        src={movie.ImagePath}
                                    />
                                    <Card.Body style={{ textAlign: "center" }} >
                                        <Card.Title className="movie_title">
                                            {movie.Title}
                                        </Card.Title>
                                        <div className="movie_genre">{movie.Genre.Name}</div>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button className="button" variant="link" size="md">
                                                Open
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};