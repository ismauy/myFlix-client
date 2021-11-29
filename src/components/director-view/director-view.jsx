import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './director-view.scss';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { director, onBackClick } = this.props;

        return (

            <Card>
                <Card.Body>
                    <Card.Title>{director.Name}</Card.Title>
                    <Card.Text>
                        {director.Bio}
                    </Card.Text>

                    <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>

        );
    }
}




DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
