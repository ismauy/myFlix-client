import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './genre-view.scss';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { genre, onBackClick } = this.props;

        return (

            <Card>
                <Card.Body>
                    <Card.Title>{genre.Name}</Card.Title>
                    <Card.Text>
                        {genre.Description}
                    </Card.Text>

                    <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>

        );
    }
}




GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
