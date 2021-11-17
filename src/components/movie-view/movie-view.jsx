import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Col, Row } from 'react-bootstrap';

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
            <div className="movie-view" id="movieView">
                <div className="movie-poster" id="text">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title, h1" id="text">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div>
                    <button id="backButton" onClick={() => { onBackClick(null); }}>Back</button>
                </div>

            </div>

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
