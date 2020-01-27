import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ name: 'All Genre' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  handleDelete(movie) {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });

  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return "There are no movies in the database";
    const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

    const filtered = selectedGenre && selectedGenre._id ?
      allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">

          <ListGroup items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {filtered.length} movies in the database</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <Pagination itemsCount={filtered.length} pageSize={this.state.pageSize} onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage} />
        </div>
      </div>



    );
  }
}

export default Movies;
