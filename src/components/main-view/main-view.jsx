import React from 'react';
import ReactDOM from 'react-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Import statement to indicate that you need to bundle `./index.scss`
import '../../index.scss';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the task of implanting an idea in the mind of a boss of a large company.', ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'Banker Andy Dufresne is arrested for killing his wife and mistress. After a tough adjustment, he tries to improve prison conditions and give hope to his fellow inmates.', ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/' },
                { _id: 3, Title: 'Gladiator', Description: 'A former Roman general sets out to take revenge on the corrupt emperor who murdered his family and sent him into slavery.', ImagePath: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/' }

            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }
}

export default MainView;