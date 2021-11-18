import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {


    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                        {movie.Description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
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
